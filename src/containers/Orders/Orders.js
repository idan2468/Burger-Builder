import React, {Component, Fragment} from 'react';
import Order from "../../components/Order/Order";
import styles from './Orders.css';
import * as actions from "../../store/actions/actions";
import {connect} from "react-redux";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import {withRouter} from "react-router";


class Orders extends Component {
    getOrders = () => {
        return this.props.orders.map((order, index) => {
            let ingredients = Object.keys(order.burgerIngredients).reduce((obj, key) => {
                if (order.burgerIngredients[key] !== 0) {
                    obj[key] = order.burgerIngredients[key]
                }
                return obj;
            }, {});
            return (
                <Order ingredients={ingredients} name={order.customer.fullName} price={order.price}
                       key={order._id}/>
            )
        })
    }

    async componentDidMount() {
        this.props.fetchOrders(this.props.userId);
    }

    render() {
        let orders = this.getOrders();
        let content = <div className={styles.ordersContainer}>
            {orders}
        </div>
        if (this.props.orders.length === 0 && !this.props.loading) {
            content = <h1>No Orders yet!!</h1>;
        }
        if (this.props.loading) {
            content = <LoadingSpinner/>;
        }
        if (this.props.error) {
            content = <h1 style={{textAlign: 'center'}}>{this.props.error}</h1>;
        }
        return (
            <Fragment>
                {/*<div className={styles.ordersContainer}>*/}
                {content}
                {/*</div>*/}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        error: state.order.error,
        loading: state.order.loading,
        isAuth: state.auth.logon,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (userId) => dispatch(actions.fetchOrders(userId)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));