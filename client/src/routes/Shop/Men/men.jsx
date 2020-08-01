import React, { useState, useEffect } from 'react';
import http from '../../../services/http';
import * as config from '../../../config/config.json';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner'
import HistoryLine from '../../../components/historyLine/historyline';
import SortBy from '../../../components/sortBy/sortBy';
import { paginate } from '../../../components/pagination/paginate';
import Pagination from '../../../components/pagination/pagination';
import Categories from './categories/categories';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './men.css';

const Men = ({ history }) => {
    const [products, setProducts] = useState(null);
    const [sortedProducts, setSortedProducts] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [curCat, setCurCat] = useState('view-all');
    const [ppp, setPPP] = useState(9);
    const [curPage, setCurPage] = useState(1);
    const [x, setX] = useState('none');

    const getProducts = async () => {
        try {
            const { data } = await http.get(`${config.apiEndpoint}/product/Men`);
            setProducts(data);
            setSortedProducts(data);
            setLoaded(true);
        } catch (ex) {
            console.error(ex);
            toast.error('Could not load products...');
        }
    };

    const changeCategory = cat => {
        setCurPage(1);
        if (cat === 'view-all') { setSortedProducts(products); setCurCat('view-all'); document.getElementById('select').value = "default"; }
        else {
            setCurCat(cat);
            const newSortedProducts = [...products];
            const newArray = [];
            newSortedProducts.map(i => { if (i.category === cat) { newArray.push(i) } else { return null } });
            setSortedProducts(newArray);
            document.getElementById('select').value = "default";
        }
    };

    const handlePageChange = page => {
        setCurPage(page);
    };

    const newSortedProducts = paginate(sortedProducts, curPage, ppp);

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <React.Fragment>
            <HistoryLine active="shop/men" />
            <SortBy category={curCat} products={products} setSortedProducts={setSortedProducts} sortedProducts={sortedProducts} />
            <div className="products-container">
                <div className="products">
                    <Categories changeCategory={changeCategory} x={x} setX={setX} />
                    <div className="categories-container">
                        <p onClick={() => changeCategory('view-all')} className="category">VIEW ALL</p>
                        <p onClick={() => changeCategory('Pants')} className="category">PANTS</p>
                        <p onClick={() => changeCategory('Tops')} className="category">TOPS</p>
                    </div>
                    {!loaded && (<div className="loader-container">
                        <Loader color="darkred" type="RevolvingDot" width={100} height={100} className="loader" />
                        <h1 className="loader-title">LOADING PRODUCTS...</h1></div>)}
                    {loaded && products && <div className="products-grid">
                        {products && newSortedProducts.map(product => (
                            <div key={product._id} className="products-grid-item">
                                <img
                                    src={`${config.apiEndpoint}/product/get-photo/${product._id}`}
                                    alt="product"
                                    className="products-grid-photo"
                                    onClick={() => history.push(`/shop/men/${product._id}`)} />
                                <p className="products-grid-title">{product.title}</p>
                                <p className="products-grid-price">{product.price.toFixed(2)}$</p>
                                <button onClick={() => history.push(`/shop/men/${product._id}`)} className="products-grid-button">VIEW PRODUCT</button>
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
            {sortedProducts && <Pagination
                ppp={ppp}
                images={sortedProducts}
                onPageChange={handlePageChange}
                curPage={curPage}
                setCurPage={setCurPage} />}
        </React.Fragment>
    );
};

export default Men;