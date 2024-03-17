const jwt = require("jsonwebtoken");
const tables = require("../tables");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.APP_SECRET, { expiresIn: "3600s" });
}

// s'inscrire en tant que parent
const register = async (req, res) => {
  tables.user
    .create(req.body, false)
    .then((insertId) => {
      res.status(201).json({ insertId });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};

// s'inscrire en tant que pro
const registerNursery = async (req, res) => {
  tables.user
    .create(req.body, true)
    .then((insertId) => {
      res.status(201).json({ insertId });
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

      const profil = await tables.user.getProfil(user.id, !!user.is_nursery);
      const token = generateAccessToken({
        userId: user.id,
        isNursery: !!user.is_nursery,
        profil: profil
      });
      res.send({ token });
    } else {
      res.status(401).send({ error: "L'utilisateur n'existe pas ou les identifiants sont incorrects !" });
    }
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

const deleteUser = async (req, res) => {
  const parentId = req.params.id;

  try {
    const affectedRows = await tables.parent.delete(parentId);

    if (affectedRows > 0) {
      res.status(200).json({ success: true, message: "Suppression réussie." });
    } else {
      res.status(404).json({
        success: false,
        message: "Aucune résérvation trouvée pour la suppression.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = {
  register,
  registerNursery,
  login,
  deleteUser
};
