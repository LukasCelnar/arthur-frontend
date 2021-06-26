import React from 'react';
// third party 
import { Router, Route, Switch } from 'react-router-dom';
// pages
import LandingPage from './pages/LandingPage/LandingPage';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';
// components
import history from './history';
// styles
import './App.scss';


const App = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Switch> 
                        <Route path='/' exact component={LandingPage} />
                        <Route path='/signup' exact component={SignUp} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;