import React, { useState } from "react";

const Card = ({id, image, sequenceNo, label, description, editCardById ,deleteCardById, isAuthenticated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(image);
    const [cardImage, setCardImage] = useState("");
    const [cardDescription, setCardDescription] = useState(description);
    const [cardLabel, setCardLabel] = useState(label);
    const [cardSequenceNo, setCardSequenceNo] = useState(sequenceNo);

    const handleChange = (e) => {
        if(e.target.id === "description") {
            setCardDescription(e.target.value);
        }else if (e.target.id === "label") {
            setCardLabel(e.target.value);
        } else if (e.target.id === "sequenceNo") {
            setCardSequenceNo(e.target.value);
        }else {
            setPreview(URL.createObjectURL(e.target.files[0]));
            setCardImage(e.target.files[0]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editCardById(id, cardDescription, cardLabel, cardSequenceNo, cardImage);
        setIsEditing(false);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await deleteCardById(id);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setIsEditing(true);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setIsEditing(false);
    }

    return (
        <div className="card">
            { isAuthenticated ? <>
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <img src={preview} className="card-img-top" alt={cardLabel} />
                        <input type="file" id="image" className="card-img-top" onChange={handleChange} alt={cardLabel} />
                        <div className="card-body">
                            <label htmlFor="label">Label</label>
                            <input type="text" id="label" value={cardLabel} className="input-group my-2" onChange={handleChange} />
                            <label htmlFor="description">Description</label>
                            <textarea type="text" id="description" value={cardDescription} className="input-group my-2" onChange={handleChange} />
                            <label htmlFor="sequenceNo">Sequence No</label>
                            <input type="number" id="sequenceNo" value={cardSequenceNo} className="input-group my-2" onChange={handleChange} />
                        </div>
                        <button type="submit" className='btn btn-success mx-2'>Submit</button>
                        <button type="button" className='btn btn-primary mx-2' onClick={handleCancel}>Cancel</button>
                    </form>
                ) : (
                    <div className='p-2'>
                        <img src={image} className="card-img-top" alt={label} />
                        <div className="card-body">
                            <h5 className="card-title">{label}</h5>
                            <p className="card-text">{description}</p>
                        </div>
                        <button className='btn btn-warning mx-2' type='button' onClick={handleEdit}>Edit</button>
                        <button className='btn btn-danger mx-2' type='button' onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </> : <>
                <img src={image} className="card-img-top" alt={label} />
                <div className="card-body">
                    <h5 className="card-title">{label}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </>
            }
        </div>
    );
}

export default Card;