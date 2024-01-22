import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import exports from "../search/FakeData";
import logocoeur from "../../assets/logocoeur.svg";

function Reservation() {
  // extrait l'id de l'url
  const { id } = useParams();
  // cet état stockera l'id de l'enfant séléctionner
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  // TODO : créer un contexte "AuthContext"
  // ce contexte encapsule l'objet {Parent}, utilisable alors partout dans tous les composants de l'appli
  // Ici : useContext(AuthContext) et récupérer {Parent}

  // viens rechercher la crèche qui correspond à l'id extrait des paramètre d'url (si id 1 récupere les infos de la creche correspondant à l'id 1)
  const nursery = exports.fakeNurseries.find(
    (nursery) => nursery.id === parseInt(id, 10)
  );
  const parent = exports.fakeParents;
  const children = parent[0].children; // mon contexte ne contient qu'un seul parent

  // on créer un objet réservations vide avec l'id de l'enfant séléctionnée via la checkbox
  const booking = {
    startDate: "",
    endDate: "",
    childrenId: null,
    nurseryId: parseInt(id, 10),
  };
  // cette fonction met à jour la valeur des propriétés start et end en fonction des valeurs des calendriers.
  // on utilise 2 conditions pour différencier les deux input en les comparant à leur nom
  const getCalendarValue = (e) => {
    if (e.target.name === "start_date") {
      booking.startDate = e.target.value;
    }
    if (e.target.name === "end_date") {
      booking.endDate = e.target.value;
    }
    console.log(booking);
  };
  // définit une fonction qui permet de mettre à jour l'état de la checkbox. elle prend en parametre l'id de l'enfant.
  // prevSelected represente la valeur actuelle de la checkbox avant modification
  // si prevSelected (valeur actuelle) et egal à l'id de l'enfant acutelle (id de la checkbox) alors checkbox deja selectionner
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
        <p className="name-reservation">{nursery.name}</p>
        <div>
          <label>
            Je réserve du: <br />
            <input
              type="datetime-local"
              name="start_date"
              onChange={getCalendarValue}
            />
          </label>
          <label>
            {" "}
            <br />
            au: <br />
            <input
              type="datetime-local"
              name="end_date"
              onChange={getCalendarValue}
            />
          </label>
          <p className="children-resa">Pour mon/mes enfant(s):</p>
          {children.map((child) => (
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
          ))}
        </div>
        <NavLink
          to="/reservation/confirmation"
          type="submit"
          className="button-reservation"
        >
          Réserver
        </NavLink>
      </div>
    </div>
  );
}

export default Reservation;
