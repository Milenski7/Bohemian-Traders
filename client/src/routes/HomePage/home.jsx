import React from 'react';
import Jumbotron from './Jumbotron/jumbotron';
import Grid1 from './Grid1/grid1';
import Grid2 from './Grid2/grid2';
import Grid3 from './Grid3/grid3';
import Grid4 from './Grid4/grid4';

const HomePage = ({ history }) => {
    return (
        <React.Fragment>
            <Jumbotron />
            <Grid1 history={history} />
            <Grid2 history={history} />
            <Grid3 history={history} />
            <Grid4 history={history} />
        </React.Fragment>
    );
};

export default HomePage;