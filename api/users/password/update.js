const db = require("../../../db");
const argon2 = require("argon2");

module.exports = async (req, res) => {
  if (typeof req.body.password !== "string")
    return res.status(400).send("Bad Request");

  // Get User
  const user = await db.User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).send("Missing Resource");

  // Hash password
  let password;
  try {
    password = await argon2.hash(req.body.password);
  } catch (err) {
    return res.status(500).send("Internal Error");
  }

  // Update
  await user.update({ password });

  // Response
  res.json({});
};
