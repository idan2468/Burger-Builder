import React, {Fragment, useEffect} from 'react';
import CheckoutSummary from "../../components/Checkout/CheckoutSummary/CheckoutSummary";
import Burger from "../../components/Burger/Burger";
import styles from './Checkout.css'
import {Route} from "react-router";
import ContactDetails from "../ContactDetails/ContactDetails";
import {connect} from "react-redux";

const Checkout = (props) => {

    const orderHandler = async () => {
        props.history.push('/checkout/contact-details');
    }

    const cancelOrder = () => {
        props.history.goBack();
        return null;
    }

    useEffect(() => {
        if (!props.ingredients) {
            props.history.replace('/');
        }
    }, []);

    return (
        <Fragment>
            <div className={styles.container}>
                <Burger ingredients={props.ingredients}/>
                <CheckoutSummary ingredients={props.ingredients} price={props.price}
                                 onOk={orderHandler} onCancel={cancelOrder}/>
                <Route path={props.match.path + '/contact-details'} component={ContactDetails}/>
            </div>
        </Fragment>
    )

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.price
    }
}


export default connect(mapStateToProps)(Checkout);