import React from 'react';
// third party 
import { Router, Route, Switch } from 'react-router-dom';
// pages
import LandingPage from './pages/LandingPage/LandingPage';
//import SignUp from './pages/Authentication/SignUp/SignUp';
//import SignIn from './pages/Authentication/SignIn/SignIn';
//import Account from './pages/Authentication/Account/Account';
import LoadingPage from './pages/LoadingPage/LoadingPage';
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
                        <Route path='/' exact component={LoadingPage} />
                        <Route path='/swiper' exact component={LandingPage} />
                        {/*<Route path='/' exact component={SignUp} />
                        <Route path='/signin' exact component={SignIn} />
                        <Route path='/account' exact component={Account} />*/}
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;