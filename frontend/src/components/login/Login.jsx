import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import { useAuth } from "../../contexts/auth.context";
import { useHttp } from "../../contexts/http.context";

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const http = useHttp();


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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await http.post(`login`, formData);
      const token = resp.data.token;
      const payload = jwtDecode(token);
      setAuthData(token, payload);
      await new Promise((resolve) => setTimeout(resolve, 0));
      navigate(payload.isNursery ? "/dashboard" : "/search");
    } catch (err) {
      console.error(err);
    }
  };

  const setAuthData = (token, payload) => {
    auth.setToken(token);
    auth.setUserId(payload.userId);
    auth.setIsNursery(payload.isNursery);
    auth.setProfil(payload.profil);
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
            Email : <br />
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
            Mot de passe : <br />
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
      {/* <ToastContainer /> */}
    </section >

  );
}

export default Login;
