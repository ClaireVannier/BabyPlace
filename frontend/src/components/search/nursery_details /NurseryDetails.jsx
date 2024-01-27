import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function NurseryDetails({ nursery }) {

  if (!nursery) {
    return <p>Chargement...</p>;
  }
  
  return (
    <div className="nursery-detail-container">
      <h2 className="nursery-detail-name">{nursery.name}</h2>
      <div className="nursery-detail-container-white">
        <img
          className="nursery-detail-img"
          src={`${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${nursery.picture_upload_url}`}
          alt={nursery.name}
        />
        <div className="nursery-detail-info">
          <p>
            <span>Adresse:</span> <br />
            {nursery.address}
          </p>
          <p>
            <span>Description:</span> <br />
            {nursery.description}
          </p>
          <p>
            <span>Horaire: </span>
            <br /> 9h-16h
          </p>
          <h3>Activités disponibles :</h3>
          <ul>
            {nursery.outdoor_space && <li> - Espace extérieur</li>}
            {nursery.homemade_meals && <li> - Repas maison</li>}
            {nursery.developmental_activities && (
              <li> - Activités de développement</li>
            )}
            {nursery.musical_activities && <li> - Eveil musical</li>}
          </ul>
          <p>Nombre de place restante: {nursery.capacity}</p>
        </div>
        <div className="booking-container">
          <NavLink
            to={`/nursery/booking/${nursery.id}`}
            className="reservation-NavLink"
            type="button"
          >
            Suivant
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NurseryDetails;

