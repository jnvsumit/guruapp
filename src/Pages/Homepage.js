import React from "react";
import { useState, useEffect } from "react";
import Card from "../Components/Card";
import MediaForm from "../Components/MediaForm";
import Popup from "../Components/Popup";
import Textbox from "../Components/Textbox";
import config from '../config';

//react icons
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Homepage = (props) => {
    const { isAuthenticated, token } = props;
    const [cardsOrTextbox, setCardsOrTextbox] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const deleteCardOrTextboxById = async (id) => {
        fetch(`${config.api.url}/media?mediaId=${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-token": token,
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
        .then(async () => {
            await fetchCardsOrTextboxs();
        })
    }

    const editCardById = async (id, description, label, sequenceNo, image) => {
        const formData = new FormData();
        if(image !== "") {
            formData.append("image", image, image.name);
        }
        formData.append("mediaTitle", label);
        formData.append("sequenceNo", sequenceNo);

        fetch(`${config.api.url}/media?mediaId=${id}`, {
            method: "PATCH",
            headers: {
                "x-token": token,
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                return data.data
            }

            console.log(data);
        })
        .then(async () => {
            await fetchCardsOrTextboxs();
        })
    }



    const editTextboxById = async (id, text, sequenceNo) => {
        console.log(token, id, text, sequenceNo);
        fetch(`${config.api.url}/media?mediaId=${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-token": token,
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
        .then(async () => {
            await fetchCardsOrTextboxs();
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
        }).then(cardsOrTextboxData => {
            cardsOrTextboxData = cardsOrTextboxData.sort((a, b) => a.sequenceNo - b.sequenceNo);
            setCardsOrTextbox(cardsOrTextboxData);
        })
    };

    const addCard = (image, label, description, sequenceNo) => {
        const formData = new FormData();
        formData.append("image", image, image.name);
        formData.append("mediaTitle", label);
        formData.append("mediaDescription", description);
        formData.append("mediaType", "image");
        formData.append("sequenceNo", sequenceNo);

        fetch(`${config.api.url}/media`, {
            method: "POST",
            headers: {
                "x-token": token,
            },
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
        .then(async () => {
            await fetchCardsOrTextboxs();
        })
    }

    const addTextbox = (text, sequenceNo) => {
        fetch(`${config.api.url}/media`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-token": token,
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
            .then(async () => {
                await fetchCardsOrTextboxs();
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
        <div className="container" style={{minHeight: "700px"}}>
            <div className="py-4">
                <span className="text-dark h2">
                    श्री श्री १००८ श्री स्वामी कबीर जी महाराज 'परमहंस'
                </span>
            </div>
            <ul className="list-group">
                {cardsOrTextbox.map(media => {
                    if (media.type === "card") {
                        return (
                            <li className="list-group-item my-4 p-2" style={{border: `${isAuthenticated ? "1px" : "0px"}`}} key={media.id}>
                                <Card
                                    key={media.id}
                                    image={media.image}
                                    label={media.label}
                                    id={media.id}
                                    sequenceNo={media.sequenceNo}
                                    description={media.description}
                                    deleteCardById={deleteCardOrTextboxById}
                                    isAuthenticated={isAuthenticated}
                                    editCardById={editCardById}
                                />
                            </li>
                        );
                    } else {
                        return (
                            <li className="list-group-item my-4 p-2" style={{border: `${isAuthenticated ? "1px solid" : "0px"}`}} key={media.id}>
                                <Textbox
                                    key={media.id}
                                    text={media.text}
                                    id={media.id}
                                    sequenceNo={media.sequenceNo}
                                    deleteTextboxById={deleteCardOrTextboxById}
                                    editTextboxById={editTextboxById}
                                    isAuthenticated={isAuthenticated}
                                />
                            </li>
                        );
                    }
                })}
            </ul>
            { isAuthenticated && <>
            <Popup isOpen={isPopupOpen} closePopup={togglePopup} openPopup={togglePopup}>
                <MediaForm addTextbox={addTextbox} addCard={addCard}/>
            </Popup>
            <button className="btn btn-primary px-3 py-2 m-2" onClick={togglePopup}>
                {isPopupOpen ? <FaMinus height={40} width={40} /> : <FaPlus height={40} width={40}/> }
            </button>
            </> }
        </div>
    );
}

export default Homepage;