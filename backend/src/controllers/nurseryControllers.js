const tables = require("../tables");

const get = async (req, res) => {
  try {
    const nursery = await tables.nursery.read(req.params.id);

    if (nursery == null) {
      res.sendStatus(404);
    } else {
      res.json(nursery);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json({ sucess: false, message: err.message });
  }
};

const post = async (req, res) => {
  tables.nursery
    .create(req.body)
    .then(() => {
      res.status(201).json({ message: "Crèche créer avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};

const put = async (req, res) => {
  const nursery = req.body;
  const nurseryId = req.params.id;

  try {
    const affectedRows = await tables.nursery.update(nursery, nurseryId);

    if (affectedRows > 0) {
      res.status(200).json({ success: true, message: "Mise à jour réussie." });
    } else {
      res.status(404).json({
        success: false,
        message: "Aucune crèche trouvée pour la mise à jour.",
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
};
