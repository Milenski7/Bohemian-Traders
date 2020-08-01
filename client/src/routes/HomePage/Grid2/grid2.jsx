import React from 'react';
import './grid2.css';

const Grid2 = ({ history }) => {
    return (
        <div className="grid-container">
            <div className="grid">
                <div className="grid-item-solo">
                    <button onClick={() => history.push('/shop/women')} className="grid-item-solo-button">SHOP AUGUST 2020</button>
                </div>
            </div>
        </div>
    );
};

export default Grid2;