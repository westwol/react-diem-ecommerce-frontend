import { types } from "../types/types";

const initialState = {
    orders: [],
    loaded: false
}

export const ordersReducer = ( state = initialState, action) => {
    switch (action.type) {
        case types.ordersSet:
            return {
                ...state,
                orders: action.payload
            }
        case types.ordersSetLoaded:
            return {
                ...state,
                loaded: action.payload
            }
        default:
            return state;
    }
}