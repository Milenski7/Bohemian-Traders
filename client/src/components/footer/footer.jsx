import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer">
                <img src={require('./footer-logo.jpg')}
                    alt="footer-logo"
                    className="footer-logo" />
                <div className="footer-center">
                    <div className="footer-center-list1">
                        <h1 className="footer-center-list1-header">BOHEMIAN TRADERS</h1>
                        <Link to="/about-us" className="footer-link">About Us</Link>
                        <Link to="/contact-us" className="footer-link">Contact Us</Link>
                        <Link to="/work-with-us" className="footer-link">Work With Us</Link>
                        <Link to="/terms-and-privacy" className="footer-link">Terms &amp; Privacy Policy</Link>
                        <Link to="/size-range" className="footer-link">Inclusive Size Range</Link>
                    </div>
                    <div className="footer-center-list2">
                        <h1 className="footer-center-list1-header">CATEGORIES</h1>
                        <Link to="/shop/curve" className="footer-link">CURVE</Link>
                        <Link to="/shop/women" className="footer-link">WOMEN</Link>
                        <Link to="/shop/dresses" className="footer-link">DRESSES</Link>
                        <Link to="/shop/men" className="footer-link">MEN</Link>
                        <Link to="/shop/classics" className="footer-link">CLASSICS</Link>
                    </div>
                </div>
                <div className="footer-right">
                    <h1 className="footer-right-header">FOLLOW US</h1>
                    <div className="footer-right-social-container">
                        <FontAwesomeIcon icon={faFacebook} className="footer-social-icon" />
                        <FontAwesomeIcon icon={faInstagram} className="footer-social-icon" />
                        <FontAwesomeIcon icon={faPinterest} className="footer-social-icon" />
                    </div>
                    <h1 className="footer-right-header2">SECURE PAYMENTS WITH</h1>
                    <img src={require('./footer-payments.jpg')} alt="payment-options" className="footer-right-payments" />
                    <p className="footer-right-p">&copy; BOHEMIAN</p>
                    <p className="footer-right-p">HOLDINGS.ABN 83 617</p>
                    <p className="footer-right-p">372 488.ALL RIGHTS</p>
                    <p className="footer-right-p">RESERVED.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;