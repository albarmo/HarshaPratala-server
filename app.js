const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server working" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
