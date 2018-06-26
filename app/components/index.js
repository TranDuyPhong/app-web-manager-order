import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './login/loginComponent';
import NotFound from './not-found/notFoundComponent';
import RouterApp from './router-app';

class Index extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Redirect exact from="/" to='/login' />
                    <Route exact path="/login" component={Login} />
                    <Route path="/app" component={RouterApp} />
                    <Route exact path="*" component={NotFound} />
                </Switch>    
            </Router>
        )
    }
}

export default Index;