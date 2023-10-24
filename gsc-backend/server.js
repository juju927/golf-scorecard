//* imports
require("dotenv").config();
require("./config/database");

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug")("gsc-backend:server.js");

//* routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/usersRouter");
const coursesRouter = require("./routes/coursesRouter");
const clubsRouter = require("./routes/clubsRouter");
const roundsRouter = require("./routes/roundsRouter");

//* app
const app = express();

//* middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/clubs", clubsRouter);
app.use("/rounds", roundsRouter);

//* catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//* error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // return an error message
  res.status(err.status || 500);
  res.json({ msg: "error" });
});

//* routes
app.get("/api", (req, res) => {
  debug("bleb");
  res.json({ msg: "hi werl" });
});

// //* listen
// const port = process.env.PORT || 3000;

// app.listen(port, function () {
//   debug(`Express app running on port ${port}`);
// });

module.exports = app;
