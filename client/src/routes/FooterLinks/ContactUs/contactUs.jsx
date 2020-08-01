import React from 'react';
import HistoryLine from '../../../components/historyLine/historyline';

const ContactUs = () => {
    return (
        <React.Fragment>
            <HistoryLine active="contact-us" />
            <div className="about-us-container">
                <div className='about-us'>
                    <h1 className="about-us-header">Contact Us</h1>
                    <h2 className="about-us-subheader">Return address for online orders:</h2>
                    <p className="about-us-p">Bohemian Traders</p>
                    <p className="about-us-p">3/13 Bonnal Rd</p>
                    <p className="about-us-p">Erina, NSW, 2250</p>
                    <h2 className="about-us-subheader">Bohemian Traders Boutique:</h2>
                    <p className="about-us-p">Shop 2A, 490 Central Coast Hwy</p>
                    <p className="about-us-p">Erina Heights, NSW, 2260</p>
                    <p className="about-us-p"><a href="#">erina.boutique@bohemiantraders.com</a></p>
                    <p className="about-us-p">Mon-Sat 8:30am - 5:00pm</p>
                    <p className="about-us-p">Sun 9:30am - 2:30pm</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ContactUs;