import { types } from "../types/types";
import { getHomeProductListing } from '../api/products';

export const startLoadingProducts = () => {
    return async(dispatch) => {
        try {
            const products = await getHomeProductListing();
            dispatch(
                setProducts(products)
            );
            dispatch(
                setLoaded(true)
            );
        } catch (error) {
            console.log(error.message);
        }        
    }
}

export const setProducts = (products) => ({
    type: types.productsGetListing,
    payload: products
});

export const setLoaded = (bool) => ({
    type: types.productsSetLoaded,
    payload: bool
});