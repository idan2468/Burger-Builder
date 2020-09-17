import React, {Fragment} from 'react';
import styles from './BurgerIngredients.scss';
import PropTypes from 'prop-types';

const ingredientsStyles = {
    'bread-bottom': styles.BreadBottom,
    'bacon': styles.Bacon,
    'bread-top': styles.BreadTop,
    'meat': styles.Meat,
    'cheese': styles.Cheese,
    'salad': styles.Salad,
    'seed-1': styles.Seeds1,
    'seed-2': styles.Seeds2
}

const burgerIngredients = (props) => {
    let ingredientDiv = <div className={ingredientsStyles[props.type]}/>;
    if (props.type === 'bread-top') {
        ingredientDiv = <div className={ingredientsStyles[props.type]}>
            <div className={ingredientsStyles["seed-1"]}/>
            <div className={ingredientsStyles["seed-2"]}/>
        </div>
    }
    return (
        <Fragment>
            {ingredientDiv}
        </Fragment>
    )
}

burgerIngredients.propTypes = {
    type: PropTypes.string.isRequired
}

export default burgerIngredients;
export {ingredientsStyles};
