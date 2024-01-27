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
        La crèche Picoti confirme accueillir votre enfant le 12 janvier.
      </p>
      <p className="need-information">
        La crèche se reserve le droit d'annuler malgré tout, vous pouvez suivre
        le statut de votre réservation dans votre profil.
      </p>
      <NavLink to="/profil" className="gotofile">
        Aller voir mon profil
      </NavLink>
    </div>
  );
}

export default ConfirmationBooking;
