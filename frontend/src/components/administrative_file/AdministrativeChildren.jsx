import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import imgregister from "../../assets/imgregister.svg";

function AdministrativeChildren() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    birthDate: "",
    isWalking: false,
    doctor: "",
    allergies: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked || value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/children`, {
        firstName: formData.firstName,
        birthDate: formData.birthDate,
        isWalking: formData.isWalking,
        doctor: formData.doctor,
        allergies: formData.allergies,
      })
      .then((resp) => {
        if (resp.status === 201) {
          console.info(resp);
          navigate("/register/confirmationfile");
        } else {
          alert("Une erreur est survenue, veuillez réessayer");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const getChildValue = (e) => {
  //   if (e.target.name === "firstname") {
  //     child.firstname = e.target.value;
  //   }
  //   if (e.target.name === "birth_date") {
  //     child.birth_date = e.target.value;
  //   }
  //   if (e.target.name === "is_walking") {
  //     child.is_walking = e.target.checked;
  //   }
  //   if (e.target.name === "doctor") {
  //     child.doctor = e.target.value;
  //   }
  //   if (e.target.name === "allergies") {
  //     child.allergies = e.target.value;
  //   }
  //   // console.log(child);
  // };

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
              required
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
