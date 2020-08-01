import React, { useState, useEffect } from 'react';
import http from '../../../services/http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import * as config from '../../../config/config.json';
import { toast } from 'react-toastify';
import HistoryLine from '../../../components/historyLine/historyline';
import Loader from 'react-loader-spinner';
import Modal from './modal';
import './product.css';

const Product = ({ match }) => {
    const [product, setProduct] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [x, setX] = useState(0);
    const [modal, setModal] = useState('none');
    const [quantity, setQuantity] = useState(1);
    const [buttonName, setButtonName] = useState('ADD TO CART');
    const [buttonColor, setButtonColor] = useState('black');
    const [cartClicked, setCartClicked] = useState('false');
    const openModal = () => { setModal('block') };
    const closeModal = () => { setModal('none') };

    const getProduct = async () => {
        try {
            const { data } = await http.get(`${config.apiEndpoint}/product/individual/${match.params.id}`);
            setProduct(data);
        } catch (ex) {
            console.error(ex);
            toast.error('Something failed while getting product...');
        }
    }

    const handleNext = () => {
        if (x === (product.photos.length - 1) * -100) { setX(0) }
        else { setX(x - 100) }
    };

    const handlePrev = () => {
        if (x === 0) { setX((product.photos.length - 1) * -100) }
        else { setX(x + 100) }
    };

    const handleQuantityDecrease = () => {
        if (quantity === 1) { return null }
        else { setQuantity(quantity - 1) }
    };

    const getButtonName = () => {
        if (product) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            if (cart) {
                let index = cart.findIndex(i => i._id === product._id);
                if (index !== -1) { return { name: "PRODUCT ADDED TO CART", color: "darkred" } }
                else { return { name: "ADD TO CART", color: "black" } }
            }
        }
        return { name: 'ADD TO CART', color: 'black' };
    };

    const addToCart = async () => {
        let cart = [];
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        let index = cart.findIndex(i => i._id === product._id);
        if (index !== -1) return;
        cart.push({ _id: product._id });
        localStorage.setItem('cart', JSON.stringify(cart));
        try {
            await http.put(`${config.apiEndpoint}/product/update-quantity/${product._id}`, { quantity: quantity });
            toast('Product added to cart successfully!');
            setCartClicked(true);
        } catch (ex) {
            console.error(ex);
            toast.error('Something failed while adding item to cart.');
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <React.Fragment>
            {!product && (<div className="loading-product-container">
                <Loader color="pink" type="RevolvingDot" width={100} height={100} className="loader" />
                <h1 className="loader-title">LOADING PRODUCT...</h1>
            </div>)}
            {product && <HistoryLine link1={`shop/${match.params.category}`} active={product.title} />}
            <div className="product-container">
                {product && <div className="product">
                    <div className="product-image-carousel">
                        <FontAwesomeIcon onClick={handlePrev} className="carousel-icon" icon={faChevronLeft} />
                        <img
                            onClick={() => { setSelectedThumbnail(product.thumbnail); setSelectedPhoto(null); openModal() }}
                            style={{ transform: `translateX(${x}%)` }}
                            src={`${config.apiEndpoint}/product/get-photo/${product._id}`}
                            className="product-image" />
                        {product.photos.map(photo => (
                            <img key={photo._id} className="product-image"
                                onClick={() => { setSelectedPhoto(photo); setSelectedThumbnail(null); openModal() }}
                                src={`data:image/jpeg;base64,${photo.data}`}
                                style={{ transform: `translateX(${x}%)` }} />
                        ))}
                        <FontAwesomeIcon onClick={handleNext} className="carousel-icon2" icon={faChevronRight} />
                    </div>
                    <div className="product-right">
                        <h1 className="product-right-title">{product.title}</h1>
                        <p className="product-right-price">${product.price}</p>
                        <div className="product-right-afterpay-container">
                            <p className="product-right-afterpay">or 4 installments of</p>
                            <p className="product-right-afterpay-price">${(product.price / 4).toFixed(2)}USD</p>
                            <p className="product-right-afterpay">with</p>
                            <img src={require('./afterpay.jpg')} className="product-right-afterpay-image" />
                        </div>
                        <div className="product-right-zip-container">
                            <img src={require('./zip.jpg')} className="product-right-zip-image" />
                            <p className="product-right-zip">own it from $10/wk</p>
                        </div>
                        <div className="product-right-quantity-container">
                            <h1 className="product-right-quantity-title">Quantity: </h1>
                            <FontAwesomeIcon onClick={() => setQuantity(quantity + 1)} icon={faChevronUp} className="product-right-quantity-icon" />
                            <h1 className="product-right-quantity-counter">{quantity}</h1>
                            <FontAwesomeIcon onClick={handleQuantityDecrease} icon={faChevronDown} className="product-right-quantity-icon" />
                        </div>
                        {product && <button style={{ backgroundColor: `${getButtonName().color}` }} onClick={addToCart} className="product-right-button">{getButtonName().name}</button>}
                        <div className="product-right-description-container">
                            <h1 className="product-right-description-header">Product Description:</h1>
                            <p className="product-right-description">{product.description}</p>
                        </div>
                    </div>
                </div>}
            </div>
            <Modal photo={selectedPhoto} thumbnail={selectedThumbnail} modal={modal} closeModal={closeModal} />
        </React.Fragment>
    );
};

export default Product;