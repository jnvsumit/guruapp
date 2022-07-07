//Create a homepage with a list of cards and textbox and a button to delete one card or textbox and edit it.
import React from "react";
import { useState, useEffect } from "react";
import Card from "../Components/Card";
import MediaForm from "../Components/MediaForm";
import Popup from "../Components/Popup";
import Textbox from "../Components/Textbox";
import config from '../config';

const Homepage = () => {
    const [cardsOrTextbox, setCardsOrTextbox] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const deleteCardOrTextboxById = async (id) => {
        console.log("Handling delete request");
        console.log(id);
        fetch(`${config.api.url}/media?mediaId=${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                del: true
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                return data.data
            }

            console.log(data.message);
            return null;
        })
        .then(() => {
            setCardsOrTextbox(cardsOrTextbox.filter(cardsOrTextbox => cardsOrTextbox.id !== id));
        })
    }

    const editTextboxById = async (id, text, sequenceNo) => {
        fetch(`${config.api.url}/media?mediaId=${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mediaContent: text,
                sequenceNo,
                del: false
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                return data.data
            }

            console.log(data);
            return null;
        })
        .then(() => {
            const CardsOrTextbox = cardsOrTextbox.map(cardsOrTextbox => cardsOrTextbox.id === id ? {...cardsOrTextbox, mediaContent: text} : cardsOrTextbox);
            CardsOrTextbox.sort((a, b) => a.sequenceNo - b.sequenceNo);
            setCardsOrTextbox(CardsOrTextbox);
        })
    }

    const fetchCardsOrTextboxs = async () => {
        fetch(`${config.api.url}/media/list?skip=0&limit=10&status=active`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                return data.data;
            }

            console.log(data.message);

            return [];
        })
        .then(async data => {
            const cardOrTextboxData = await Promise.all(data.map(async cardOrTextbox => {
                if(cardOrTextbox.mediaType === "text") {
                    return {
                        id: cardOrTextbox.mediaId,
                        type: "text",
                        text: await getTextFromS3(cardOrTextbox.s3Url),
                        sequenceNo: cardOrTextbox.sequenceNo
                    }
                }else{
                    return {
                        id: cardOrTextbox.mediaId,
                        type: "card",
                        image: cardOrTextbox.s3Url,
                        label: cardOrTextbox.mediaTitle,
                        sequenceNo: cardOrTextbox.sequenceNo,
                        description: cardOrTextbox.cardDescription
                    }
                }
            }));

            return Promise.resolve(cardOrTextboxData);
        }).then(cardOrTextboxData => {
            cardOrTextboxData.sort((a, b) => a.sequenceNo - b.sequenceNo);
            setCardsOrTextbox(cardOrTextboxData);
        })
    };

    const addCard = (image, label, description, sequenceNo) => {
        console.log("Handling add card request", image, label, description, sequenceNo);
        const formData = new FormData();
        formData.append("image", image, image.name);
        formData.append("mediaTitle", label);
        formData.append("mediaDescription", description);
        formData.append("mediaType", "image");
        formData.append("sequenceNo", sequenceNo);

        fetch(`${config.api.url}/media`, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                return data.data
            }

            console.log(data.message);
            return null;
        })
        .then(() => {
            fetchCardsOrTextboxs();
        })
    }

    const addTextbox = (text, sequenceNo) => {
        fetch(`${config.api.url}/media`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mediaContent: text,
                    sequenceNo,
                    mediaType: "text"
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    return data.data
                }
    
                console.log(data.message);
                return null;
            })
            .then(() => {
                fetchCardsOrTextboxs();
            }
        )
    }


    const getTextFromS3 = async (s3Url) => {
        return fetch(s3Url, {
            method: "GET"
        })
        .then(res => res.text())
        .then(async data => {
            return Promise.resolve(data);
        });
    }

    const togglePopup = () => {
        setIsPopupOpen((prevState) => !prevState);
    }

    useEffect(() => {
        (async () => {
            await fetchCardsOrTextboxs();
        })();
    }, []);

    return (
        <div className="container">
            <div className="h1">Homepage</div>
            <ul className="list-group">
                {cardsOrTextbox.map(media => {
                    if (media.type === "card") {
                        return (
                            <li className="list-group-item" key={media.id}>
                                <Card
                                    key={media.id}
                                    image={media.image}
                                    label={media.label}
                                    id={media.id}
                                    sequenceNo={media.sequenceNo}
                                    description={media.description}
                                    deleteCardById={deleteCardOrTextboxById}
                                />
                            </li>
                        );
                    } else {
                        return (
                            <li className="list-group-item" key={media.id}>
                                <Textbox
                                    key={media.id}
                                    text={media.text}
                                    id={media.id}
                                    sequenceNo={media.sequenceNo}
                                    deleteTextboxById={deleteCardOrTextboxById}
                                    editTextboxById={editTextboxById}
                                />
                            </li>
                        );
                    }
                })}
            </ul>
            <Popup isOpen={isPopupOpen} closePopup={togglePopup} openPopup={togglePopup}>
                <MediaForm addTextbox={addTextbox} addCard={addCard}/>
            </Popup>
            <button className="btn btn-primary" onClick={togglePopup}>Add Media</button>
        </div>
    );
}

export default Homepage;