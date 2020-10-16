import React, {Fragment, useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import styles from './BurgerBuilder.css';
import BurgerGUI from '../../components/Burger/Burger';
import BuildController from '../../components/Burger/BuildController/BuildController';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import withErrorHandling from "../../hoc/withErrorHandling";
import {connect} from "react-redux";
import * as actions from '../../store/actions/actions';


const BurgerBuilder = (props) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, [])

    const orderHandler = async () => {
        props.setOrdered(true);
        if (!props.isAuth) {
            props.history.replace('/auth');
        } else {
            setShowModal(true);
        }
    }
    const goToCheckout = async () => {
        props.history.push({pathname: '/checkout'});
    }
    const cancelHandler = useCallback(() => {
        setShowModal(false);
        props.setOrdered(false);
    },[])
    const getOrderSummary = () => {
        return (
            <OrderSummary {...{
                ingredients: props.ingredients,
                price: props.price,
                onCancel: cancelHandler,
                onOk: goToCheckout
            }}/>
        )
    }
    const getBurgerGUI = () => {
        return (
            <Fragment>
                <BurgerGUI {...{
                    ingredients: props.ingredients
                }}/>
                <div className={styles.buildControllerContainer}>
                    <p className={styles.priceLabel}>Price: {props.price}$</p>
                    <BuildController {...{
                        ingredients: props.ingredients,
                        price: props.price,
                        onClick: props.changeIngredientCount,
                        onOrder: orderHandler
                    }}/>
                </div>
            </Fragment>
        )
    }
    let burgerGUI = <LoadingSpinner/>;
    let modalContent = null;
    if (props.ingredients != null) {
        modalContent = getOrderSummary();
        burgerGUI = getBurgerGUI();
    }
    if (props.loading) {
        modalContent = <LoadingSpinner show={props.loading}/>;
    }
    return (
        <Fragment>
            <Modal openModal={showModal} onClick={cancelHandler}>
                {modalContent}
            </Modal>
            {burgerGUI}
        </Fragment>
    )

}


const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.price,
        error: state.burger.error,
        loading: state.burger.loading,
        isAuth: state.auth.logon,
        ordered: state.burger.ordered,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeIngredientCount: (val, ing) => dispatch(actions.changeIngCount(val, ing)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        setOrdered: (isOrdered) => dispatch(actions.setOrdered(isOrdered)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(BurgerBuilder, axios));