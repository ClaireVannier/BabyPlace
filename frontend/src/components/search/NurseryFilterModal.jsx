import React, { useState } from "react";
import PropTypes from "prop-types";

function NurseryFilterModal({ applyFilters, appliedFilters, setToggleModal, setFilteredNurseries }) {
  const [outdoorSpace, setOutdoorSpace] = useState(appliedFilters.outdoorSpace);
  const [homemadeMeals, setHomemadeMeals] = useState(
    appliedFilters.homemadeMeals
  );
  const [developmentalActivities, setDevelopmentalActivities] = useState(
    appliedFilters.developmentalActivities
  );
  const [musicalActivities, setMusicalActivities] = useState(
    appliedFilters.musicalActivities
  );
  const [selectedDate, setSelectedDate] = useState(appliedFilters.date);

  const closeModal = () => {
    setToggleModal(false);
  }


  const handleSearch = () => {
    const filters = {
      outdoorSpace,
      homemadeMeals,
      developmentalActivities,
      musicalActivities,
      date: selectedDate,
    };

    applyFilters(filters);
  };

  const handleReset = () => {
    setOutdoorSpace(false);
    setHomemadeMeals(false);
    setDevelopmentalActivities(false);
    setMusicalActivities(false);
    setSelectedDate("");
    setFilteredNurseries([]);
  };

  return (
    <div className="filter-modal">
      <div className="filtercontainer">
        <button type="button" className="resetfilter" onClick={handleReset}>
          Réinitialiser
        </button>
        <div onClick={closeModal}>X</div>
      </div>
      <h2 className="titlefilter">Cocher pour filtrer</h2>
      <div className="checkboxcontainer">
        <label>
          <input
            className="checkboxfilter"
            type="checkbox"
            checked={outdoorSpace}
            onChange={() => setOutdoorSpace(!outdoorSpace)}
          />
          Espace extérieur
        </label>
        <label>
          <input
            className="checkboxfilter"
            type="checkbox"
            checked={homemadeMeals}
            onChange={() => setHomemadeMeals(!homemadeMeals)}
          />
          Repas Maison
        </label>
        <label>
          <input
            className="checkboxfilter"
            type="checkbox"
            checked={developmentalActivities}
            onChange={() =>
              setDevelopmentalActivities(!developmentalActivities)
            }
          />
          Développement de l'enfant
        </label>
        <label>
          <input
            className="checkboxfilter"
            type="checkbox"
            checked={musicalActivities}
            onChange={() => setMusicalActivities(!musicalActivities)}
          />
          Eveil Musical
        </label>
      </div>
      <button type="button" className="searchfilter" onClick={handleSearch}>
        Rechercher
      </button>
    </div>
  );
}

export default NurseryFilterModal;

NurseryFilterModal.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  appliedFilters: PropTypes.shape({
    outdoorSpace: PropTypes.bool,
    homemadeMeals: PropTypes.bool,
    developmentalActivities: PropTypes.bool,
    musicalActivities: PropTypes.bool,
    date: PropTypes.string,
  }).isRequired,
};
