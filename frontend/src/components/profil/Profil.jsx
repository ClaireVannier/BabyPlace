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
          src={`${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${parent.avatar_url}`}
          alt="profil"
        />

        <h3 className="name-user">{`Bonjour ${parent.firstname} ${parent.lastname} ! `}</h3>

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
              {" "}
              {` ${reservation.name} du ${reservation.start_date} au ${reservation.end_date}`}
            </p>

            <p className="status">Confirmée</p>

          </li>
        ))}

      </ul>

    </div>
  );
}

export default Profile;
