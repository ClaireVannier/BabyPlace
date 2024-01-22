const currentMiddlewareUser = (req, res, next) => {
  if (+req.params.id !== req.user.id && !req.user.isNursery) {
    return res
      .status(403)
      .send({ message: "Interdiction d'accéder à la ressource" });
  }
  return next();
};

module.exports = currentMiddlewareUser;
