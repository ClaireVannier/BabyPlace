import React, { useState } from "react";

function Profile() {
  const [parentData, setParentData] = useState({
    firstName: "Claire",
    lastName: "Vannier",
  });

  const fakeReservations = [
    { id: 1, name: "Creche A", booked_at: "2023-09-12 12:00:00" },
    { id: 2, name: "Creche B", booked_at: "2023-09-12 12:00:00" },
    { id: 3, name: "Creche C", booked_at: "2023-09-12 12:00:00" },
    { id: 4, name: "Creche D", booked_at: "2023-09-12 12:00:00" },
    { id: 5, name: "Creche E", booked_at: "2023-09-12 12:00:00" },
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
      <h2 className="profilTitle">{`Bonjour ${parentData.firstName} ${parentData.lastName} 😁 `}</h2>
      <h3 className="myreservations">Mes Réservations</h3>
      <ul className="reservationContainer">
        {fakeReservations.map((reservation) => (
          <li className="reservation" key={reservation.id}>
            {` ${reservation.name} Date: ${reservation.booked_at}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
