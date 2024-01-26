import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NurseryDetails from "./NurseryDetails";
import { useNurseriesApi } from "../../../contexts/nurseries-api.context"; 

function NurseryPage() {
  const [selectedNursery, setSelectedNursery] = useState(null);
  const { nurseries, setNurseries } = useNurseriesApi();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (nurseries.length === 0) {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/nurseries`);
          setNurseries(response.data);
        }
        const nurseryDetail = nurseries.find((nursery) => nursery.id === parseInt(id, 10));
        setSelectedNursery(nurseryDetail);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, nurseries, setNurseries]);

  return (
    <div>
      <NurseryDetails nursery={selectedNursery} />
    </div>
  );
}

export default NurseryPage;
