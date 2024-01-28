import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHttp } from "../../contexts/http.context";
import axios from "axios";

import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import imgregister from "../../assets/imgregister.svg";

function RegisterNursery() {

  const http = useHttp();
  const navigate = useNavigate();

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
    http.postWithoutToken(`register/nursery`, {
        email: formData.email,
        password: formData.password,
      })
      .then((resp) => {
        if (resp.status === 201) {
          const insertId = resp.data.insertId;
          navigate(`/register/nursery/file/${insertId}`);
        } else {
          alert("Une erreur est survenue, veuillez réessayer");
        }
      })
      .catch((err) => {
        console.error(err);
      });
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

export default RegisterNursery;
