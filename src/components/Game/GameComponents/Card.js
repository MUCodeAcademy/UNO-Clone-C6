import React from "react";
import "./Card.css";

const Card = (props) => {
  let firstChar = `${props.value}`.charAt(0);
  return (
    <>
      {props.size === "small" ? (
        <div
          onClick={() => {
            if (props.playCard)
              props.playCard(props.card, props.topCard, props.idx);
          }}
          style={{ backgroundColor: `${props.color}` }}
          className={`cardSmall`}
        >
          <div className="card-top-left">{props.value}</div>
          <div className="inner">{firstChar}</div>
          <div className="card-bottom-right">{props.value}</div>
        </div>
      ) : (
        <div
          onClick={() => {
            if (props.playCard)
              props.playCard(props.card, props.topCard, props.idx);
          }}
          style={{ backgroundColor: `${props.color}` }}
          className={`card`}
        >
          <div className="card-top-left">{props.value}</div>
          <div className="inner">{firstChar}</div>
          <div className="card-bottom-right">{props.value}</div>
        </div>
      )}
    </>
  );
};
export default Card;
