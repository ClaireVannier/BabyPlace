import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";

function Login() {
  const navigate = useNavigate();

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
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData)
      .then((res) => {
        const token = res.data.token;
        const user = jwtDecode(token);
        console.log(user);
        navigate("/search");
      })
      .catch((err) => {
        console.error(err);
      });
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
          <button type="submit" className="formBtn">
            Se connecter
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
