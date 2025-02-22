const express = require("express");
const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("Webhook received payload:", req.body);
  res.json({ message: "Webhook received" });
});

app.listen(4000, () => {
  console.log("Webhook server listening on port 4000");
});
