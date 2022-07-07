//create a editible textbox component
import React from 'react';
import { useState } from 'react';

const Textbox = ({ id, text, sequenceNo, deleteTextboxById, editTextboxById }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [textboxText, setTextboxText] = useState(text);
    const [textboxSequenceNo, setTextboxSequenceNo] = useState(sequenceNo);

    const handleChange = (e, type) => {
        if(type === "text") {
            setTextboxText(e.target.value);
        }else {
            setTextboxSequenceNo(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editTextboxById(id, textboxText);
        setIsEditing(false);
    }

    const handleDelete = async (e) => {
        console.log("Delete key pressed");
        e.preventDefault();
        await deleteTextboxById(id);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setIsEditing(true);
    }

    return (
        <div className="textbox" key={id}>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="textbox">Textbox</label>
                    <textarea type="text" id="textbox" value={textboxText} onChange={(e)=> handleChange(e, "text")} />
                    <label htmlFor="sequenceNo">Sequence No</label>
                    <input type="number" id="sequenceNo" value={textboxSequenceNo} onChange={(e)=> handleChange(e, "sequence")} />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <p>{textboxText}</p>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default Textbox;