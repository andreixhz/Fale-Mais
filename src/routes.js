import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './components/Menu';

function Routes() {
    return (
        <BrowserRouter>
            <div className="container">
                <Menu/>
                <Route path="/" exact component={Home} />
            </div>
        </BrowserRouter>
    )
}

export default Routes;