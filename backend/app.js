const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user-routes");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/user-routes");
const httpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new httpError("could not find the route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured!" });
});

app.listen(5000);