import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './scrollTop.css';

const ScrollTop = () => {
    const [scroll, setScroll] = useState('none');
    useEffect(() => {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY;
            if (isTop >= 690) { setScroll('block') }
            else { setScroll('none') }
        });
    });
    return (
        <FontAwesomeIcon onClick={() => window.scrollTo(0, 0)} style={{ display: `${scroll}` }} icon={faChevronUp} className="scroll-top-button" />
    );
};

export default ScrollTop;