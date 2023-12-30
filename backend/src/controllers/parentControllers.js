const tables = require("../tables");

const get = async (req, res) => {
  try {
    const parent = await tables.parent.read(req.params.id);

    if (parent == null) {
      res.sendStatus(404);
    } else {
      res.json(parent);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json({ sucess: false, message: err.message });
  }
};

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

const put = async (req, res) => {
  const parent = req.body;
  const parentId = req.params.id;

  try {
    const affectedRows = await tables.parent.update(parent, parentId);

    if (affectedRows > 0) {
      res.status(200).json({ success: true, message: "Mise à jour réussie." });
    } else {
      res.status(404).json({
        success: false,
        message: "Aucun parent trouvé pour la mise à jour.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  get,
  post,
  put,
};
