import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import * as reducers from "./store/reducers/allReducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";


axios.defaults.baseURL = process.env.REACT_APP_REST_API || "http://localhost:4000";
const composeEnhancers = process.env.REACT_APP_NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;


const rootReducer = combineReducers({
    burger: reducers.burgerReducer,
    order: reducers.orderReducer,
    auth: reducers.authReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


// noinspection JSCheckFunctionSignatures
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
