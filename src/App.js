import React, {Fragment, Suspense, useCallback} from 'react';
import Layout from './containers/Layout/LayOut';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import * as actions from './store/actions/actions';
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const ContactDetails = React.lazy(() => import("./containers/ContactDetails/ContactDetails"));

// logger middleware not in use
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

const App = (props) => {
    const isAuth = useSelector(state => state.auth.logon);
    const dispatch = useDispatch();
    const checkAuth = useCallback(() => dispatch(actions.checkAuthStatus()), [dispatch])
    checkAuth();
    return (
        <Fragment>
            <BrowserRouter>
                <Layout>
                    <Suspense fallback={<LoadingSpinner/>}>
                        <Switch>
                            {isAuth ?
                                <Route path='/checkout/contact-details' component={ContactDetails}/> : null}
                            {isAuth ? <Route path="/checkout" component={Checkout}/> : null}
                            {isAuth ? <Route path="/orders" component={Orders}/> : null}
                            <Route path="/auth" component={Auth}/>
                            <Route path='/' component={BurgerBuilder}/>
                        </Switch>
                    </Suspense>
                </Layout>
            </BrowserRouter>
        </Fragment>
    )
}

export default App;
