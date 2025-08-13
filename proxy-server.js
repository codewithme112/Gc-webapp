import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const GAS_URL = "https://script.google.com/macros/s/AKfycbyEIPltOkmQbiD1IKvUzmaRxlSRCjWvoejLIYiP143A6vwGhLLiKKVFppMzAx80Flc5pQ/exec";

app.get('/today-count', async (req, res) => {
  try {
    const response = await fetch(`${GAS_URL}?action=todayCount`);

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch {
      res.status(500).json({ error: "Invalid JSON from GAS", raw: text });
    }

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});






app.listen(5050, () => console.log("✅ Proxy running on http://localhost:5050"));
