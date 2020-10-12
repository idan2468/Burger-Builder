import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import styles from './Burger.css';
import {withRouter} from "react-router";

const burger = (props) => {
    let ingredientsArray = null;
    // adding visualised burger
    if (props.ingredients) {
        ingredientsArray = Object.keys(props.ingredients).map((key, i) => {
            const ingredientsElements = [];
            for (let j = 0; j < props.ingredients[key].count; j++) {
                ingredientsElements.push(<BurgerIngredients type={key} key={key + j}/>);
            }
            return ingredientsElements;
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, [])
        // no ingredients chosen yet
        if (ingredientsArray.length === 0) {
            ingredientsArray = <p>Please start to add ingredients!!</p>
        }
    }
    return (
        <Fragment>
            <div className={styles.outDiv}>
                <BurgerIngredients type={'bread-top'}/>
                {ingredientsArray}
                <BurgerIngredients type={'bread-bottom'}/>
            </div>
        </Fragment>
    )
}

burger.propTypes = {
    ingredients: PropTypes.object
}

export default withRouter(burger);
