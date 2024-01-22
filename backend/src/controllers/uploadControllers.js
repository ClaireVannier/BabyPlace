const tables = require("../tables");

const getList = async (req, res) => {
  try {
    const [result] = await tables.upload.findAll();
    return res.send(result);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const result = await tables.upload.create(req.file);
    await tables.user.addAvatar(req.user.id, result.id);
    return res.status(201).send({ ...req.user, avatar: result });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { getList, create };
