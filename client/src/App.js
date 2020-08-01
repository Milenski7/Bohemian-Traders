import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Navbar from './components/navbar/navbar';
import HomePage from './routes/HomePage/home';
import Footer from './components/footer/footer';
import Login from './routes/User/Login/login';
import Register from './routes/User/Register/register';
import Logout from './routes/User/Logout/logout';
import Dashboard from './routes/User/Dashboard/dashboard';
import Women from './routes/Shop/Women/women';
import Dresses from './routes/Shop/Dresses/dresses';
import Curve from './routes/Shop/Curve/curve';
import Men from './routes/Shop/Men/men';
import Classics from './routes/Shop/Classics/classics';
import Product from './routes/Shop/Product/product';
import ScrollTop from './components/scrollTop/scrollTop';
import Search from './components/searchBar/search';
import Cart from './routes/Cart/cart';
import AboutUs from './routes/FooterLinks/AboutUs/aboutUs';
import ContactUs from './routes/FooterLinks/ContactUs/contactUs';
import SizeRange from './routes/FooterLinks/SizeRange/sizeRange';
import WorkWithUs from './routes/FooterLinks/WorkWithUs/workWithUs';
import Terms from './routes/FooterLinks/Terms/terms';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [curUser, setCurUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [x, setX] = useState(150);
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("user-token");
      const cur = jwtDecode(jwt);
      setCurUser(cur);
      setLoaded(true);
    } catch (ex) { }
  }, []);
  console.log('hi');
  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar setX={setX} curUser={curUser} />
      <Search x={x} setX={setX} />
      <Switch>
        <Route path="/shop/women" exact component={Women} />
        <Route path="/shop/dresses" exact component={Dresses} />
        <Route path="/shop/curve" exact component={Curve} />
        <Route path="/shop/men" exact component={Men} />
        <Route path="/shop/classics" exact component={Classics} />
        <Route path="/shop/:category/:id" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/about-us" exact component={AboutUs} />
        <Route path="/contact-us" exact component={ContactUs} />
        <Route path="/size-range" exact component={SizeRange} />
        <Route path="/work-with-us" exact component={WorkWithUs} />
        <Route path="/terms-and-privacy" exact component={Terms} />
        {!curUser && <Route path="/register" component={Register} />}
        {!curUser && <Route path="/login" component={Login} />}
        {curUser && <Route path="/logout" component={Logout} />}
        {curUser && <Route path="/user-dashboard/:id" render={props => <Dashboard {...props} curUser={curUser} />} />}
        <Route path="/" exact component={HomePage} />
        {loaded && !curUser && <Redirect to="/" />}
      </Switch>
      <Footer />
      <ScrollTop />
    </React.Fragment>
  );
};

export default App;

