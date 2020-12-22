const db = require("../../db");

module.exports = async (req, res, next) => {
  if (!["username", "email", "phone", "discord"].includes(req.params.key))
    return next();

  // Get User
  const user = await db.User.findOne({
    where: {
      [req.params.key]: req.params.value,
    },
  });
  if (!user) return res.status(404).send("Missing Resource");

  // Response
  res.json({ id: user.id });
};
