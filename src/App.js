import React, {Component, Fragment} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import {connect} from "react-redux";
import ContactDetails from "./containers/ContactDetails/ContactDetails";
import Auth from "./containers/Auth/Auth";
import * as actions from './store/actions/actions';

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
                        <Switch>
                            {this.props.isAuth ?
                                <Route path='/checkout/contact-details' component={ContactDetails}/> : null}
                            {this.props.isAuth ? <Route path="/checkout" component={Checkout}/> : null}
                            {this.props.isAuth ? <Route path="/orders" component={Orders}/> : null}
                            <Route path="/auth" component={Auth}/>
                            <Route path='/' component={BurgerBuilder}/>
                        </Switch>
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
        checkAuth: () => dispatch(actions.checkAuthStatus({}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
