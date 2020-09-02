import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../api/products';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ProductDetailCard } from './ProductDetailCard';

import './products.css';

export const ProductScreen = () => {

    const { id } = useParams();
    const [ product, setProduct ] = useState(null);
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        if (!loaded) {
            getProductById(id)
                .then(product => {
                    setProduct(product);
                    setLoaded(true);
                });
        }         
    }, [ loaded, id ]);
    
    if (!loaded) {
        return (
            <LoadingSpinner />
        )
    }

    return ( 
        <ProductDetailCard product={ product } />
    );
}
