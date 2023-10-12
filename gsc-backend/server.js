//* imports
require("dotenv").config();
require("./config/database");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug")("gsc-backend:server");

//* routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

//* app
var app = express();

//* middleware
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//* routes
app.get("/api", (req, res) => {
  res.json({ msg: "hi werl" });
});

//* listen
const port = process.env.PORT || 3001;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});

module.exports = app;
