import { types } from "../types/types";

const initialState = {
    products: [],
    loaded: false,
    loadedListing: false
}

export const productsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case types.productsGetListing:
            return {
                ...state,
                products: action.payload,
                loadedListing: true
            }
        case types.productsSetLoaded:
            return {
                ...state,
                loaded: action.payload
            }
        default:
            return state;
    }
}