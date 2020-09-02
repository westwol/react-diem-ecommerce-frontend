import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCardList } from '../products/ProductCardList';

import './home.css';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { startLoadingProducts } from '../../actions/products';

export const HomeScreen = () => {

    const dispatch = useDispatch();

    const { products, loadedListing } = useSelector(state => state.products);

    useEffect(() => {
        if (!loadedListing) {
            dispatch(
                startLoadingProducts()
            );
        }         
    }, [ loadedListing, dispatch ]);

    return (
        <>
            <div className="home-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 className="display-4">Hot products!</h1>
                <p className="lead">Be quick and pick up one or various of our top-sales products.</p>
            </div>


            {
                (!loadedListing) 
                    ? <LoadingSpinner />
                    : (
                        <div className="animate__animated animate__fadeIn animate__fast">
                            < ProductCardList products={ products } />
                        </div>
                    )
            }
        </>
    )
}
