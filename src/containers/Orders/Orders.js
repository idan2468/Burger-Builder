import React, {Component, Fragment} from 'react';
import Order from "../../components/Order/Order";
import styles from './Orders.scss';
import axios from "axios";


class Orders extends Component {
    state = {
        orders: []
    }
    getOrders = () => {
        return this.state.orders.map((order, index) => {
            let ingredients = {};
            Object.keys(order.burgerIngredients).forEach(key => {
                if (order.burgerIngredients[key] !== 0) {
                    ingredients[key] = order.burgerIngredients[key]
                }
            })
            return (
                <Order ingredients={ingredients} name={order.customer.fullName} price={order.price}
                       key={order._id} style={{gridColumn: (index % 3) + 1}}/>
            )
        })
    }

    async componentDidMount() {
        try {
            const orders = await axios.get('/orders');
            console.log(orders);
            this.setState({orders: orders.data});
        } catch (e) {

        }
    }

    render() {
        let orders = this.getOrders();
        return (
            <Fragment>
                <div className={styles.ordersContainer}>
                    {orders}
                </div>
            </Fragment>
        )
    }
}

export default Orders;