import React, {Component, Fragment, Suspense} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from './store/actions/actions';
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const ContactDetails = React.lazy(() => import("./containers/ContactDetails/ContactDetails"));

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

class App extends Component {
    render() {
        this.props.checkAuth();
        return (
            <Fragment>
                <BrowserRouter>
                    <Layout>
                        <Suspense fallback={<LoadingSpinner/>}>
                            <Switch>
                                {this.props.isAuth ?
                                    <Route path='/checkout/contact-details' component={ContactDetails}/> : null}
                                {this.props.isAuth ? <Route path="/checkout" component={Checkout}/> : null}
                                {this.props.isAuth ? <Route path="/orders" component={Orders}/> : null}
                                <Route path="/auth" component={Auth}/>
                                <Route path='/' component={BurgerBuilder}/>
                            </Switch>
                        </Suspense>
                    </Layout>
                </BrowserRouter>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.logon
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(actions.checkAuthStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
