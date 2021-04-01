import React from "react";
import Card from "../GameComponents/Card";
import ".src/App.css";

const PlayerHand = (props) => {
  return (
    <>
      <div className="play-area">
        {props.hand.map((card) => (
          <Card color={`${card.color}`} value={`${card.value}`} />
        ))}
      </div>
    </>
  );
};

export default PlayerHand;
