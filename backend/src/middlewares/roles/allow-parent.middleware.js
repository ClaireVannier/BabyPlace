const allowParentMiddleware = (req, res, next) => {
  if (!req.user || req.user.isNursery) {
    return res.status(403).json({ error: "Ce n'est pas un parent" });
  }
  return next();
};

const matchParentIdMiddleware = (req, res, next) => {
  const { id } = req.params;
  if (req.user.profil.parent.id !== +id) {
    return res.status(403).json({ error: "Impossible de récupérer ce profil parent" });
  }
  return next();
};

const matchChildrenIdMiddleware = (req, res, next) => {
  const { childrenId } = req.params;
  if (req.user.profil.children[0].id !== +childrenId) {
    return res.status(403).json({ error: "Impossible de récupérer cett réservation" });
  }
  return next();
};



module.exports = { allowParentMiddleware, matchParentIdMiddleware, matchChildrenIdMiddleware };