import React, {Component, Fragment} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Checkout from "./containers/Checkout/Checkout";

class App extends Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path="/checkout" component={Checkout}/>
                            <Route path={'/'}  exact component={BurgerBuilder}/>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default App;
