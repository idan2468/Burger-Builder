import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './OrderSummary.scss';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    let ingredientsItems = Object.keys(props.ingredients).map(key => {
        return (
            <div className={styles.dotDiv} key={key}>
                <li className={styles.liElement}><span>{key}</span> <span>{props.ingredients[key].count}</span></li>
            </div>
        )
    })
    let firstPStyle = {
        margin: 0
    }
    return (
        <Fragment>
            <div className={styles.container}>
                <p style={firstPStyle}>Your order includes the following ingredients:</p>
                <ul>
                    {ingredientsItems}
                </ul>
                <p>Total Price: {props.price}$</p>
                <div className={styles.buttonsArea}>
                    <Button onClick={props.onOk} text="Purchase" type={'ok'}/>
                    <Button onClick={props.onCancel} text="Cancel" type={'cancel'}/>
                </div>
            </div>
        </Fragment>
    )
}

orderSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired
}

export default orderSummary;
