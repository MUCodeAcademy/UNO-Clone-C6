import React from "react";
import Card from "../GameComponents/Card";

const PlayerHand = (props) => {
  return (
    <>
      <div className="play-area">
        {props.hand.map((card, idx) => (
          <Card color={`${card.color}`} value={`${card.value}`} key={idx} />
        ))}
      </div>
    </>
  );
};

export default PlayerHand;
