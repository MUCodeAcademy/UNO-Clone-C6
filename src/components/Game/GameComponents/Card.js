import React from "react"
import "./Card.css"


const Card = (props) =>{
    let firstChar = props.value.charAt(0)
    return(
        <div style = {{backgroundColor: `${props.color}`}}className = {`card`}>
            <div className = "card-top-left">{props.value}</div>
            <div className = "inner">{firstChar}</div>
            <div className = "card-bottom-right">{props.value}</div>
        </div>
    )
}

export default Card
