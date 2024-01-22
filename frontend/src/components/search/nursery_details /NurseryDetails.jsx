import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function NurseryDetails({ nursery }) {
  return (
    <div className="nursery-detail-container">
      <h2 className="nursery-detail-name">{nursery.name}</h2>
      <div className="nursery-detail-container-white">
        <img
          className="nursery-detail-img"
          src={nursery.picture_url}
          alt={nursery.name}
        />
        <div className="nursery-detail-info">
          <p>
            <span>Adresse:</span> <br />
            {nursery.adress}
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
            to={`/nursery/reservation/${nursery.id}`}
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
NurseryDetails.propTypes = {
  nursery: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    adress: PropTypes.string.isRequired,
    picture_url: PropTypes.string.isRequired,
    description: PropTypes.string,
    outdoor_space: PropTypes.bool,
    homemade_meals: PropTypes.bool,
    developmental_activities: PropTypes.bool,
    musical_activities: PropTypes.bool,
    capacity: PropTypes.number,
  }).isRequired,
};
