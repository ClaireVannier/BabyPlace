const validateUser = async (req, res, next) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const { email, password, isNursery } = req.body;

  if (!emailRegex.test(email)) {
    res.status(400).send({ message: `L'adresse email n'est pas valide` });
    return;
  }
  if ((password?.length ?? 0) < 4) {
    res.status(400).send({ message: `Le mot de passe est trop court` });
    return;
  }
  if (typeof isNursery !== "boolean") {
    res
      .status(400)
      .send({ message: `La valeur de is_nursery doit être un boolean` });
    return;
  }
  next();
};

module.exports = validateUser;
