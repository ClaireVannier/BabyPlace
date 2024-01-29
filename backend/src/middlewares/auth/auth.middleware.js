const jwt = require("jsonwebtoken");
const tables = require("../../tables");

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
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
        .getProfil(data.userId, data.isNursery)
        .then((profil) => {
          if (!profil) {
            return res.status(401).json({ error: "Ce profil n'existe pas" });
          }
          // eslint-disable-next-line prefer-destructuring
          req.user = {
            userId: data.userId,
            isNursery: data.isNursery,
            profil: profil
          };
          return next();
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    }
  );
};



module.exports = { authMiddleware };
