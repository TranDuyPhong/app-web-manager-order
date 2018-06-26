import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Table from './table/tableComponent';
import Food from './food/foodComponent';
import Revenue from './revenue/revenueComponent';
import Bill from './bill/billComponent';

import NotFound from '../not-found/notFoundComponent';

class Order extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Redirect exact from='/app/order' to="/app/order/table" />
                    <Route exact path='/app/order/table' component={Table} />
                    <Route exact path='/app/order/food' component={Food} />
                    <Route exact path='/app/order/revenue' component={Revenue} />
                    <Route exact path='/app/order/bill' component={Bill} />
                    <Route exact path="*" component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

export default Order;