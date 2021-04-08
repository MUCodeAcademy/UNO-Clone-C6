import React from "react";
import "./Card.css";

const Card = (props) => {
  let firstChar = `${props.value}`.charAt(0);
  let conditionStyle = props.img
    ? {
        backgroundImage: `url('${props.img}')`,
        "background-position": "center",
      }
    : { backgroundColor: `${props.color}` };

  return (
    <>
      {props.size === "small" ? (
        <div
          style={conditionStyle}
          //   style={{ backgroundColor: `${props.color}` }}
          className={`cardSmall`}
        >
          <div className="card-top-left">{props.value}</div>
          {props.img === "" ? (
            <div className="inner"> {firstChar}</div>
          ) : (
            <div
              className="inner"
              style={{
                backgroundColor: "transparent",
                margin: "2px",
                borderRadius: "50px 30px / 60px 30px",
                fontSize: "40px",
                padding: "2px",
                color: "transparent",
              }}
            ></div>
          )}
          <div className="card-bottom-right">{props.value}</div>
        </div>
      ) : (
        <div style={{ backgroundColor: `${props.color}` }} className={`card`}>
          <div className="card-top-left">{props.value}</div>
          <div className="inner">{firstChar}</div>
          <div className="card-bottom-right">{props.value}</div>
        </div>
      )}
      {console.log(conditionStyle)}
    </>
  );
};
export default Card;
