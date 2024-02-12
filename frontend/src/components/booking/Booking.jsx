import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logocoeur from "../../assets/logocoeur.svg";
import { useAuth } from "../../contexts/auth.context";
import { useHttp } from "../../contexts/http.context";

function Booking() {
  const auth = useAuth();
  const http = useHttp();

  const { id } = useParams();
  const nurseryId = parseInt(id, 10);
  const navigate = useNavigate();
  const children = auth.profil.children[0];

  const [availability, setAvailability] = useState(null);
  const [textColor, setTextColor] = useState('black');
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    childrenId: children.id,
    nurseryId: nurseryId,
    statut: "En attente"
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
    http.post(`booking/availability/${nurseryId}`, datesToCheck)
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
    http.post(`booking`, formData)
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
                type="date"
                name="startDate"
                onChange={handleChange}
              />
            </label>
            <label>
              {" "}
              <br />
              au: <br />
              <input
                type="date"
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
              disabled={availability && availability.overlappingBookings >= availability.capacity}
              className="button-reservation">
              Réserver
            </button>
            <p>{availability ? availability.overlappingBookings >= availability.capacity ? 'Plus de places disponibles.' : 'Il reste de la place, profitez-en !' : ''}</p>
          </form>
          <br></br>
          <p>{availability && 'Votre enfant sera pris en charge chaque jour, sans interruption ✅'}</p>
        </div>
      </div>
    </div >
  );

}

export default Booking;
