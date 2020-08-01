import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import http from '../../services/http';
import * as config from '../../config/config.json';
import HistoryLine from '../../components/historyLine/historyline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import _ from 'lodash';
import './cart.css';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(0);
    const getCartItems = async () => {
        try {
            let storageCart = JSON.parse(localStorage.getItem('cart'));
            if (!storageCart) { setCart([]); return }
            const { data } = await http.post(`${config.apiEndpoint}/product/get-cart-item`, { cart: storageCart });
            setCart(data);
            let total = [];
            data.map(item => total.push(item.price * item.quantity));
            total = _.sum(total).toFixed(2);
            setTotal(total);
        } catch (ex) {
            console.error(ex);
            toast.error('Something failed while getting cart items...');
        }
    };

    const handleIncrement = async item => {
        const prevCart = [...cart];
        const prevTotal = total;
        let newTotal = [];
        const newCart = [...cart];
        const index = prevCart.findIndex(i => i._id === item._id);
        newCart[index].quantity += 1;
        newCart.map(item => newTotal.push(item.quantity * item.price));
        newTotal = _.sum(newTotal).toFixed(2);
        try {
            await http.put(`${config.apiEndpoint}/product/update-quantity/${item._id}`, { quantity: newCart[index].quantity });
            setCart(newCart);
            setTotal(newTotal);
        } catch (ex) {
            console.error(ex);
            setCart(prevCart);
            setTotal(prevTotal);
        }
    };

    const handleDecrement = async item => {
        const prevCart = [...cart];
        const prevTotal = total;
        const newCart = [...cart];
        let newTotal = [];
        const index = newCart.findIndex(i => i._id === item._id);
        if (newCart[index].quantity === 1) return;
        newCart[index].quantity -= 1;
        newCart.map(item => newTotal.push(item.quantity * item.price));
        newTotal = _.sum(newTotal).toFixed(2);
        try {
            await http.put(`${config.apiEndpoint}/product/update-quantity/${item._id}`, { quantity: newCart[index].quantity });
            setCart(newCart);
            setTotal(newTotal);
        } catch (ex) {
            console.error(ex);
            setCart(prevCart);
            setTotal(prevTotal);
        }
    };

    const handleProductRemove = item => {
        const newCart = [...cart];
        const index = newCart.findIndex(i => i._id === item._id);
        newCart.splice(index, 1);
        setCart(newCart);
        const storageCart = JSON.parse(localStorage.getItem('cart'));
        if (!storageCart) return;
        let storageIndex = storageCart.findIndex(i => i._id === item._id);
        storageCart.splice(storageIndex, 1);
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(storageCart));
        let newTotal = [];
        newCart.map(item => newTotal.push(item.quantity * item.price));
        newTotal = _.sum(newTotal).toFixed(2);
        setTotal(newTotal);
    };

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <React.Fragment>
            <HistoryLine active="cart" />
            {!cart && (<div className="loading-product-container">
                <Loader color="pink" type="RevolvingDot" width={100} height={100} className="loader" />
                <h1 className="loader-title">LOADING CART...</h1>
            </div>)}
            <div className="cart-container">
                {cart && <div className="cart">
                    <h1 className="cart-header">CART ITEMS ({cart.length})</h1>
                    {cart.length === 0 && <h1 className="no-item-in-cart">There are currently no items in your cart.</h1>}
                    {cart.map(item => (
                        <div key={item._id} className="cart-item">
                            <img src={`data:image/jpeg;base64,${new Buffer(item.thumbnail.data).toString('base64')}`}
                                className="cart-item-image" alt="cart-item" />
                            <h1 className="cart-item-title">{item.title}</h1>
                            <div className="product-right-quantity-container2">
                                <h1 className="product-right-quantity-title2">Quantity: </h1>
                                <FontAwesomeIcon onClick={() => handleIncrement(item)} icon={faChevronUp} className="product-right-quantity-icon" />
                                <h1 className="product-right-quantity-counter">{item.quantity}</h1>
                                <FontAwesomeIcon onClick={() => handleDecrement(item)} icon={faChevronDown} className="product-right-quantity-icon" />
                            </div>
                            <p className="cart-item-price">${item.price.toFixed(2)}</p>
                            <p className="cart-item-total">Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
                            <button className="cart-item-remove" onClick={() => handleProductRemove(item)}>REMOVE PRODUCT</button>
                        </div>
                    ))}
                    <h1 className="cart-total">Total: ${total}</h1>
                </div>}
            </div>
        </React.Fragment>
    );
};

export default Cart;