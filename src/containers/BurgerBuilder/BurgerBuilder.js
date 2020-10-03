import React, {Component, Fragment} from 'react';
import axios from 'axios';
import styles from './BurgerBuilder.scss';
import BurgerGUI from '../../components/Burger/Burger';
import BuildController from '../../components/Burger/BuildController/BuildController';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import withErrorHandling from "../../hoc/withErrorHandling";
import {connect} from "react-redux";
import * as actions from '../../store/actions/actions';


class BurgerBuilder extends Component {
    state = {
        showModal: false
    };

    async componentDidMount() {
        this.props.onInitIngredients();

    }

    orderHandler = async () => {
        this.props.setOrdered(true);
        if (!this.props.isAuth) {
            this.props.history.replace('/auth');
        } else {
            this.setState(prevState => {
                return {
                    showModal: true
                }
            })
        }
    }
    goToCheckout = async () => {
        this.props.history.push({pathname: '/checkout'});
    }
    cancelHandler = () => {
        this.setState(prevState => {
            return {
                showModal: false
            }
        })
        this.props.setOrdered(false);
    }
    getOrderSummary = () => {
        return (
            <OrderSummary {...{
                ingredients: this.props.ingredients,
                price: this.props.price,
                onCancel: this.cancelHandler,
                onOk: this.goToCheckout
            }}/>
        )
    }
    getBurgerGUI = () => {
        return (
            <Fragment>
                <BurgerGUI {...{
                    ingredients: this.props.ingredients
                }}/>
                <div className={styles.buildControllerContainer}>
                    <p className={styles.priceLabel}>Price: {this.props.price}$</p>
                    <BuildController {...{
                        ingredients: this.props.ingredients,
                        price: this.props.price,
                        onClick: this.props.changeIngredientCount,
                        onOrder: this.orderHandler
                    }}/>
                </div>
            </Fragment>
        )
    }

    render() {
        let burgerGUI = <LoadingSpinner/>;
        let modalContent = null;
        if (this.props.ingredients != null) {
            modalContent = this.getOrderSummary();
            burgerGUI = this.getBurgerGUI();
        }
        if (this.props.loading) {
            modalContent = <LoadingSpinner show={this.props.loading}/>;
        }
        return (
            <Fragment>
                <Modal openModal={this.state.showModal} onClick={this.cancelHandler}>
                    {modalContent}
                </Modal>
                {burgerGUI}
            </Fragment>
        )
    }
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