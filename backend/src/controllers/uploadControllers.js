const tables = require("../tables");

const createIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tables.upload.createIncome(req, id);
    return res.status(201).send({ result });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const createPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tables.upload.createPhoto(req, id);
    return res.status(201).send({ result });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const createOutsitePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tables.upload.createOutsitePermission(req, id);
    return res.status(201).send({ result });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const createNurseryPicture = async (req, res) => {
  try {
    const { nurseryId } = req.params;
    const result = await tables.upload.createNurseryPicture(req, nurseryId);
    return res.status(201).send({ result });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { createIncome, createPhoto, createOutsitePermission, createNurseryPicture };
