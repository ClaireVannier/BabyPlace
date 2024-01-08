import { useState } from "react";
import { Link } from "react-router-dom";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    // Ajoutez ici la logique pour traiter les données du formulaire (connexion, appel à l'API, etc.)
    console.info("Données du formulaire soumises :", formData);
    // Réinitialiser le formulaire après la soumission si nécessaire
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <section className="formContainer">
      <div className="logoForm">
        <img id="logoFormCoeur" src={logocoeur} alt="coeur du site" />
        <img id="logoFormTxt" src={logobaby} alt="texte du site" />
      </div>
      <div className="loginForm">
        <h2 className="titleForm">Je me connecte !</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email: <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email"
              required
            />
          </label>
          <label>
            Mot de Passe: <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="mot de passe"
              required
            />
          </label>
          <button className="formBtn" type="submit">
            Se connecter
          </button>
          <p className="linktoregister">
            Nouveau sur BabyPlace ? <br />
            <Link to="/register">Inscrivez-vous ici</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
