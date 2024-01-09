import { useState } from "react";
import fakeNurseries from "./FakeData";
import NurseryCard from "./NurseryCard";

function NurseryList() {
  const [toggleModal, setToggleModal] = useState(false);
  return (
    <>
      <div>
        <button type="button" onClick={() => setToggleModal(!toggleModal)}>
          Filtrer
        </button>
        <div>{toggleModal && <h1>Coucou</h1>}</div>
      </div>
      <div className="cardList">
        {fakeNurseries.map((item) => (
          <NurseryCard key={item.id} nursery={item} />
        ))}
      </div>
    </>
  );
}

export default NurseryList;
