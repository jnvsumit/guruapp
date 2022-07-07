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
            <label htmlFor="title">Title</label>
            <input type="tytle" id="title" value={title} onChange={(e)=> handleChange(e)} />
            <label htmlFor="sequenceNo">Sequence No</label>
            <input type="number" id="sequenceNo" value={sequenceNo} onChange={(e)=> handleChange(e)} />
            { isFileVisible ? (
                <>
                    <label htmlFor="file">File</label>
                    <input type="file" id="file" onChange={handleChange} />
                </>
            ) : (
                <>
                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" value={text} onChange={(e)=> handleChange(e)} />
                </>
            )}
            <button type="button" onClick={() => setIsFileVisible(!isFileVisible)}>toggle</button>
            <button type="submit">Submit</button>
        </form>
    );
}

export default MediaForm;