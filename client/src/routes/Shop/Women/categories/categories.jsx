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
                <p onClick={() => { changeCategory('view-all'); setX('none') }} className="category-drawer">VIEW ALL</p>
                <p onClick={() => { changeCategory('Dresses'); setX('none') }} className="category-drawer">DRESSES</p>
                <p onClick={() => { changeCategory('Skirts'); setX('none') }} className="category-drawer">SKIRTS</p>
                <p onClick={() => { changeCategory('Tops'); setX('none') }} className="category-drawer">TOPS</p>
                <p onClick={() => { changeCategory('Shorts'); setX('none') }} className="category-drawer">SHORTS</p>
                <p onClick={() => { changeCategory('Pants'); setX('none') }} className="category-drawer">PANTS</p>
                <p onClick={() => { changeCategory('Jackets-And-Knits'); setX('none') }} className="category-drawer">JACKETS &amp; KNITS</p>
                <p onClick={() => { changeCategory('Jeans'); setX('none') }} className="category-drawer">JEANS</p>
                <p onClick={() => { changeCategory('Loungewear'); setX('none') }} className="category-drawer">LOUNGEWEAR</p>
                <p onClick={() => { changeCategory('Playsuits'); setX('none') }} className="category-drawer">PLAYSUITS</p>
                <p onClick={() => { changeCategory('Denim'); setX('none') }} className="category-drawer">DENIM</p>
            </div>
        </div>
    );
};

export default Categories;