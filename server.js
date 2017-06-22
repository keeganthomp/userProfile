const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const port = 9000;
const bodyParser = require("body-parser");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.listen(port, function() {
  console.log("Running on port", port);
});

app.use("/", express.static("./views"));
app.get("/", function(req, res) {
  res.render("index");
});
