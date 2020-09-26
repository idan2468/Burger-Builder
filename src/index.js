import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import * as reducers from './store/reducers/allReducers';

const rootReducer = combineReducers({
    burger: reducers.burgerReducer
});
const store = createStore(rootReducer);

axios.defaults.baseURL = "http://localhost:4000";

// noinspection JSCheckFunctionSignatures
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
