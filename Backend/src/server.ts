import express from "express";
import http from "http";
import WebSocket from "ws";
import cors from "cors";
import {redis} from "../src/utils/redis";
import { swaggerUi, swaggerSpec } from "./swagger";
import { startPriceBroadcast, latestPrices } from "./binanceSocket";

import { db } from "./utils/db";
import router from "./routes/routes";

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
db();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Create HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Start broadcasting prices to WebSocket clients
startPriceBroadcast(wss, redis);

wss.on("connection", (ws) => {
  console.log("🔗 WebSocket client connected");
  ws.send(JSON.stringify(latestPrices));

  ws.on("close", () => console.log("❌ WebSocket client disconnected"));
});

server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
