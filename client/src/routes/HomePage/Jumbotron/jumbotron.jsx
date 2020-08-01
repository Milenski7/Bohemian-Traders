import React from 'react';
import './jumbotron.css';

const Jumbotron = () => {
    return (
        <img src={require('./jumbotron.jpg')} alt="jumbotron-offer" className="jumbotron" />
    );
};

export default Jumbotron;