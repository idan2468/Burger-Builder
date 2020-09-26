import * as actions from '../actions';

const ingredientsPrices = {
    'cheese': 1,
    'salad': 2,
    'bacon': 3,
    'meat': 4,
}

const initialState = {
    ingredients: {
        'cheese': 0,
        'salad': 0,
        'bacon': 0,
        'meat': 0,
    },
    price: 0
}


const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CHANGE_ING_COUNT:
            let itemChange = action.value - state.ingredients[action.ingredient];
            let newPrice = state.price + itemChange * ingredientsPrices[action.ingredient];
            return {
                ...state,
                ingredients: {...state.ingredients, [action.ingredient]: action.value},
                price: newPrice
            }
        default:
            return state;
    }
}

export default burgerReducer;