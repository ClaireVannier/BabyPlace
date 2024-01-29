import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import imgregister from "../../assets/imgregister.svg";
import { useHttp } from "../../contexts/http.context";

function AdministrativeChildren() {

  const navigate = useNavigate();
  const http = useHttp();
  const { parentId } = useParams();

  const [formData, setFormData] = useState({
    firstName: "",
    birthDate: "",
    isWalking: false,
    doctor: "",
    allergies: "",
    parentId: parentId
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    http.postWithoutToken(`children`, formData)
      .then((resp) => {
        if (resp.status === 201) {
          navigate("/register/confirmationfile/false");
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
        <h2 className="titleFormRegister">Je renseigne mon/mes enfant(s)</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Prénom <br />
            <input
              name="firstName"
              className="input-file-secu"
              type="text"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date de naissance <br />
            <input
              name="birthDate"
              className="input-file-secu"
              type="date"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Marcheur? <br />
            Cocher si oui:
            <input
              name="isWalking"
              className="input-checkbox"
              type="checkbox"
              onChange={handleChange}
            />
          </label>
          <label>
            Nom du médecin traitant: <br />
            <input
              name="doctor"
              className="input-file-secu"
              type="text"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Allergies connues: <br />
            <input
              name="allergies"
              className="input-file-secu"
              type="text"
              onChange={handleChange}

            />
          </label>

          <p className="confirm-file">
            Tout est bien complet? Alors vous pouvez:
          </p>
          <button className="formBtnRegister" type="submit">
            Valider mon dossier
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdministrativeChildren;
