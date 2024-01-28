import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import imgregister from "../../assets/imgregister.svg";
import uploadFile from "../../utils/upload-file";
import { useHttp } from "../../contexts/http.context";

function RegisterParent() {

  const navigate = useNavigate();
  const http = useHttp();

  const [avatar, setAvatar] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
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
    http.postWithoutToken(`register/parent`, {
      email: formData.email,
      password: formData.password,
    })
      .then((resp) => {
        if (resp.status === 201) {
          const insertId = resp.data.insertId;
          http.postWithoutToken(`parents`, {
            firstname: formData.firstname,
            lastname: formData.lastname,
            phone: formData.phone,
            userId: insertId
          })
            .then(async (resp2) => {
              if (resp2.status === 201) {
                const insertId = resp2.data.insertId;
                await uploadFile("Avatar", avatar, "upload-parent-avatar", insertId);
                navigate(`/register/parent/file/${insertId}`);
              } else {
                alert("Une erreur est survenue, veuillez réessayer");
              }
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          alert("Une erreur est survenue, veuillez reéssayer");
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
          <label>
            Prénom: <br />
            <input
              type="text"
              name="firstname"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nom: <br />
            <input
              type="text"
              name="lastname"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Numéro de téléphone: <br />
            <input
              type="text"
              name="phone"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Photo de profil : <br />
            <input
              className="input-file"
              type="file"
              name="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              required
            />
          </label>
          <button className="formBtn" type="submit">
            S'inscrire
          </button>
        </form>
        <p className="linktologin">
          Déjà inscrit? <br />
          <Link to="/login">Connectez-vous ici</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterParent;
