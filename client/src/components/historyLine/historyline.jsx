import React from 'react';
import { Link } from 'react-router-dom';
import './historyline.css';

const HistoryLine = ({ link1, active }) => {
    return (
        <div className="historyLine-container">
            <div className="historyLine">
                <Link to="/" className="historyLine-link">HOME</Link>
                <p className="historyLine-separator">/</p>
                {link1 && (
                    <React.Fragment>
                        <Link to={`/${link1}`} className="historyLine-link">{link1}</Link>
                        <p className="historyLine-separator">/</p>
                    </React.Fragment>)}
                <Link to={`/${active}`} className="historyLine-link-active">{active}</Link>
            </div>
        </div>
    );
};

export default HistoryLine;