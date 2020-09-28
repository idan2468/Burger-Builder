import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const changeIngCount = (val, ing) => {
    return {type: actionTypes.CHANGE_ING_COUNT, ingredient: ing, value: val}
}


export const fetchIngredients = (ingredients) => {
    return {type: actionTypes.FETCH_INGREDIENTS, payload: {ingredients: ingredients, loading: false}}
}
export const fetchIngredientsFailed = () => {
    return {type: actionTypes.FETCH_INGREDIENTS_FAILED, payload: {error: true}}
}
export const fetchIngredientsPending = () => {
    return {type: actionTypes.FETCH_INGREDIENTS_PENDING, payload: {loading: true}}
}

export const initIngredients = () => {
    return async dispatch => {
        dispatch(fetchIngredientsPending());
        try {
            let fetchedIngredients = {};
            let ingredients = await axios.get('/ingredients');
            ingredients.data.map(ingredient => {
                fetchedIngredients[ingredient.name] = 0;
                return null;
            });
            return dispatch(fetchIngredients(fetchedIngredients));
        } catch (e) {
            return dispatch(fetchIngredientsFailed());
        }
    }
}