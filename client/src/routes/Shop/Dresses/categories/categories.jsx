import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import './categories.css';

const Categories = ({ changeCategory, x, setX }) => {
    return (
        <div className="categories-drawer-container">
            <div className="categories-drawer-header">
                <h1 className="categories-drawer-header-title">CATEGORIES </h1>
                <FontAwesomeIcon onClick={() => x === 'none' ? setX('grid') : setX('none')} icon={faChevronCircleDown} className="categories-arrow" />
            </div>
            <div style={{ display: `${x}` }} className="categories-drawer">
                <p onClick={() => { changeCategory('view-all'); setX('none') }} className="category">VIEW ALL</p>
                <p onClick={() => { changeCategory('Maxi'); setX('none') }} className="category">MAXI</p>
                <p onClick={() => { changeCategory('Midi'); setX('none') }} className="category">MIDI</p>
                <p onClick={() => { changeCategory('Mini'); setX('none') }} className="category">MINI</p>
            </div>
        </div>
    );
};

export default Categories;