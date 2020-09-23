import React, {Component, Fragment} from 'react';
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
import Burger from "../../components/Burger/Burger";
import styles from './Checkout.scss'
import {Route} from "react-router";
import ContactDetails from "../ContactDetails/ContactDetails";

class Checkout extends Component {
    state = {
        ingredients: {},
        price: null
    }

    componentWillMount() {
        let ingredientsArr = this.props.location.search.slice(1).split('&');
        let price = +ingredientsArr.pop().split('=')[1];
        const ingredients = {}
        for (let ing of ingredientsArr) {
            let ingName = ing.split('=')[0];
            ingredients[ingName] = +ing.split('=')[1];
        }
        this.setState({ingredients: ingredients, price: price})
    }

    orderHandler = async () => {
        this.props.history.push('/checkout/contact-details');
    }

    cancelOrder = () => {
        this.props.history.goBack();
        return null;
    }

    render() {
        console.log(this.props.match.path + '/contact-details');
        return (
            <Fragment>
                <div className={styles.container}>
                    <Burger ingredients={this.state.ingredients}/>
                    <CheckoutSummary ingredients={this.state.ingredients} price={this.state.price}
                                     onOk={this.orderHandler} onCancel={this.cancelOrder}/>
                    <Route path={this.props.match.path + '/contact-details'}
                           render={() => <ContactDetails ingredients={this.state.ingredients}
                                                         price={this.state.price}/>}/>
                </div>
            </Fragment>
        )
    }
}

export default Checkout;