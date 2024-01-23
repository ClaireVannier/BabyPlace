const jwt = require("jsonwebtoken");
const tables = require("../../tables");

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  return jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.APP_SECRET,
    (err, data) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }
      return tables.user
        .getProfile(data.id)
        .then(([rows]) => {
          if (!rows.length) {
            return res.status(401).json({ error: "Ce profil n'existe pas" });
          }
          // eslint-disable-next-line prefer-destructuring
          req.user = rows[0];

          return next();
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    }
  );
};

const authAdminMiddleware = (req, res) => {
  if (!req.user || req.user.isNursery !== 1) {
    return res.status(403).json({ error: "Ce n'est pas une crèche" });
  }
  return res
    .status(200)
    .json({ message: "Authentication réussie en tant que crèche" });
};

module.exports = { authMiddleware, authAdminMiddleware };
