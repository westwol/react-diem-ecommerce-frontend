import React from 'react'

export const CartListItem = ({ product }) => {
    const { name, description, quantity, price } = product;
    return (
        <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <h6 className="my-0">{ quantity }x { name }</h6>
                <small className="text-muted">{ description }</small>
            </div>
            <span className="text-muted">${ price * quantity }</span>
        </li>
    )
}
