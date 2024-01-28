import { useAuth } from "../../contexts/auth.context";
import { useHttp } from "../../contexts/http.context";
import { useEffect, useState } from "react";

function Dashboard() {

  const auth = useAuth()
  const http = useHttp();

  const nursery = auth.profil.nursery;
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    http.get(`booking/nursery/${nursery.id}`)
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
    <div>
      <h1>Bonjour {nursery.name} ! 👋</h1>
      <div>
        {
          bookingList.map((booking, index) => (
            <div key={index}>
              <p>
                Enfant : 
                {booking.children_firstname} 
                {booking.children_is_walking ? 'enfant marche' : 'ne marche pas'} 
                {booking.start_date} - {booking.end_date}
                {booking.children_doctor} - {booking.end_date}
                </p>
                <p>Parent : 
                  {booking.parent_firstname}
                  {booking.parent_lastname}
                  {booking.parent_phone}
                </p>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Dashboard;