import React from 'react'

export const CartViewItem = ({ product }) => {

    const { name, image_path, price, quantity } = product;

    return (
        <div className="row cart-detail">
            <div className="col-lg-4 col-sm-4 col-4 cart-detail-img">
                <img src={ image_path } alt={ name } />
            </div>
            <div className="col-lg-8 col-sm-8 col-8 cart-detail-product">
                <p>{ name }</p>
                <span className="price text-info"> ${ price }</span> <span className="count"> Quantity: { quantity }</span>
            </div>
        </div>
    )
}
