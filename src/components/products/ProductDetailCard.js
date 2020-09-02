import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { store } from 'react-notifications-component';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../actions/cart';

export const ProductDetailCard = ({ product }) => {

    const { _id, name, description, price, image_path } = product;

    const history = useHistory();
    const dispatch = useDispatch();
    const [ quantity, setQuantity ] = useState(1);

    const handleGoBack = () => {
        history.goBack();
    }

    const handleAddProduct = (redirect) => {
        dispatch(
            addProduct(_id, quantity)
        );
        store.addNotification({
            title: "Added to cart!",
            message: `You added ${quantity}x ${name} to your cart.`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
        });
        if (redirect) {
            setTimeout(() => {
                history.push('/cart');
            }, 2500);
        }
    }

    const updateQuantity = (increment) => {
        if (increment) {
            setQuantity(quantity + 1);
        } else {
            if (quantity > 1) {
                setQuantity(quantity - 1);
            }
        }
    }

    return (
        <div className="container animate__animated animate__fadeIn animate__fast">
            <div className="col-lg-8 border p-3 main-section bg-white">
                <div className="row hedding m-0 pl-3 pt-0 pb-3">
                    <i className="fa fa-chevron-left cursor" aria-hidden="true" onClick={ handleGoBack } />
                </div>
                <div className="row m-0">
                    <div className="col-lg-4 left-side-product-box pb-3">
                        <img src={ image_path } className="border p-3" alt="oasdo" />
                    </div>
                    <div className="col-lg-8">
                        <div className="right-side-pro-detail border p-3 m-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <p className="m-0 p-0">{ name }</p>
                                </div>
                                <div className="col-lg-12">
                                    <p className="m-0 p-0 price-pro">${ price }</p>
                                    <hr className="p-0 m-0"/>
                                </div>
                                <div className="col-lg-12 pt-2">
                                    <h5>Product Detail</h5>
                                    <span>{ description }</span>
                                    <hr className="m-0 pt-2 mt-2"/>
                                </div>
                                <div className="col-lg-12">
                                    <h6>Quantity :</h6>
                                    <button className="btn btn-danger" onClick={ () =>  updateQuantity(false) }>-</button>
                                    <span className="p-3">
                                        { quantity }
                                    </span>
                                    <button className="btn btn-info" onClick={  () => updateQuantity(true) }>+</button>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <div className="row">
                                        <div className="col-lg-6 pb-2">
                                            <button className="btn btn-danger w-100" onClick={ () => handleAddProduct(false) }>Add To Cart</button>
                                        </div>
                                        <div className="col-lg-6">
                                            <button className="btn btn-success w-100" onClick={ () => handleAddProduct(true) }>Shop Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
