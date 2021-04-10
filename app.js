var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const compression = require("compression");
var rfs = require("rotating-file-stream");
const helmet = require("helmet");

// var indexRouter = require('./routes/index');
var usersRouter = require("./routes/users");

var app = express();

app.use(helmet());

const accessLogStream = rfs.createStream("logFile.log", {
  //will keep a logfile every 1 day
  interval: "1d",
  path: path.join(__dirname, "logFile.log"),
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

// app.use('/', indexRouter);
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// module.exports = app;
app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log("server started successfully");
});
