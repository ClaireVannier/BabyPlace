import { NavLink } from "react-router-dom";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import imgregister from "../../assets/imgregister.svg";

function RegisterForm() {
  return (
    <div className="registerContainer">
      <img className="imgRegister" src={imgregister} alt="inscription" />
      <div className="registerForm">
        <div className="logoForm">
          <img id="logoFormCoeur" src={logocoeur} alt="coeur du site" />
          <img id="logoFormTxt" src={logobaby} alt="texte du site" />
        </div>
        <h2 className="titleFormRegister">
          Je remplis mon dossier d'inscription
        </h2>
        <form action="submit">
          <label>
            N° Sécurité Sociale <br />
            <input className="input-file-secu" type="number" required />
          </label>
          <label>
            Justificatif de revenu (moins de 3 mois) <br />
            <input className="input-file" type="file" required />
          </label>
          <label>
            Autorisation de photo et vidéo <br />
            <input className="input-file" type="file" required />
          </label>
          <label>
            Autorisation de sortie <br />
            <input className="input-file" type="file" required />
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

export default RegisterForm;
