import { types } from "../types/types";

const initialState = {
    products: [],
    loadedProducts: [],
    total: 0,
    loaded: false
}

export const cartReducer = ( state = initialState, action) => {
    switch (action.type) {
        case types.cartClean:
            return {
                ...state,
                products: [],
                loadedProducts: [],
                total: 0
            }
        case types.cartLoadProducts:
            return {
                ...state,
                products: action.payload
            }
        case types.cartAddProduct:
            let newState = state.products;
            if (action.payload.quantity > 0) {
                const foundItem = newState.find(itemState => itemState.id === action.payload.id);
                // If item found quantity is updated
                if (foundItem) {
                    foundItem.quantity += action.payload.quantity;
                } else {
                    // If the item is not found we push a new one to the array
                    newState.push(action.payload);
                }
            } else {
                newState = newState.filter(itemState => itemState.id !== action.payload.id);
            }
            return {
                ...state,
                products: newState
            }
        case types.cartSetLoadedProducts:
            return {
                ...state,
                loadedProducts: action.payload,
                total: action.payload.reduce((total, product) => total += product.price * product.quantity, 0)
            }
        case types.cartSetLoaded:
            return {
                ...state,
                loaded: action.payload
            }
        default:
            return state;
    }
}