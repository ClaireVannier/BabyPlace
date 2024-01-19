const tables = require("../tables");

const get = async (req, res) => {
  try {
    const date = await tables.date.read(req.params.id);

    if (date == null) {
      res.sendStatus(404);
    } else {
      res.json(date);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json({ sucess: false, message: err.message });
  }
};

const post = async (req, res) => {
  const date = req.body;

  try {
    const insertId = await tables.date.create(date);
    res.status(201).json({ insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

const put = async (req, res) => {
  const date = req.body;
  const dateId = req.params.id;

  try {
    const affectedRows = await tables.date.update(date, dateId);

    if (affectedRows > 0) {
      res.status(200).json({ success: true, message: "Mise à jour réussie." });
    } else {
      res.status(404).json({
        success: false,
        message: "Aucune date trouvée pour la mise à jour.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const deletedate = async (req, res) => {
  const dateId = req.params.id;

  try {
    const affectedRows = await tables.date.delete(dateId);

    if (affectedRows > 0) {
      res.status(200).json({ success: true, message: "Suppression réussie." });
    } else {
      res.status(404).json({
        success: false,
        message: "Aucune date trouvée pour la suppression.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  post,
  get,
  put,
  deletedate,
};
