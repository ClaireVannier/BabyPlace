import PropTypes from "prop-types";

function NurseryCard({ nursery }) {
  return (
    <div className="nurseryCard">
      <img
        className="nurseryimg"
        src={nursery.picture_url}
        alt={nursery.name}
      />
      <h3 className="nurseryname">{nursery.name}</h3>
      <p className="nurseryadress">{nursery.adress}</p>
    </div>
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
