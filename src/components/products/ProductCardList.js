import React from 'react'
import { ProductCard } from './ProductCard';

export const ProductCardList = ({ products }) => {
    return (
        <div className="container">
            <div className="card-deck mb-3 text-center">
                {
                    products.map(product => (
                        <ProductCard key={ product._id } product={ product } />
                    ))
                }
            </div>     
        </div>
    )
}
