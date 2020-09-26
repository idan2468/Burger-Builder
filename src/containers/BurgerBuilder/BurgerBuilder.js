import React, {Component, Fragment} from 'react';
import axios from 'axios';
import styles from './BurgerBuilder.scss';
import BurgerGUI from '../../components/Burger/Burger';
import BuildController from '../../components/Burger/BuildController/BuildController';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import withErrorHandling from "../../hoc/withErrorHandling";


// take prices from DB
const ingredientsPrices = {
    'cheese': 1,
    'salad': 2,
    'bacon': 3,
    'meat': 4,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null, //redux
        price: 0, // redux
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
    goToCheckout = async () => {
        let query = Object.keys(this.state.ingredients).map(key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(this.state.ingredients[key])}`).join('&');
        query += `&price=${this.state.price}`
        this.props.history.push({pathname: '/checkout', search: query});
        // try {
        //     setTimeout(() => this.state.ordered ? this.setState({loading: true}) : null, 500);
        //     await axios.put('/order', {
        //         price: this.state.price,
        //         ingredients: this.state.ingredients
        //     })
        //     // await new Promise(resolve => setTimeout(() => resolve(), 2000)); delay for showing the spinner
        //     this.setState(prevState => {
        //         return {ordered: false};
        //     })
        //     setTimeout(() => this.setState({loading: false}), 1000)
        // } catch (error) {
        //
        // }
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
                ingredients: this.state.ingredients,
                price: this.state.price,
                onCancel: this.cancelHandler,
                onOk: this.goToCheckout
            }}/>
        )
    }
    getBurgerGUI = () => {
        return (
            <Fragment>
                <BurgerGUI {...{
                    ingredients: this.state.ingredients
                }}/>
                <div className={styles.buildControllerContainer}>
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

    render() {
        let burgerGUI = <LoadingSpinner/>;
        let modalContent = null;
        if (this.state.ingredients != null) {
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

export default withErrorHandling(BurgerBuilder, axios);