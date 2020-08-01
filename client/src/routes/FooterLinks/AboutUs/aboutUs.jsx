import React from 'react';
import HistoryLine from '../../../components/historyLine/historyline';
import './aboutUs.css';

const AboutUs = () => {
    return (
        <React.Fragment>
            <HistoryLine active="about-us" />
            <div className="about-us-container">
                <div className="about-us">
                    <h1 className="about-us-header">About Us</h1>
                    <p className="about-us-p-underlined">CLASSIC EUROPEAN CUTS, FOR THE MODERN BOHEMIAN</p>
                    <p className="about-us-p">We’re known for “Classic European cuts, for the modern bohemian”.
                    We blend classic, fashion forward pieces including elevated basics with bohemian detailing.
                Since our inception, our aim has been to provide size inclusive fashion basics for the modern bohemian.</p>
                    <p className="about-us-p">BOHEMIAN TRADERS commenced operations in 2014 and is based on the Central Coast of
                NSW Australia, shipping domestically and internationally.</p>
                    <p className="about-us-p">We seek to be an environmentally and socially responsible company; as such we work closely with
                    our suppliers to ensure ethical conditions for workers. We are continually working towards providing the best
                clothing and accessories, with the least environmental and social harm possible.</p>
                    <p className="about-us-p">You can find BOHEMIAN TRADERS on the following social media:</p>
                    <div className="about-us-social-links">
                        <p className="about-us-social-link">instagram:
                    <a href="http://www.instagram.com/bohemian.traders" target="_blank">instagram.com/bohemian.traders</a></p>
                        <p className="about-us-social-link">facebook:
                    <a href="http://www.facebook.com/bohemiantraders" target="_blank">facebook.com/bohemiantraders</a></p>
                        <p className="about-us-social-link">pinterest:
                    <a href="http://www.pinterest.com/bohemiantraders" target="_blank">pinterest.com/bohemiantraders</a></p>
                    </div>
                    <p className="about-us-p">PR &amp; MEDIA: <a href="#">pr@bohemiantraders.com</a>, +61 2 4327 8640</p>
                    <p className="about-us-p">The <h2 className="about-us-subheader">BOHEMIAN TRADERS </h2>
                    brand and trademark is wholely owned and operated by BOHEMIAN HOLDINGS Pty Ltd.</p>
                    <h2 className="about-us-subheader">BOHEMIAN TRADERS Pty Ltd</h2>
                    <p className="about-us-sub-p">ABN 83 617 372 488</p>
                    <p className="about-us-p-a">3/13 Bonnal Rd</p>
                    <p className="about-us-p-a">Erina, NSW 2260</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AboutUs;