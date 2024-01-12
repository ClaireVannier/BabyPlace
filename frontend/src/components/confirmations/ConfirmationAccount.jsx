import mombaby from "../../assets/mom-baby-1.svg";
import logoblanc from "../../assets/logo-blanc.svg";

function ConfirmationAccount() {
  return (
    <div className="confirmation-container">
      <div className="logo-container">
        <img src={logoblanc} alt="texte du site" />
      </div>
      <img
        className="confirmation-img"
        src={mombaby}
        alt="femme qui tient un bébé"
      />
      <h2 className="confirmation-title">Bienvenue!</h2>
      <p className="account-created">Votre compte a été créé avec succès !</p>
      <p className="need-information">
        L'accueil en structure collective nécéssite que vous remplissiez des
        informations administrative obligatoires. <br />{" "}
        <span>Promis, ca sera la seule fois! 😁</span>
      </p>
      <button className="gotofile" type="button">
        Compléter mon dossier
      </button>
    </div>
  );
}

export default ConfirmationAccount;
