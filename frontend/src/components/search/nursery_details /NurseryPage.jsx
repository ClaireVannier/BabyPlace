import React from "react";
import { useParams } from "react-router-dom";
import NurseryDetails from "./NurseryDetails";
import fakeNurseries from "../FakeData";

function NurseryPage() {
  const { id } = useParams();
  const selectedNursery = fakeNurseries.find(
    (nursery) => nursery.id === parseInt(id, 10)
  );

  return (
    <div>
      <NurseryDetails nursery={selectedNursery} />
    </div>
  );
}

export default NurseryPage;
