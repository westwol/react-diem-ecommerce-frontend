import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { CartView } from '../cart/CartView';

import './navbar.css';
import { LoadingSpinner } from './LoadingSpinner';

export const NavbarPanel = () => {

    const { loaded, name } = useSelector(state => state.auth);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link 
                    className="navbar-brand" 
                    to="/"
                >
                    <img src="/assets/logo-brand.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
                    Diem Ecommerce
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink 
                            activeClassName="active"
                            className="nav-item nav-link" 
                            exact
                            to="/"
                        >
                            Home
                        </NavLink>
                        {
                            !loaded
                                ? <LoadingSpinner />
                                : name !== '' 
                                    ?   (
                                            <NavLink 
                                                activeClassName="active"
                                                className="nav-item nav-link" 
                                                exact
                                                to="/profile"
                                            >
                                                { name }
                                            </NavLink>
                                        )
                                    :   (
                                            <NavLink 
                                                activeClassName="active"
                                                className="nav-item nav-link" 
                                                exact
                                                to="/auth/login"
                                            >
                                                Login
                                            </NavLink>
                                        )
                        }
                    </div>
                    <CartView />
                </div>
            </nav>
        </>
    );
}
