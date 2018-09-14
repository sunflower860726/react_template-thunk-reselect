import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import rootReducer from './store';
import thunk from 'redux-thunk';
import middleware from './store/middleware';

const store = createStore(rootReducer, applyMiddleware(thunk, middleware()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'));
