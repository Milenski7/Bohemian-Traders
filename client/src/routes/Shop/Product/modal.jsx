import React, { useState } from 'react';
import './modal.css';

const Modal = ({ photo, modal, thumbnail, closeModal }) => {
    return (
        <div onClick={closeModal} style={{ display: `${modal}` }} className="modal-container">
            <div className="modal">
                {thumbnail && <img src={`data:image/jpeg;base64,${new Buffer(thumbnail.data).toString('base64')}`} className="modal-image" />}
                {photo && <img src={`data:image/jpeg;base64,${photo.data}`} className="modal-image" />}
            </div>
        </div>
    );
}

export default Modal;