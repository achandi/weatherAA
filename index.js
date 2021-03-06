const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "./front-end/build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./front-end/build", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT);
