import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Order from './order';
import NotFound from './not-found/notFoundComponent';

import manipulationAccount from '../manipulations/account';

class RouterApp extends React.Component {
    constructor(props) {
        super(props);
        this.flag = true;
        this.state = {
            checkLogin: true
        }
    }

    componentDidMount() {
        manipulationAccount.checkLogin().then(result => {
            if(result === false) {
                sessionStorage.setItem('returnRedirect', this.props.match.url);
            }
            if(this.flag === true) {
                this.setState({
                    checkLogin: result
                })
            }
        })
    }

    componentWillUnmount() {
        this.flag = false;
    }

    shouldComponentUpdate(props, state) {
        if(this.state.checkLogin === state.checkLogin) {
            return false;
        }
        return true;
    }
   
    render() {
        if(this.state.checkLogin) {
            return (
                <Router>
                    <Switch>
                        <Redirect exact from="/app" to="/app/order" />
                        <Route path="/app/order" component={Order} />
                        <Route exact path="*" component={NotFound} />
                    </Switch> 
                </Router>
            )
        } else {
            return <Redirect to='/login' />
        } 
    }
}

export default RouterApp;