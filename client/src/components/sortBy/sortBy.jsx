import React, { useState } from 'react';
import './sortBy.css';

const SortBy = ({ sortedProducts, products, setSortedProducts, category }) => {
    const sortProducts = option => {
        const defaultProducts = [...products];
        if (option === "default" && category !== 'view-all') {
            const newArray = [];
            defaultProducts.map(i => i.category === category ? newArray.push(i) : null);
            setSortedProducts(newArray);
            console.log(newArray);
        }
        else if (option === "default" && category === 'view-all') {
            setSortedProducts(defaultProducts);
        }
        else if (option === "price-low-high") {
            const prevProducts = [...sortedProducts];
            prevProducts.sort((a, b) => a.price - b.price);
            setSortedProducts(prevProducts);
        }
        else if (option === 'price-high-low') {
            const prevProducts = [...sortedProducts];
            prevProducts.sort((a, b) => a.price - b.price);
            prevProducts.reverse();
            setSortedProducts(prevProducts);
        }
        else if (option === 'name-a-z') {
            const prevProducts = [...sortedProducts];
            prevProducts.sort((a, b) => a.title < b.title ? -1 : 1);
            setSortedProducts(prevProducts);
        }
        else if (option === 'name-z-a') {
            const prevProducts = [...sortedProducts];
            prevProducts.sort((a, b) => a.title < b.title ? -1 : 1);
            prevProducts.reverse();
            setSortedProducts(prevProducts);
        }
    };

    const handleChange = e => {
        sortProducts(e.target.value);
    };

    return (
        <div className='sortBy-container'>
            <form className="sortBy">
                <label className="sortBy-label" htmlFor="products">Sort Products By:</label>
                <select id="select" onChange={handleChange} name="products" className="sortBy-select">
                    <option value="default" className="sortBy-option">Default</option>
                    <option value="price-low-high" className="sortBy-option">Price Low - High</option>
                    <option value="price-high-low" className="sortBy-option">Price High - Low</option>
                    <option value="name-a-z" className="sortBy-option">Name A-Z</option>
                    <option value="name-z-a" className="sortBy-option">Name Z-A</option>
                </select>
            </form>
        </div>
    );
};

export default SortBy;