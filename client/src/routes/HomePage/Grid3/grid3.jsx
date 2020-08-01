import React from 'react';
import './grid3.css';

const Grid3 = ({ history }) => {
    return (
        <div className="grid-container">
            <div className="grid">
                <div className="grid3-item">
                    <button onClick={() => history.push('/shop/curve')} className="grid3-item-button">SHOP LUMINOSA</button>
                </div>
                <div className="grid3-item2">
                    <button onClick={() => history.push('/shop/dresses')} className="grid3-item-button2">SHOP DRESSES</button>
                </div>
            </div>
        </div>
    );
}

export default Grid3;