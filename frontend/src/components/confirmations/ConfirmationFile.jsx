import logodossier from "../../assets/img-dossier.svg";
import logoblanc from "../../assets/logo-blanc.svg";

function ConfirmationFile() {
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
        commencer à faire votre première recherche.
      </p>
      <button className="gotofile" type="button">
        Rechercher une crèche
      </button>
    </div>
  );
}

export default ConfirmationFile;
