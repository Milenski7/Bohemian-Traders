import React from 'react';
import './grid4.css';

const Grid4 = ({ history }) => {
    return (
        <div className="grid-container">
            <div className="grid">
                <div className="grid-item-solo2">
                    <button onClick={() => history.push('/shop/women')} className="grid-item-solo2-button">SHOP WOMEN</button>
                </div>
            </div>
        </div>
    );
};

export default Grid4;