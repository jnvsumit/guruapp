import React from 'react';
import { useState } from 'react';

const Textbox = ({ id, text, sequenceNo, deleteTextboxById, editTextboxById, isAuthenticated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [textboxText, setTextboxText] = useState(text);
    const [textboxSequenceNo, setTextboxSequenceNo] = useState(sequenceNo);

    const handleChange = (e) => {
        if(e.target.id === "textbox") {
            setTextboxText(e.target.value);
        }else {
            setTextboxSequenceNo(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editTextboxById(id, textboxText, textboxSequenceNo);
        setIsEditing(false);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await deleteTextboxById(id);
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
        <div key={id}>
            { isAuthenticated ? <>
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="textbox">Textbox</label>
                        <textarea type="text" id="textbox" value={textboxText} className="input-group my-2" onChange={handleChange} />
                        <label htmlFor="sequenceNo">Sequence No</label>
                        <input type="number" id="sequenceNo" value={textboxSequenceNo} className="input-group my-2" onChange={handleChange} />
                        <button type="submit" className='btn btn-success mx-2'>Submit</button>
                        <button type="button" className='btn btn-primary mx-2' onClick={handleCancel}>Cancel</button>
                    </form>
                ) : (
                    <div className='p-2'>
                        <p>{textboxText}</p>
                        <button className='btn btn-warning mx-2' type='button' onClick={handleEdit}>Edit</button>
                        <button className='btn btn-danger mx-2' type='button' onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </> : <>
                <p className=''>{textboxText}</p>
            </>
            }
        </div>
    );
}

export default Textbox;