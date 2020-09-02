import { types } from "../types/types";
import { getOrders } from "../api/order";

export const startLoadingOrders = () => {
    return async(dispatch) => {
        try {
            const orders = await getOrders();
            dispatch(
                setOrders(orders)
            );
            dispatch(
                setLoaded(true)
            );
        } catch (error) {
            console.log(error.message);
        }        
    }
}

export const setOrders = (orders) => ({
    type: types.ordersSet,
    payload: orders
});

export const setLoaded = (bool) => ({
    type: types.ordersSetLoaded,
    payload: bool
});