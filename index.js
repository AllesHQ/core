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
app.post("/users/:id/password", require("./api/users/password/update"));
app.post("/users/:id/password/verify", require("./api/users/password/verify"));
app.post("/users/:id/xp", require("./api/users/xp"));
app.post("/users/:id/coins", require("./api/users/coins"));
app.get("/:key/:value", require("./api/users/query"));

// Not Found
app.use((_req, res) => res.status(404).send("Not Found"));
