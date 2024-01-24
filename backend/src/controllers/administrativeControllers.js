const tables = require("../tables");

const get = async (req, res) => {
  try {
    const administrative = await tables.administrative.read(req.params.id);

    if (administrative == null) {
      res.sendStatus(404);
    } else {
      res.json(administrative);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json({ sucess: false, message: err.message });
  }
};

const post = async (req, res) => {
  tables.administrative
    .create(req.body)
    .then((insertId) => {
      tables.parent.setAdmininistrativeId(insertId, req.body.parentId);
      res.status(201).json({ insertId });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};

const put = async (req, res) => {
  const administrative = req.body;
  const administrativeId = req.params.id;

  try {
    const affectedRows = await tables.administrative.update(
      administrative,
      administrativeId
    );

    if (affectedRows > 0) {
      res.status(200).json({ success: true, message: "Mise à jour réussie." });
    } else {
      res.status(404).json({
        success: false,
        message: "Aucun dossier trouvé pour la mise à jour.",
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
