//create a popup texarea component
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Popup = ({ isOpen, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    return (
        <>
            { isVisible && (
            <div id="popup" className="p-4 border rounded" >
                <div className="popup-content">
                    {children}
                </div>
            </div> )
            }
        </>
    );
}

export default Popup;