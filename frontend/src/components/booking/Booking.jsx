import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logocoeur from "../../assets/logocoeur.svg";
import { useAuth } from "../../contexts/auth.context";
import axios from "axios";

function Booking() {
  const { id } = useParams();
  const nurseryId = parseInt(id, 10);
  const navigate = useNavigate();
  const auth = useAuth();
  const children = auth.profil.children[0];
  const [availability, setAvailability] = useState(false);
  const [textColor, setTextColor] = useState('black');

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    childrenId: children.id,
    nurseryId: nurseryId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Récupérer que la date aa/mm/jj sans les heures/minutes
    const date = new Date(value).toISOString().split('T')[0];
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  useEffect(() => {
    // Dès que les dates sont renseignées, on vérifie la disponibilité en BDD
    if (formData.startDate && formData.endDate) {
      checkAvailability();
    }
  }, [formData.startDate, formData.endDate]);

  const checkAvailability = () => {
    const datesToCheck = { startDate: formData.startDate, endDate: formData.endDate };
    console.log(datesToCheck);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/booking/availability/${nurseryId}`, datesToCheck)
      .then((resp) => {
        if (resp.status === 200) {
          computeAvailability(resp.data);
        }
      })
      .catch((err) => {
        console.error(err)
      });
  }

  const computeAvailability = (availability) => {
    setAvailability(availability);
    const remainingPlaces = availability.capacity - availability.overlappingBookings;
    if (remainingPlaces > 5) setTextColor('orange');
    if (remainingPlaces > 10) setTextColor('green');
    if (remainingPlaces <= 5) setTextColor('red');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/booking`, formData)
      .then((resp) => {
        if (resp.status === 201) {
          navigate("/booking/confirmation");
        }
      })
      .catch((err) => {
        console.error(err)
      });
  };



  return (
    <div className="reservation-container">
      <div className="header-reservation-container">
        <img src={logocoeur} alt="logo du coeur" className="logo-resa-coeur" />
        <h2 className="title-resa">Réserver une place</h2>
        <p className="children-resa">Pour mon enfant : {children.firstname}</p>

      </div>
      <div className="info-reservation-container">
        <div>
          <form onSubmit={handleSubmit}>
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
            <ul>
              {
                availability &&
                <li style={{ color: textColor }}>
                  Places disponibles : {availability.capacity - availability.overlappingBookings}
                </li>
              }
            </ul>
            <button
              type="submit"
              disabled={availability.overlappingBookings >= availability.capacity}
              className="button-reservation">
              Réserver
            </button>
            <p>{availability.overlappingBookings >= availability.capacity ? 'Plus de places disponibles.' : 'Il reste de la place, profitez-en !'}</p>
          </form>
          <br></br>
          <p>Votre enfant sera pris en charge chaque jour, sans interruption ✅</p>
        </div>
      </div>
    </div >
  );

}

export default Booking;
