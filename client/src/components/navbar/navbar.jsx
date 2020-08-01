import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';
import Search from '../searchBar/search';
import './navbar.css';

const Navbar = ({ history, curUser, setX }) => {
    return (
        <React.Fragment>
            <div className="navbar">
                <p className="navbar-top-left2">FREE SHIPPING ON ALL ORDERS OVER $300</p>
                <div className="navbar-top">
                    <p className="navbar-top-left">FREE SHIPPING ON ALL ORDERS OVER $300</p>
                    <img onClick={() => history.push("/")} src={require('./logo.jpg')} alt="logo" className="navbar-top-logo" />
                    <div className="navbar-top-nav">
                        <FontAwesomeIcon onClick={() => setX(0)} icon={faSearch} className="nav-icon" />
                        {!curUser && <Link style={{ color: 'black' }} to="/login"><FontAwesomeIcon icon={faUser} className="nav-icon" /></Link>}
                        {curUser && <Link style={{ color: 'black' }} to={`/user-dashboard/${curUser._id}`}><FontAwesomeIcon icon={faUser} className="nav-icon" /></Link>}
                        <Link style={{ color: 'black' }} to="/cart"><FontAwesomeIcon icon={faShoppingCart} className="nav-icon" /></Link>
                    </div>
                </div>
                <div className="navbar-bottom">
                    <Link to="/shop/women" className="nav-link">WOMEN</Link>
                    <Link to="/shop/dresses" className="nav-link">DRESSES</Link>
                    <Link to="/shop/curve" className="nav-link">CURVE</Link>
                    <Link to="/shop/men" className="nav-link">MEN</Link>
                    <Link to="/shop/classics" className="nav-link">CLASSICS</Link>
                </div>
            </div >
        </React.Fragment>
    );
};

export default withRouter(Navbar);