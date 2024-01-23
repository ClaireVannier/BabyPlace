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
      <h2 className="confirmation-title">Votre dossier est complet!</h2>
      <p className="need-information">
        Vous pouvez maintenant profiter de toutes les fonctionnalités du site et
        {params.isNursery === "true"
          ? " accéder au dashboard."
          : " commencer à faire votre première recherche."}
      </p>
      <NavLink
        to={params.isNursery === "false" ? "/search" : "/dashboard"}
        className="gotofile"
        type="button"
      >
        {params.isNursery === "true"
          ? "Accéder au dashboard"
          : "Rechercher une crèche"}
      </NavLink>
    </div>
  );
}

export default ConfirmationFile;
