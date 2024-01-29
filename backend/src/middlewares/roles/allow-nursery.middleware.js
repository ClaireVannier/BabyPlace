const allowNurseryMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isNursery) {
    return res.status(403).json({ error: "Ce n'est pas une crèche" });
  }
  return next();

};

const matchNurseryIdMiddleware = (req, res, next) => {
  const { id, nurseryId } = req.params;
  if (req.user.profil.nursery.id !== (+id || +nurseryId)) {
    return res.status(403).json({ error: "Impossible de récupérer ce profil crèche" });
  }
  return next();
};


module.exports = { allowNurseryMiddleware, matchNurseryIdMiddleware };
