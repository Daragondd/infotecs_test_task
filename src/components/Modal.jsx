import React from "react";
import './Modal.css'

export const Modal = ({isOpen, onClose, children}) => {
    return (
        <>
        {isOpen && (
        <div className="modal">
            <div className="modal-wrapper">
                <div className="modal-content">
                    <button className="modal-close-button" onClick={() => onClose()}>
                        X
                    </button>
                    <h2>User Info</h2>
                    {children}
                </div>
            </div>
        </div>
        )}
        </>
    )
}