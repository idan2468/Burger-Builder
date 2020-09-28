import * as actionsTypes from '../actions/actionsTypes';
import {updateObject} from '../utilities';

const ingredientsPrices = {
    'cheese': 1,
    'salad': 2,
    'bacon': 3,
    'meat': 4,
}

const initialState = {
    ingredients: null,
    price: 0,
    loading: false,
    error: false
}


function changeIngCount(action, state) {
    let itemChange = action.value - state.ingredients[action.ingredient];
    let newPrice = state.price + itemChange * ingredientsPrices[action.ingredient];
    return updateObject(state, {
        ingredients: {...state.ingredients, [action.ingredient]: action.value},
        price: newPrice
    })
}

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.CHANGE_ING_COUNT:
            return changeIngCount(action, state);
        case actionsTypes.FETCH_INGREDIENTS:
            return updateObject(state, action.payload);
        case actionsTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, action.payload);
        case actionsTypes.FETCH_INGREDIENTS_PENDING:
            return updateObject(state, action.payload);
        default:
            return state;
    }
}

export default burgerReducer;