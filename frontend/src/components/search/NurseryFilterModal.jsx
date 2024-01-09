// // NurseryFilterModal.js
// import React, { useState } from "react";

// function NurseryFilterModal({ applyFilters }) {
//   const [outdoorSpace, setOutdoorSpace] = useState(false);
//   const [homemadeMeals, setHomemadeMeals] = useState(false);
//   const [developmentalActivities, setDevelopmentalActivities] = useState(false);
//   const [musicalActivities, setMusicalActivities] = useState(false);

//   const handleSearch = () => {
//     const filters = {
//       outdoorSpace,
//       homemadeMeals,
//       developmentalActivities,
//       musicalActivities,
//     };

//     applyFilters(filters);
//   };

//   return (
//     <div className="filter-modal">
//       <label>
//         Outdoor Space
//         <input
//           type="checkbox"
//           checked={outdoorSpace}
//           onChange={() => setOutdoorSpace(!outdoorSpace)}
//         />
//       </label>
//       <label>
//         Homemade Meals
//         <input
//           type="checkbox"
//           checked={homemadeMeals}
//           onChange={() => setHomemadeMeals(!homemadeMeals)}
//         />
//       </label>
//       <label>
//         Developmental Activities
//         <input
//           type="checkbox"
//           checked={developmentalActivities}
//           onChange={() => setDevelopmentalActivities(!developmentalActivities)}
//         />
//       </label>
//       <label>
//         Musical Activities
//         <input
//           type="checkbox"
//           checked={musicalActivities}
//           onChange={() => setMusicalActivities(!musicalActivities)}
//         />
//       </label>
//       <button type="button" onClick={handleSearch}>
//         Rechercher
//       </button>
//     </div>
//   );
// }

// export default NurseryFilterModal;
