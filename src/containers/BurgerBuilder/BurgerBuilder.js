import React, {Component, Fragment} from 'react';
import axios from 'axios';
import styles from './BurgerBuilder.scss';
import BurgerGUI from '../../components/Burger/Burger';
import BuildController from '../../components/Burger/BuildController/BuildController';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

const ingredientsPrices = {
    'cheese': 1,
    'salad': 2,
    'bacon': 3,
    'meat': 4,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            'cheese': 0,
            'salad': 0,
            'bacon': 0,
            'meat': 0,
        },
        price: 0,
        loading: false
    };

    calcPrice = (val, ingredient) => {
        let itemChange = val - this.state.ingredients[ingredient];
        return this.state.price + itemChange * ingredientsPrices[ingredient];
    }

    changeIngredientCount = (val, ingredient) => {
        this.setState((prevState, prevProps) => {
            let newIngredients = {...prevState.ingredients};
            if (val >= 0) {
                newIngredients[ingredient] = val;
                return {
                    ingredients: newIngredients,
                    price: this.calcPrice(val, ingredient)
                }
            }
        })
    }
    orderHandler = async () => {
        this.setState(prevState => {
            return {
                ordered: true
            }
        })
    }
    saveOrder = async () => {
        try {
            setTimeout(() => this.state.ordered ? this.setState({loading: true}) : null, 500);
            const res = await axios.put('/order', {
                price: this.state.price,
                ingredients: this.state.ingredients
            })
            // await new Promise(resolve => setTimeout(() => resolve(), 2000)); delay for showing the spinner
            this.setState(prevState => {
                return {ordered: false};
            })
            setTimeout(() => this.setState({loading: false}), 1000)
        } catch (error) {

        }
    }
    cancelHandler = () => {
        this.setState(prevState => {
            return {
                ordered: false
            }
        })
    }

    render() {
        let modalContent = <OrderSummary {...{
            ingredients: this.state.ingredients,
            price: this.state.price,
            onCancel: this.cancelHandler,
            onOk: this.saveOrder
        }}/>;

        if (this.state.loading) {
            modalContent = <LoadingSpinner/>;
        }
        return (
            <Fragment>
                <Modal openModal={this.state.ordered} onClick={this.cancelHandler}>
                    {modalContent}
                </Modal>
                <BurgerGUI {...{
                    ingredients: this.state.ingredients
                }}/>
                <div className={styles.buildcontrollerContainer}>
                    <p className={styles.priceLabel}>Price: {this.state.price}$</p>
                    <BuildController {...{
                        ingredients: this.state.ingredients,
                        price: this.state.price,
                        onClick: this.changeIngredientCount,
                        onOrder: this.orderHandler
                    }}/>
                </div>
            </Fragment>
        )
    }
}

export default BurgerBuilder;