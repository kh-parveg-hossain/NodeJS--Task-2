import { useEffect, useState } from "react";

interface Coin {
  symbol: string;
  name: string;
  price: number;
  prevPrice: number;
  change24h: number;
  marketCap: number;
}

interface AlertType {
  _id: string;
  coin: string;
  targetPrice: number;
  condition: string;
}

const App = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  useEffect(() => {
    // Fetch initial coin prices
    fetch("http://localhost:5000/api/prices")
      .then((res) => res.json())
      .then((data) => {
        const coinsArray: Coin[] = Object.entries(data.data).map(
          ([symbol, price]) => ({
            symbol,
            name: symbol.toUpperCase(),
            price: Number(price),
            prevPrice: Number(price),
            change24h: 0,
            marketCap: 0,
          })
        );
        setCoins(coinsArray);
      });

    // Fetch alerts
    const fetchAlerts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/alerts/list");
        const data = await res.json();
        if (data.success) setAlerts(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAlerts();

    // WebSocket connection
    const ws = new WebSocket("ws://localhost:5000");
    ws.onmessage = (event) => {
      const updatedPrices: Record<string, number> = JSON.parse(event.data);
      setCoins((prev) =>
        prev.map((coin) => {
          const newPrice = updatedPrices[coin.symbol] ?? coin.price;
          const change24h = ((newPrice - coin.prevPrice) / coin.prevPrice) * 100;
          return {
            ...coin,
            price: newPrice,
            change24h: +change24h.toFixed(2),
            marketCap: +(newPrice * 10000).toFixed(2),
          };
        })
      );
    };
    return () => ws.close();
  }, []);

  // Refresh alerts after creating a new one
  const createAlert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
     const email = (form[0] as HTMLInputElement).value;  // email
    const name = (form[1] as HTMLInputElement).value;   // coin name
    const price = parseFloat((form[2] as HTMLInputElement).value); // price
    const condition = (form[3] as HTMLSelectElement).value; // condition

    if (!email || !name || isNaN(price) || !condition) {
      alert("Please fill in all fields correctly.");
      return;
    }

    await fetch("http://localhost:5000/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, condition, email }),
    });

    form.reset();
    alert("Alert created ✅");

    // Refresh alert list
    const res = await fetch("http://localhost:5000/api/alerts/list");
    const data = await res.json();
    if (data.success) setAlerts(data.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-indigo-600 text-white py-10 text-center shadow-md">
        <h1 className="text-4xl font-bold">💰 Crypto Price Tracker</h1>
        <p className="mt-2 text-lg">Track live crypto prices and set alerts easily 🚀</p>
      </header>

      <main className="container mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Left Side: Table */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-6">📊 Dashboard</h2>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
            <table className="w-full border-collapse bg-white rounded-lg text-center">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 border">#</th>
                  <th className="py-3 px-4 border">Name</th>
                  <th className="py-3 px-4 border">Price</th>
                  <th className="py-3 px-4 border">24h</th>
                  <th className="py-3 px-4 border">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin, index) => (
                  <tr key={coin.symbol} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border">{index + 1}</td>
                    <td className="py-3 px-4 border">
                      {coin.name} ({coin.symbol})
                    </td>
                    <td className="py-3 px-4 border">${coin.price}</td>
                    <td
                      className={`py-3 px-4 border ${
                        coin.change24h >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {coin.change24h}%
                    </td>
                    <td className="py-3 px-4 border">${coin.marketCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {coins.map((coin, index) => (
              <div key={coin.symbol} className="bg-white rounded-lg shadow-md p-4">
                <p>
                  <span className="font-semibold">Coin No.:</span> {index + 1}
                </p>
                <p>
                  <span className="font-semibold">Name:</span> {coin.name} ({coin.symbol})
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${coin.price}
                </p>
                <p className={coin.change24h >= 0 ? "text-green-600" : "text-red-600"}>
                  <span className="font-semibold">24h:</span> {coin.change24h}%
                </p>
                <p>
                  <span className="font-semibold">Market Cap:</span> ${coin.marketCap}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Create Alert + Alert List */}
        <div className="lg:w-80 bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
          {/* Create Alert Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">🔔 Create Price Alert</h2>
            <form className="flex flex-col gap-4" onSubmit={createAlert}>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 border rounded focus:ring focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Enter Coin Name"
                className="p-2 border rounded focus:ring focus:ring-indigo-400"
              />
              <input
                type="number"
                placeholder="Target Price"
                className="p-2 border rounded focus:ring focus:ring-indigo-400"
              />
              <select className="p-2 border rounded focus:ring focus:ring-indigo-400">
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Set Alert
              </button>
            </form>
          </div>

          {/* List of Alerts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">📋 Active Alerts</h2>
            {alerts.length === 0 ? (
              <p>No alerts yet.</p>
            ) : (
              <ul className="space-y-2">
                {alerts.map((alert) => (
                  <li
                    key={alert._id}
                    className="border p-2 rounded flex justify-between"
                  >
                    <span>
                      {alert.coin.toUpperCase()} {alert.condition} ${alert.targetPrice}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
