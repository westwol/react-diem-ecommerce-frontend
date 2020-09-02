import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from '../reducers/cartReducer';
import { productsReducer } from '../reducers/productsReducer';
import { uiReducer } from '../reducers/uiReducer';
import { authReducer } from '../reducers/authReducer';
import { ordersReducer } from '../reducers/ordersReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    cart: cartReducer,
    products: productsReducer,
    orders: ordersReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);