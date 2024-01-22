const jwt = require("jsonwebtoken");
const UserManager = require("../managers/UserManager");

const userManager = new UserManager();

function generateAccessToken(data) {
  return jwt.sign(data, process.env.APP_SECRET, { expiresIn: "86400s" });
}

const getUsers = async (_, res) => {
  try {
    const users = await UserManager.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const postLogin = async (req, res) => {
  try {
    const user = await UserManager.login(req.body);
    if (user) {
      const token = generateAccessToken({ id: user.id });
      res.send({ token });
    } else {
      res.status(401).send({ error: "Identifiant incorrect" });
    }
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const postUser = async (req, res) => {
  try {
    const userId = await userManager.create(req.body);
    res.send({
      id: userId,
      email: req.body.email,
      password: req.body.password,
      is_nursery: req.body.isNursery,
    });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
};

const getProfil = (req, res) => {
  res.send(req.user);
};

const getUser = async (req, res) => {
  const id = +req.params.id;
  try {
    const [result] = await UserManager.find(id);
    if (!result.length) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.send(result[0]);
  } catch (error) {
    return res.status(422).send({ error: error.message });
  }
};

module.exports = {
  getUsers,
  postUser,
  postLogin,
  getProfil,
  getUser,
};
