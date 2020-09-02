import React, { useEffect }  from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
  } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { HomeScreen } from '../components/home/HomeScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { NavbarPanel } from '../components/ui/Navbar';
import { loadState } from "../store/localStorage";
import { loadCart, loadCartData } from '../actions/cart';
import { startTokenLogin, setLoaded } from '../actions/auth';
import { ProductScreen } from '../components/products/ProductScreen';
import { CartScreen } from '../components/cart/CartScreen';
import { ProfileScreen } from '../components/profile/ProfileScreen';

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            loadCart(loadState('cart'))
        )
        dispatch(
            loadCartData()
        );
        const authState = loadState('auth');
        if (Object.keys(authState).length !== 0) {
            const { token } = authState;
            dispatch(
                startTokenLogin(token)
            );
        } else {
            dispatch(
                setLoaded(true)
            )
        }
    }, [ dispatch ]);

    return (
        <Router>
            <div>
                <NavbarPanel />
                <Switch>
                    <Route
                        path="/auth/login"
                        component={ LoginScreen }
                    />
                    <Route
                        path="/auth/register"
                        component={ RegisterScreen  }
                    />
                    <Route
                        exact
                        path="/"
                        component={ HomeScreen }
                    />
                    <Route
                        exact
                        path="/products/:id"
                        component={ ProductScreen }
                    />
                    <Route
                        path="/cart"
                        component={ CartScreen }
                    />
                    <Route
                        path="/profile"
                        component={ ProfileScreen }
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
