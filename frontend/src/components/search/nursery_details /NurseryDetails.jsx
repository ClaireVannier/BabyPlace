import { NavLink } from "react-router-dom";

function NurseryDetails({ nursery }) {

  if (!nursery) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="nursery-detail-container">
      <div className="header-details">
        <NavLink
          to="/search">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
        </NavLink>
        <h2 className="nursery-detail-name">{nursery.name}</h2>
      </div>
      <div className="nursery-detail-container-white">
        <img
          className="nursery-detail-img"
          src={`${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${nursery.picture_url}`}
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
          <p>Capacité d'accueil : {nursery.capacity}</p>
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

