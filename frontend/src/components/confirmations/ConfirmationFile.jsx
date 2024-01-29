import { NavLink, useParams } from "react-router-dom";
import logodossier from "../../assets/img-dossier.svg";
import logoblanc from "../../assets/logo-blanc.svg";

function ConfirmationFile() {
  const params = useParams();

  return (
    <div className="confirmation-container">
      <div className="logo-container">
        <img src={logoblanc} alt="texte du site" />
      </div>
      <img
        className="confirmation-img"
        src={logodossier}
        alt="dossier avec une loupe"
      />
      <h2 className="confirmation-title">Votre dossier est complet ! 🤩</h2>
      <p className="need-information">
        Vous pouvez maintenant profiter de toutes les fonctionnalités du site et <br />
        {params.isNursery === "true"
          ? " accéder au dashboard."
          : " commencer à faire votre première recherche !"}
      </p>
      <NavLink
        to="/login"
        className="gotofile"
        type="button"
      >
        {"Me connecter et " + params.isNursery === "true"
          ? "accéder au dashboard"
          : "rechercher une crèche"}
      </NavLink>
    </div>
  );
}

export default ConfirmationFile;
