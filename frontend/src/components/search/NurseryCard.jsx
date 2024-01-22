import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function NurseryCard({ nursery }) {
  return (
    <NavLink to={`nurserydetails/${nursery.id}`}>
      <div className="nurseryCard">
        <img
          className="nurseryimg"
          src={nursery.picture_url}
          alt={nursery.name}
        />
        <h3 className="nurseryname">{nursery.name}</h3>
        <p className="nurseryadress">{nursery.adress}</p>
      </div>
    </NavLink>
  );
}

export default NurseryCard;

NurseryCard.propTypes = {
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
  }).isRequired,
};
