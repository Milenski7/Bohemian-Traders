import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import http from '../../services/http';
import * as config from '../../config/config.json';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import './search.css';

const Search = ({ x, setX }) => {
    const [text, setText] = useState('');
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [splice, setSplice] = useState(5);
    const handleChange = e => { setText(e.target.value.toUpperCase()); setLoaded(false) };
    const getUsernames = async () => {
        try {
            if (text.length === 0) { setProducts([]); setLoaded(true); setSplice(5); return null };
            const { data } = await http.post(`${config.apiEndpoint}/product/products/search`, { text: text, splice: splice });
            setProducts(data);
            setLoaded(true);
        } catch (ex) {
            console.error(ex);
            toast.error("Something went wrong while getting products...");
        }
    };

    useEffect(() => {
        getUsernames();
    }, [text, splice]);

    return (
        <div style={{ transform: `translateX(${x}%)` }} className="search-container">
            <div className="search-box">
                <label className="search-box-label" htmlFor="search">Find Products</label>
                <input
                    name="search"
                    className="search-box-input"
                    type="text"
                    placeholder="Type something here..."
                    value={text}
                    onChange={handleChange} />
                {loaded && <div className="search-box-users">
                    {products.length === 0 && <h1 className="search-box-no-users">No products found...</h1>}
                    {products.length > 0 && products.map(user => (
                        <div key={user._id} onClick={() => { window.history.pushState('', '/', '/'); window.location.replace(`/shop/${user.link}/${user._id}`); setX(150); setText('') }} key={user._id} className="search-box-user">
                            {user.thumbnail && <img src={`${config.apiEndpoint}/product/get-photo/${user._id}`} className="search-box-user-pic" />}
                            <h1 className="search-box-user-name">{user.title}</h1>
                        </div>
                    ))}
                    {products.length > 0 && products.length < 9 && <button onClick={() => { setSplice(10); setLoaded(false) }} className="load-more-products">LOAD MORE</button>}
                </div>}
                {!loaded && (<div className="loader-container">
                    <Loader color="darkred" type="RevolvingDot" width={100} height={100} className="loader" />
                    <h1 className="loader-title">LOADING PRODUCTS...</h1></div>)}
            </div>
            <FontAwesomeIcon onClick={() => { setX(150); setText('') }} icon={faTimes} className="search-box-arrow" />
        </div >
    );
};

export default Search;