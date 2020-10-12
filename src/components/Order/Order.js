import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './Order.css';

const order = (props) => {
    let ingredients = null;
    if (props.ingredients) {
        ingredients = Object.keys(props.ingredients).map(key => {
            return (
                <div className={styles.ingredient} key={key}>
                    <h4>{key}</h4>
                    <h4>{props.ingredients[key]}</h4>
                </div>
            )
        })
    }
    return (
        <Fragment>
            <div className={styles.container} style={props.style}>
                <div>
                    <h3>Name: {props.name}</h3>
                    <div className={styles.ingredientsContainer}>
                        <h3>Ingredients:</h3>
                        {ingredients}
                    </div>
                </div>
                <h3>Price: ${props.price}</h3>
            </div>
        </Fragment>
    )
}

export default order;

order.propTypes = {
    ingredients: PropTypes.object,
    name: PropTypes.string,
    price: PropTypes.number,
    style: PropTypes.object
}