const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const port = 9000;
const bodyParser = require("body-parser");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");


app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

var userDirectory = [];

//middleware
app.use("/", express.static("./views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));
function checkAuth(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

//routes
app.get("/", function(req, res) {
  res.render("index");
});

app.post("/users", function(req, res) {
  if (!req.body || !req.body.name || !req.body.password) {
    return res.redirect("/");
  }
  var newUser = {
    username: req.body.name,
    password: req.body.password
  };

  userDirectory.push(newUser);
  return res.redirect("/login");
});

app.post("/login", function(req, res) {
  if (!req.body || !req.body.name || !req.body.password) {
    return res.redirect("/login");
  }

  var user = req.body;
  var userRecord;

  userDirectory.forEach(function(item) {
    console.log(user);
    if (item.username === user.name) {
      userRecord = item;
    }
  });

  if (!userRecord) {
      console.log("user Redord", userRecord);
    return res.redirect("/"); //user not found
  }

  if (user.password === userRecord.password) {
    req.session.user = userRecord;
    return res.redirect("/profile");
  } else {
    return res.redirect("/login");
  }
});

app.get("/signup", function(req, res) {
  res.render("signup");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/profile", function(req, res) {
  res.render("profile", {user: req.session.user});
});

app.listen(port, function() {
  console.log("Running on port", port);
});
