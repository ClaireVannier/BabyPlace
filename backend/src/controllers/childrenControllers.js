const tables = require("../tables");

const get = async (req, res) => {
  try {
    const children = await tables.children.read(req.params.id);

    if (children == null) {
      res.sendStatus(404);
    } else {
      res.json(children);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json({ sucess: false, message: err.message });
  }
};

const post = async (req, res) => {
  tables.children
    .create(req.body)
    .then(() => {
      res
        .status(201)
        .json({ sucess: true, message: "Enfant crée avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};

const put = async (req, res) => {
  const children = req.body;
  const childrenId = req.params.id;

  try {
    const affectedRows = await tables.children.update(children, childrenId);

    if (affectedRows > 0) {
      res.status(200).json({ success: true, message: "Mise à jour réussie." });
    } else {
      res.status(404).json({
        success: false,
        message: "Aucun enfant trouvé pour la mise à jour.",
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
