const jwt = require("jsonwebtoken");
const tables = require("../tables");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.APP_SECRET, { expiresIn: "3600s" });
}

// s'inscrire en tant que parent
const register = async (req, res) => {
  tables.user
    .create(req.body, false)
    .then(() => {
      res.status(201).json({ message: "Compte crée avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};

// s'inscrire en tant que pro
const registerPro = async (req, res) => {
  tables.user
    .create(req.body, true)
    .then(() => {
      res.status(201).json({ message: "Compte crée avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};

// se connecter
const login = async (req, res) => {
  try {
    const user = await tables.user.login(req.body);
    if (user) {
      const token = generateAccessToken({
        id: user.id,
        isNursery: user.is_nursery,
      });
      res.send({ token });
    } else {
      res.status(401).send({ error: "Identifiants incorrects !" });
    }
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

// const getAll = async (_, res) => {
//   try {
//     const users = await UserManager.findAll();
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500);
//   }
// };

// const getById = async (req, res) => {
//   const id = +req.params.id;
//   try {
//     const [result] = await UserManager.find(id);
//     if (!result.length) {
//       return res.status(404).send({ error: "User not found" });
//     }
//     return res.send(result[0]);
//   } catch (error) {
//     return res.status(422).send({ error: error.message });
//   }
// };

// const getProfil = (req, res) => {
//   res.send(req.user);
// };

module.exports = {
  // getAll,
  register,
  registerPro,
  login,
  // getById,
};
