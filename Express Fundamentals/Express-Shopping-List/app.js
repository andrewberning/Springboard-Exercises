const express = require("express");
const app = express();
const ExpressError = require("./expressError");
const itemsRoutes = require("./itemsRoutes");

/** Middleware */

app.use(express.json());
app.use("/items", itemsRoutes);


/** 404 Error Handler */

app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);
  
  return next(err);
});

/** General Error Handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  
  return res.json({
    error: err.message
  });
});


module.exports = app;