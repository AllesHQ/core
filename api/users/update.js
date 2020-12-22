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
        values[Object.keys(req.body)[i]] &&
      req.body[Object.keys(req.body)[i]] !== null
    )
      return res.status(400).send("Bad Request");
  }

  // Get User
  const user = await db.User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).send("Missing Resource");

  // Update
  try {
    await user.update(req.body);
  } catch (err) {
    return res.status(400).send("Bad Request");
  }

  // Response
  res.json({ id: user.id });
};
