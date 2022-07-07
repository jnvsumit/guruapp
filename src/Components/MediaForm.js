//create a submit form with file
import React from 'react';
import { useState } from 'react';

const MediaForm = ({ addTextbox, addCard }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [sequenceNo, setSequenceNo] = useState(0);
    const [isFileVisible, setIsFileVisible] = useState(false);

    const handleChange = (e) => {
        if(e.target.id === "file") {
            setFile(e.target.files[0]);
        } else if(e.target.id === "title") {
            setTitle(e.target.value);
        } else if(e.target.id === "text") {
            setText(e.target.value);
        }else{
            setSequenceNo(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(file) {
            await addCard(file, title, text, sequenceNo);
        }else{
            await addTextbox(text, sequenceNo);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title" className='m-2'>Title:</label>
            <input type="tytle" id="title" className='m-2' value={title} onChange={(e)=> handleChange(e)} />
            <br/>
            <label htmlFor="sequenceNo" className='m-2'>Sequence Number:</label>
            <input type="number" id="sequenceNo" className='m-2' value={sequenceNo} onChange={(e)=> handleChange(e)} />
            <br/>
            { isFileVisible ? (
                <>
                    <label htmlFor="file" className='m-2'>Image:</label>
                    <input type="file" id="file" onChange={handleChange} />
                    <br/>
                </>
            ) : (
                <>
                    <label htmlFor="text" className='m-2'>Text:</label>
                    <textarea type="text" id="text" value={text} onChange={(e)=> handleChange(e)} />
                    <br/>
                </>
            )}
            <button type="button" className='btn btn-primary m-2' onClick={() => setIsFileVisible(!isFileVisible)}>toggle</button>
            <button type="submit" className='m-2 btn btn-success'>Submit</button>
        </form>
    );
}

export default MediaForm;