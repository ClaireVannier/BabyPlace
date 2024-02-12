import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth.context";
import { NavLink } from "react-router-dom";
import { useHttp } from "../../contexts/http.context";

function Profile() {

  const auth = useAuth();
  const http = useHttp();

  const parent = auth.profil.parent;
  const childrenId = auth.profil.children[0].id;
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    http.get(`booking/${childrenId}`)
      .then((resp) => {
        if (resp.status === 200) {
          setBookingList(resp.data);
        }
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);

  const changeBackground = (statut) => {
    if (statut === "ACCEPTÉE") {
      return '#22c55e';
    } else if (statut === "En attente") {
      return 'orange';
    } else if (statut === "REJETÉE") {
      return 'red';
    } else {
      return 'defaultColor';
    }
  };
  const toTitleCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char, index) => {
      return index === str.length - 1 ? char : char.toUpperCase();
    });
  };


  const StatutTitleCase = (statut) => {
    const newStatut = toTitleCase(statut);
    return newStatut;
  };


  return (
    <div className="profilContainer">
      <div className="header-profil">
        <div>
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
          <NavLink to="/setting" className="iconsearch">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="22" height="22"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
            </svg>
          </NavLink></div>
        <h2 className="title-profil">Mes Réservations 📆</h2>
      </div>

      <div className="nameiconuser">

        <img
          className="iconprofil"
          src={`${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${parent.avatar_url}`}
          alt="profil"
        />

        <h3 className="name-user">{`Bonjour ${parent.firstname} ${parent.lastname} ! 👋`}</h3>

      </div>

      <ul className="reservationContainer">

        {bookingList.map((reservation, index) => (
          <li className="reservation" key={index}>

            <img
              className="iconnursery"
              src={`${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${reservation.picture_url}`}
              alt="illustration creche"
            />

            <p className="namereservation">

              {` ${reservation.name} du ${reservation.start_date} au ${reservation.end_date}`}
            </p>
            <div className="statut-profil">
              <p className="status" style={{ backgroundColor: changeBackground(reservation.statut) }}>{StatutTitleCase(reservation.statut)}</p>
            </div>

          </li>
        ))}

      </ul>

    </div >
  );
}

export default Profile;
