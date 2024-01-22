import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import imgregister from "../../assets/imgregister.svg";

function RegisterPro() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/register/pro`, {
        email: formData.email,
        password: formData.password,
      })
      .then((resp) => {
        console.info(resp);
        // use navigate vers le form de dossier admin
        // dossier admin: faire le form, axios post, postamner avant de faire le form
        // une fois back ok, et une fois form ok pour post (verifier dans bdd), rediriger vers confirmation file
        //
        // TODO : post le formulaire dans la table nursery
      })
      .catch((err) => {
        console.error(err);
      });
    console.info("Données du formulaire soumises :", formData);
  };

  return (
    <div className="registerContainer">
      <img className="imgRegister" src={imgregister} alt="inscription" />
      <div className="registerForm">
        <div className="logoForm">
          <img id="logoFormCoeur" src={logocoeur} alt="coeur du site" />
          <img id="logoFormTxt" src={logobaby} alt="texte du site" />
        </div>
        <h2 className="titleForm">Je m'inscris sur BabyPlace</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email: <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mot de passe: <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirmer le mot de passe: <br />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          {/* a deplacer dans le formulaire dinscription dossier coté creche  */}
          {/* <label>
            Nom de la crèche: <br />
            <input type="text" name="name" onChange={handleChange} required />
          </label> */}
          <button className="formBtn" type="submit">
            S'inscrire
          </button>
        </form>
        <p className="linktologin">
          Déjà inscrit? <Link to="/login">Connectez-vous ici</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPro;
