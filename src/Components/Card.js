//Create an image card with label and description
import React from "react";

const Card = ({id, image, label, description, deleteCardById }) => {
    return (
        <div className="card">
        <img src={image} className="card-img-top" alt={label} />
        <div className="card-body">
            <h5 className="card-title">{label}</h5>
            <p className="card-text">{description}</p>
        </div>
        <button className="btn btn-danger" onClick={() => deleteCardById(id)}>Delete</button>
        </div>
    );
}

export default Card;