import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import iconeprofil from "../../assets/profilJM.png";
import creche1 from "../../assets/creche1.jpeg";

function Profile() {
  const parentData = {
    firstName: "John",
    lastName: "Doe",
    img: iconeprofil,
  };

  const fakeReservations = [
    {
      id: 1,
      img: creche1,
      name: "Creche A",
      booked_at: "2023-09-12",
    },
    {
      id: 2,
      img: creche1,
      name: "Creche B",
      booked_at: "2023-09-12",
    },
    {
      id: 3,
      img: creche1,
      name: "Creche C",
      booked_at: "2023-09-12",
    },
    {
      id: 4,
      img: creche1,
      name: "Creche D",
      booked_at: "2023-09-12",
    },
    {
      id: 5,
      img: creche1,
      name: "Creche E",
      booked_at: "2023-09-12",
    },
  ];
  // const [reservations, setReservations] = useState([]);

  // useEffect(() => {
  //   // Supposons que vous avez une fonction pour récupérer les données du backend
  //   // et définissez les données du parent et les réservations à l'aide de setParentData et setReservations.
  //   const fetchData = async () => {
  //     try {
  //       // Remplacez ces appels API factices par vos appels API réels
  //       const parentResponse = await fetch("/api/getParentData");
  //       const parentData = await parentResponse.json();

  //       const reservationsResponse = await fetch("/api/getReservations");
  //       const reservationsData = await reservationsResponse.json();

  //       setParentData(parentData);
  //       setReservations(reservationsData);
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des données :", error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Exécutez cet effet uniquement lors de la première montée du composant

  return (
    <div className="profilContainer">
      <div className="header-profil">
        <NavLink to="/search" className="iconsearch">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </NavLink>
        <h2 className="title-profil">Mes Réservations</h2>
      </div>
      <div className="nameiconuser">
        <img
          className="iconprofil"
          src={parentData.img}
          alt="icone du profil"
        />
        <h3 className="name-user">{`Bonjour ${parentData.firstName} ${parentData.lastName} ! `}</h3>
      </div>
      <ul className="reservationContainer">
        {fakeReservations.map((reservation) => (
          <li className="reservation" key={reservation.id}>
            <img
              className="iconnursery"
              src={creche1}
              alt="illustration creche"
            />
            <p className="namereservation"> {` ${reservation.name} le ${reservation.booked_at}`}</p>
            <p className="status">Confirmée</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
