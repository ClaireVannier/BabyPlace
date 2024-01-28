import { useHttp } from "../../../contexts/http.context";
import { useNursery } from "../../../contexts/nursery.context";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NurseryDetails from "./NurseryDetails";

function NurseryPage() {
  const http = useHttp();
  const { nurseries, setNurseries } = useNursery();
  const { id } = useParams();

  const [selectedNursery, setSelectedNursery] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (nurseries.length === 0) {
          const response = await http.get(`nurseries`);
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
