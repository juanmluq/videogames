import React from "react";
import "./Card.css"

export default function Card({ name, image, released }) {
    return (
        <div className="card">
            <h4>{name}</h4>
            <h5>{released}</h5>
            <img src={image} alt="img not found" className="card-body"  />
        </div>
    )
}