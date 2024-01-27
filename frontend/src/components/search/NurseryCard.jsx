import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function NurseryCard({ nursery }) {
  return (
    <NavLink to={`nursery-details/${nursery.id}`}>
      <div className="nurseryCard">
        <img
          className="nurseryimg"
          src={`${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${nursery.picture_url}`}
          alt={nursery.name}
        />
        <h3 className="nurseryname">{nursery.name}</h3>
        <p className="nurseryadress">{nursery.address}</p>
      </div>
    </NavLink>
  );
}

export default NurseryCard;


