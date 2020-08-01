import React from 'react';
import './grid1.css';

const Grid1 = ({ history }) => {
    return (
        <div className="grid-container">
            <div className="grid">
                <div className="grid-item">
                    <button onClick={() => history.push('/shop/women')} className="grid-item-button">SHOP MAGNOLIA</button>
                </div>
                <div className="grid-item2">
                    <button onClick={() => history.push('/shop/dresses')} className="grid-item-button2">SHOP RENAISSANCE</button>
                </div>
                <div className="grid-item3">
                    <button onClick={() => history.push('/shop/dresses')} className="grid-item-button3">SHOP FLORAISON</button>
                </div>
            </div>
        </div>
    );
};

export default Grid1;