import * as actionsTypes from '../actions/actionsTypes';
import {updateObject} from '../utilities';
import produce from "immer";


const initialState = {
    ingredients: null,
    price: 0,
    loading: false,
    error: false,
    ordered: false
}


function changeIngCount(action, state) {
    let itemChange = action.value - state.ingredients[action.ingredient].count;
    let newPrice = state.price + itemChange * state.ingredients[action.ingredient].price;
    return produce(state, (draftState) => {
        draftState.price = newPrice;
        draftState.ingredients[action.ingredient].count = action.value;
    });
}

export const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.CHANGE_ING_COUNT:
            return changeIngCount(action, state);
        case actionsTypes.FETCH_INGREDIENTS:
            return updateObject(state, {...action.payload, price: 0, ordered: false});
        case actionsTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, action.payload);
        case actionsTypes.FETCH_INGREDIENTS_PENDING:
            return updateObject(state, action.payload);
        case actionsTypes.SET_ORDERED:
            return updateObject(state, action.payload);
        default:
            return state;
    }
}