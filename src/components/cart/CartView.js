import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { CartViewItem } from './CartViewItem';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const CartView = () => {

    const { products, loadedProducts, total, loaded } = useSelector(state => state.cart);

    return (
        <div className="dropdown ml-auto">
            <button type="button" className="btn btn-dark" data-toggle="dropdown">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart <span className="badge badge-pill badge-danger">{ products.length }</span>
            </button>
            <div className="dropdown-menu">
                <div className="row total-header-section">
                    <div className="col-lg-6 col-sm-6 col-6">
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i> <span className="badge badge-pill badge-danger">{ products.length }</span>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-6 total-section text-right">
                        <p>Total: <span className="text-info">${ total }</span></p>
                    </div>
                </div>
                {
                    (loaded)
                        ? loadedProducts.map(product => (
                                <CartViewItem
                                    key={product._id}
                                    product={product}
                                />
                            ))
                        : <LoadingSpinner />
                }
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12 text-center checkout">
                        <Link 
                            to="/cart"
                        >
                            <button className="btn btn-primary btn-block">Checkout</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>  
    )
}
