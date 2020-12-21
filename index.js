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

// Create User
app.post("/users", require("./api/users/create"));

// Not Found
app.use((_req, res) => res.status(404).send("Not Found"));
