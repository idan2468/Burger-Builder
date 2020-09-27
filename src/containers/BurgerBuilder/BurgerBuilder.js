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
import * as actions from '../../store/actions';


// take prices from DB
const ingredientsPrices = {
    'cheese': 1,
    'salad': 2,
    'bacon': 3,
    'meat': 4,
}

class BurgerBuilder extends Component {
    state = {
        // price: 0, // redux
        loading: false,
        ordered: false
    };

    async componentDidMount() {
        let stateIngredients = {};
        try {
            let ingredients = await axios.get('/ingredients');
            ingredients.data.map(ingredient => {
                stateIngredients[ingredient.name] = 0;
                return null;
            })
            this.setState(prevState => {
                return {ingredients: stateIngredients};
            });
        } catch (e) {
            console.log(e);
        }

    }

    // calcPrice = (val, ingredient) => {
    //     let itemChange = val - this.props.ingredients[ingredient];
    //     return this.props.price + itemChange * ingredientsPrices[ingredient];
    // }

    // changeIngredientCount = (val, ingredient) => {
    //     this.setState((prevState, prevProps) => {
    //         let newIngredients = {...prevState.ingredients};
    //         if (val >= 0) {
    //             newIngredients[ingredient] = val;
    //             return {
    //                 ingredients: newIngredients,
    //                 price: this.calcPrice(val, ingredient)
    //             }
    //         }
    //     })
    // }
    orderHandler = async () => {
        this.setState(prevState => {
            return {
                ordered: true
            }
        })
    }
    goToCheckout = async () => {
        // let query = Object.keys(this.props.ingredients).map(key =>
        //     `${encodeURIComponent(key)}=${encodeURIComponent(this.props.ingredients[key])}`).join('&');
        // query += `&price=${this.props.price}`
        this.props.history.push({pathname: '/checkout'});
    }
    cancelHandler = () => {
        this.setState(prevState => {
            return {
                ordered: false
            }
        })
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
        if (this.state.loading) {
            modalContent = <LoadingSpinner show={this.state.loading}/>;
        }
        return (
            <Fragment>
                <Modal openModal={this.state.ordered} onClick={this.cancelHandler}>
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
        price: state.burger.price
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeIngredientCount: (val, ing) => dispatch(
            {
                type: actions.CHANGE_ING_COUNT,
                ingredient: ing,
                value: val
            }
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(BurgerBuilder, axios));