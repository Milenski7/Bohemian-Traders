import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop';
import App from './App';

ReactDOM.render(
  <React.Fragment>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);
