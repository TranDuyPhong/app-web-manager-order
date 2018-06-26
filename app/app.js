import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Index from './components';

import stores from './redux/store';

ReactDOM.render(
    <Provider store={stores}>
        <Index />
    </Provider>,
    document.getElementById('main')
);    