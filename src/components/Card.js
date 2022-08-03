import React, { component } from "react"

const Card = (props) => {
  console.log("this card", this)
  return (
    <>
      <h1>{props.title}</h1>
      <img src={props.image} alt={props.title} />
      <p>{props.date}</p>
      <p>{props.description}</p>
    </>
  )
}

export default Card
