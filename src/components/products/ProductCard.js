import React from 'react'
import { useDispatch } from 'react-redux';
import { store } from 'react-notifications-component';
import { addProduct } from '../../actions/cart';
import { useHistory } from 'react-router-dom'
export const ProductCard = ({ product }) => {

    const { _id, name, description, price, image_path } = product;

    const history = useHistory();

    const dispatch = useDispatch();

    const handleAddProduct = () => {
        dispatch(
            addProduct(_id, 1)
        );
        store.addNotification({
            title: "Added to cart!",
            message: `You added ${name} to your cart.`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
        });
    }

    const handleViewProduct = () => {
        history.push(`/products/${_id}`);
    }

    return (
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mb-5">
            <div className="card">
                <img className="card-img" src={ image_path } alt={ name } />
                <div className="card-body">
                    <div className="cursor" onClick={ handleViewProduct }>
                        <h4 className="card-title">{ name }</h4>
                        <h6 className="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6>
                        <p className="card-text">
                            { description }        
                        </p>
                    </div>
                    <div className="buy d-flex justify-content-between align-items-center">
                        <div className="price text-success"><h5 className="mt-4">${price}</h5></div>
                        <button
                            className="btn btn-danger mt-3"
                            onClick={ handleAddProduct }
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
