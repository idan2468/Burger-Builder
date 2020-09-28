import React, {Component, Fragment} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import * as reducers from "./store/reducers/allReducers";
import thunk from "redux-thunk";

// const logger = store => {
//     return next => {
//         return action => {
//             console.log('[Middleware] ', action);
//             let res = next(action);
//             console.log('[Middleware] ', store.getState());
//             return res;
//         }
//     }
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    burger: reducers.burgerReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

class App extends Component {
    render() {
        return (
            <Fragment>
                <Provider store={store}>
                    <BrowserRouter>
                        <Layout>
                            <Switch>
                                <Route path="/checkout" component={Checkout}/>
                                <Route path="/orders" component={Orders}/>
                                <Route path={'/'} exact component={BurgerBuilder}/>
                            </Switch>
                        </Layout>
                    </BrowserRouter>
                </Provider>
            </Fragment>
        );
    }
}

export default App;
