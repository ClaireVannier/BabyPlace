import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import logocoeur from "../../assets/logocoeur.svg";

function Booking() {
  const { id } = useParams();
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);


  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    childrenId: null,
    nurseryId: parseInt(id, 10),
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleCheckboxChange = (childId) => {
    // Si la checkbox actuelle est déjà sélectionnée, désélectionner
    // Sinon, sélectionner la checkbox et désélectionner l'autre
    setSelectedCheckbox((prevSelected) =>
      prevSelected === childId ? null : childId
    );
  };

  return (
    <div className="reservation-container">
      <div className="header-reservation-container">
        <img src={logocoeur} alt="logo du coeur" className="logo-resa-coeur" />
        <h2 className="title-resa">Réserver une place</h2>
      </div>
      <div className="info-reservation-container">
        <div>
          <label>
            Je réserve du: <br />
            <input
              type="datetime-local"
              name="startDate"
              onChange={handleChange}
            />
          </label>
          <label>
            {" "}
            <br />
            au: <br />
            <input
              type="datetime-local"
              name="endDate"
              onChange={handleChange}
            />
          </label>
          <p className="children-resa">Pour mon/mes enfant(s):</p>
          {/* {children.map((child) => (
            <label key={child.id}>
              <p>{child.firstname}</p>
              <input
                className="child-check"
                type="checkbox"
                value={child.id}
                checked={selectedCheckbox === child.id}
                onChange={() => handleCheckboxChange(child.id)}
              />
            </label>
          ))} */}
        </div>
        <NavLink
          to="/booking/confirmation"
          type="submit"
          className="button-reservation"
        >
          Réserver
        </NavLink>
      </div>
    </div>
  );

}

export default Booking;
