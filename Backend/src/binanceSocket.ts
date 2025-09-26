import WebSocket from "ws";
import { Redis } from "ioredis";
import Alert from "./models/Alert";
import axios from "axios";
import { sendEmail } from "./utils/email"; // import email helper

export interface PriceMap {
  [key: string]: number;
}

export let latestPrices: PriceMap = {};

const coins = ["btcusdt", "ethusdt", "bnbusdt"];

const fetchInitialPrices = async () => {
  try {
    const res = await axios.get("https://api.binance.com/api/v3/ticker/price");
    res.data.forEach((item: any) => {
      const symbol = item.symbol.toLowerCase();
      if (coins.includes(symbol)) {
        latestPrices[symbol] = parseFloat(item.price);
      }
    });
  } catch (err) {
    console.error("❌ Binance API error:", err);
  }
};

export const startPriceBroadcast = async (wss: WebSocket.Server, redis: Redis) => {
  await fetchInitialPrices();

  const streams = coins.map((coin) => `${coin}@trade`).join("/");
  const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());
    if (data.data && data.data.s && data.data.p) {
      const symbol = data.data.s.toLowerCase();
      const price = parseFloat(data.data.p);
      latestPrices[symbol] = price;

      // Save to Redis
      setInterval(async () => {
        await redis.set(symbol, price.toString());
      }, 60 * 60 * 1000); // 1 hr

      // Check alerts
      const alerts = await Alert.find({ coin: symbol });
      alerts.forEach((alert) => {
        const conditionMet =
          (alert.condition === "above" && price >= alert.targetPrice) ||
          (alert.condition === "below" && price <= alert.targetPrice);

        if (conditionMet) {
          console.log(`📢 ALERT: ${alert.coin.toUpperCase()} ${alert.condition} ${alert.targetPrice} | Current: ${price}`);

          // ✅ Send email after 10 seconds
          setTimeout(() => {
            sendEmail(
              alert.email, 
              `Crypto Alert: ${alert.coin.toUpperCase()} hit your target!`,
              `${alert.coin.toUpperCase()} ${alert.condition} ${alert.targetPrice} | Current price: ${price}`
            );
          }, 10 * 1000); // 10 seconds in ms
        }
      });

      // Broadcast to WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(latestPrices));
        }
      });
    }
  });

  ws.on("close", () => console.log("❌ Binance WebSocket disconnected"));
  ws.on("error", (err) => console.error("❌ Binance WS error:", err));
};
