require("dotenv").config();

// Express
const express = require("express");
const app = express();
app.use(require("body-parser").json());
app.use((_err, _req, res, _next) => res.status(500).send("Internal Error"));

// Database
const db = require("./db");
db.sync().then(() =>
  app.listen(8080, () => console.log("Server is listening..."))
);

// Users
app.post("/users", require("./api/users/create"));
app.get("/users/:id", require("./api/users"));
app.post("/users/:id", require("./api/users/update"));

// Not Found
app.use((_req, res) => res.status(404).send("Not Found"));
