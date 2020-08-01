import React from 'react';
import { Link } from 'react-router-dom';
import HistoryLine from '../../../components/historyLine/historyline';

const WorkWithUs = () => {
    return (
        <React.Fragment>
            <HistoryLine active="work-with-us" />
            <div className="about-us-container">
                <div className="about-us">
                    <p className="about-us-p">We are currently recruiting for the following positions:</p>
                    <h1 className="about-us-subheader">Boutique Store Manager - Erina Heights</h1>
                    <h1 className="about-us-subheader">Boutique Casuals - Erina Heights</h1>
                    <p className="about-us-p">Are you and Bohemian Traders a match made in heaven?
                 If so, drop us your CV via email! We’d love to meet.</p>
                    <p className="about-us-p">admin@bohemiantraders.com</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default WorkWithUs;