import { NavLink } from "react-router-dom";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import imgregister from "../../assets/imgregister.svg";

function AdministrativeChildren() {
  const child = {
    firstname: "",
    birth_date: "",
    is_walking: false,
    doctor: "",
    allergies: "",
    parent_id: "",
  };

  const getChildValue = (e) => {
    if (e.target.name === "firstname") {
      child.firstname = e.target.value;
    }
    if (e.target.name === "birth_date") {
      child.birth_date = e.target.value;
    }
    if (e.target.name === "is_walking") {
      child.is_walking = e.target.checked;
    }
    if (e.target.name === "doctor") {
      child.doctor = e.target.value;
    }
    if (e.target.name === "allergies") {
      child.allergies = e.target.value;
    }
    // console.log(child);
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
        <form action="submit">
          <label>
            Prénom <br />
            <input
              name="firstname"
              className="input-file-secu"
              type="text"
              onChange={getChildValue}
              required
            />
          </label>
          <label>
            Date de naissance <br />
            <input
              name="birth_date"
              className="input-file-secu"
              type="date"
              onChange={getChildValue}
              required
            />
          </label>
          <label>
            Marcheur? <br />
            Cocher si oui:
            <input
              name="is_walking"
              className="input-checkbox"
              type="checkbox"
              onChange={getChildValue}
              required
            />
          </label>
          <label>
            Nom du médecin traitant: <br />
            <input
              name="doctor"
              className="input-file-secu"
              type="text"
              onChange={getChildValue}
              required
            />
          </label>
          <label>
            Allergies connues: <br />
            <input
              name="allergies"
              className="input-file-secu"
              type="text"
              onChange={getChildValue}
              required
            />
          </label>

          <p className="confirm-file">
            Tout est bien complet? Alors vous pouvez:
          </p>
          <NavLink
            to="/register/confirmationfile"
            className="formBtnRegister"
            type="submit"
          >
            Valider mon dossier
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default AdministrativeChildren;
