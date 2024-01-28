import { NavLink } from "react-router-dom";
import logoresa from "../../assets/img-time.svg";
import logoblanc from "../../assets/logo-blanc.svg";

function ConfirmationBooking() {
  return (
    <div className="confirmation-container">
      <div className="logo-container">
        <img src={logoblanc} alt="texte du site" />
      </div>
      <img
        className="confirmation-img"
        src={logoresa}
        alt="femme avec une horloge"
      />
      <h2 className="confirmation-title">Fantastique !</h2>
      <p className="account-created">
        Votre réservation a bien été effectuée ✅
      </p>
      <p className="need-information">
        La crèche se réserve le droit d'annuler malgré tout, vous pouvez suivre le statut de votre réservation depuis votre profil.
      </p>
      <NavLink to="/profil" className="gotofile">
        Consulter mes réservations
      </NavLink>
    </div>
  );
}

export default ConfirmationBooking;
