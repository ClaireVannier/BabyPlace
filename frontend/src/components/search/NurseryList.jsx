import { NavLink } from "react-router-dom";
import { useState } from "react";
import fakeNurseries from "./FakeData";
import NurseryCard from "./NurseryCard";
import NurseryFilterModal from "./NurseryFilterModal";

function NurseryList() {
  const [filteredNurseries, setFilteredNurseries] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    outdoorSpace: false,
    homemadeMeals: false,
    developmentalActivities: false,
    musicalActivities: false,
    date: "",
  });

  const applyFilters = (filters) => {
    const filteredList = fakeNurseries.filter((nursery) => {
      return (
        (!filters.outdoorSpace ||
          nursery.outdoor_space === filters.outdoorSpace) &&
        (!filters.homemadeMeals ||
          nursery.homemade_meals === filters.homemadeMeals) &&
        (!filters.developmentalActivities ||
          nursery.developmental_activities ===
            filters.developmentalActivities) &&
        (!filters.musicalActivities ||
          nursery.musical_activities === filters.musicalActivities) &&
        (!filters.date || nursery.date === filters.date)
      );
    });
    setFilteredNurseries(filteredList);
    setToggleModal(false);
    setAppliedFilters(filters);
  };

  return (
    <>
      <div className="nurserylistcontainer">
        <NavLink to="/profil">
          <svg
            className="icon-profil"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>
        </NavLink>
        <h2 className="title-search">Garde d'enfant à la demande</h2>
        <button
          type="button"
          className="filterbtn"
          onClick={() => setToggleModal(!toggleModal)}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            className="icon-filter"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
          </svg>
        </button>
        <div>
          {toggleModal && (
            <NurseryFilterModal
              applyFilters={applyFilters}
              appliedFilters={appliedFilters}
            />
          )}
        </div>
      </div>
      <div className="cardList">
        {(filteredNurseries.length >= 1
          ? filteredNurseries
          : fakeNurseries
        ).map((item) => (
          <NurseryCard key={item.id} nursery={item} />
        ))}
      </div>
    </>
  );
}

export default NurseryList;
