import { types } from "../types/types";
import { saveState } from "../store/localStorage";
import { getCurrentCart } from '../api/cart';

export const addProduct = (id, quantity) => {
    return async(dispatch, getState) => {
        dispatch(
            addProductToCart(id, quantity)
        )

        const { products } = getState().cart;

        saveState('cart', products);

        dispatch(
            loadCartData()
        );
    }
}

export const loadCartData = () => {
    return async(dispatch, getState) => {
        dispatch(
            setLoaded(false)
        )
        const { products } = getState().cart;
        const ids = products.map(product => {
            return product.id;
        });
        const cartProducts = await getCurrentCart(ids);
        cartProducts.map(cartProduct => {
            let product = products.find(product => product.id === cartProduct._id);
            cartProduct.quantity = product ? product.quantity : 1;
            return cartProduct;
        })
        dispatch(
            setLoadedProducts(cartProducts)
        )
        dispatch(
            setLoaded(true)
        )
    }
}

export const setLoadedProducts = (products) => ({
    type: types.cartSetLoadedProducts,
    payload: products
});

export const addProductToCart = (id, quantity) => ({
    type: types.cartAddProduct,
    payload: {
        id,
        quantity
    }
});

export const loadCart = (products) => ({
    type: types.cartLoadProducts,
    payload: products
});

export const setLoaded = (bool) => ({
    type: types.cartSetLoaded,
    payload: bool
});

export const cleanCart = () => ({
    type: types.cartClean
})

export const startCleanCart = () => {
    return async(dispatch) => {
        saveState('cart', []);
        dispatch(
            cleanCart()
        )
    }
}