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
import './women.css';

const Women = ({ history }) => {
    const [products, setProducts] = useState(null);
    const [sortedProducts, setSortedProducts] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [curCat, setCurCat] = useState('view-all');
    const [ppp, setPPP] = useState(9);
    const [curPage, setCurPage] = useState(1);
    const [x, setX] = useState('none');
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        try {
            const { data } = await http.get(`${config.apiEndpoint}/product/Women`);
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
            <HistoryLine active="shop/women" />
            <SortBy category={curCat} products={products} setSortedProducts={setSortedProducts} sortedProducts={sortedProducts} />
            <div className="products-container">
                <div className="products">
                    <Categories x={x} setX={setX} changeCategory={changeCategory} />
                    <div className="categories-container">
                        <p onClick={() => changeCategory('view-all')} className="category">VIEW ALL</p>
                        <p onClick={() => changeCategory('Dresses')} className="category">DRESSES</p>
                        <p onClick={() => changeCategory('Skirts')} className="category">SKIRTS</p>
                        <p onClick={() => changeCategory('Tops')} className="category">TOPS</p>
                        <p onClick={() => changeCategory('Shorts')} className="category">SHORTS</p>
                        <p onClick={() => changeCategory('Pants')} className="category">PANTS</p>
                        <p onClick={() => changeCategory('Jackets-And-Knits')} className="category">JACKETS &amp; KNITS</p>
                        <p onClick={() => changeCategory('Jeans')} className="category">JEANS</p>
                        <p onClick={() => changeCategory('Loungewear')} className="category">LOUNGEWEAR</p>
                        <p onClick={() => changeCategory('Playsuits')} className="category">PLAYSUITS</p>
                        <p onClick={() => changeCategory('Denim')} className="category">DENIM</p>
                    </div>
                    {!loaded && (<div className="loader-container">
                        <Loader color="darkred" type="RevolvingDot" width={100} height={100} className="loader" />
                        <h1 className="loader-title">LOADING PRODUCTS...</h1></div>)}
                    {loaded && products && <div className="products-grid">
                        {products && newSortedProducts.map(product => (
                            <div key={product._id} className="products-grid-item">
                                {loading && <Loader color="grey" type="TailSpin" width={100} height={100} className="loader" />}
                                <img
                                    loading="lazy"
                                    src={`${config.apiEndpoint}/product/get-photo/${product._id}`}
                                    onLoad={() => setLoading(false)}
                                    alt="product"
                                    className="products-grid-photo"
                                    onClick={() => history.push(`/shop/women/${product._id}`)} />
                                <p className="products-grid-title">{product.title}</p>
                                <p className="products-grid-price">{product.price.toFixed(2)}$</p>
                                <button onClick={() => history.push(`/shop/women/${product._id}`)} className="products-grid-button">VIEW PRODUCT</button>
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

export default Women;