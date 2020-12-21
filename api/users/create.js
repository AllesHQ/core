const db = require("../../db");
const uuid = require("uuid").v4;
const argon2 = require("argon2");

module.exports = async (req, res) => {
  const { name, username, password, email, phone } = req.body;
  if (typeof username !== "string" || typeof name !== "string")
    return res.status(400).send("Bad Request");

  // Password
  let passwordHash = null;
  if (typeof password === "string") {
    try {
      passwordHash = await argon2.hash(password);
    } catch (err) {
      return res.status(500).send("Internal Error");
    }
  }

  // Check Username
  if (await db.User.findOne({ where: { username } }))
    return res.status(400).send("Username Conflict");

  // Create User
  const user = await db.User.create({
    id: uuid(),
    name,
    username,
    password: passwordHash,
    email: typeof email === "string" ? email : null,
    phone: typeof phone === "string" ? phone : null,
  });

  // Response
  res.json({
    id: user.id,
    username: user.username,
    name: user.name,
  });
};
