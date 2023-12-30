const tables = require("../tables");

const post = async (req, res) => {
  const parent = req.body;

  try {
    const insertId = await tables.parent.create(parent);

    res.status(201).json({ insertId });
  } catch (err) {
    console.error(err);
    res.status(500).error(err.message);
  }
};

module.exports = {
  post,
};
