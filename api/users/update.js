const db = require("../../db");
const values = {
  username: "string",
  name: "string",
  description: "string",
  pronouns: "string",
  email: "string",
  phone: "string",
  discord: "string",
  country: "string",
  bDay: "number",
  bMonth: "number",
  bYear: "number",
};

module.exports = async (req, res) => {
  // Check updates
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    if (
      typeof req.body[Object.keys(req.body)[i]] !==
      values[Object.keys(req.body)[i]]
    )
      return res.status(400).json({ err: "badRequest" });
  }

  // Get User
  const user = await db.User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ err: "missingResource" });

  // Update
  await user.update(req.body);

  // Response
  res.json({
    id: user.id,
    username: user.username,
    name: user.name,
  });
};