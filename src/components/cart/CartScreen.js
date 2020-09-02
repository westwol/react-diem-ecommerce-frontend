import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store } from 'react-notifications-component';
import { CartListItem } from './CartListItem';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useForm } from '../../hooks/useForm';
import { submitNewOrder } from '../../api/order';
import { setError, removeError } from '../../actions/ui';
import { startCleanCart } from '../../actions/cart';

export const CartScreen = ({ history }) => {

    const { products, loadedProducts, loaded, total } = useSelector(state => state.cart);
    const { loaded:authLoaded, name, last_name } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authLoaded && name === '') {
            history.push('/auth/login');
        }  
    }, [ authLoaded, name, history ]);

    const [ formValues, handleInputChange ] = useForm({
        address: '',
        state: '',
        city: '',
        zip: '',
        country: ''
    });
    
    useEffect(() => {
        if(loadedProducts.length === 0) {
            history.push('/')
            store.addNotification({
                title: "Empty cart",
                message: `Your cart is empty`,
                type: "warning",
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
    }, [ history, loadedProducts ])
    
    const { address, city, state, zip, country } = formValues;

    const handleConfirmOrder = async(e) => {
        e.preventDefault();
        try {
            if (!authLoaded) {
                return false;
            }
            dispatch(
                removeError()
            )
            await submitNewOrder(address, city, state, zip, country, products);
            dispatch(
                startCleanCart()
            )
            history.push('/');
            store.addNotification({
                title: "Order received!",
                message: `We have received your order succesfully.`,
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
        } catch (error) {
            dispatch(
                setError('There was an issue performing this action')
            );
        }
    }
    
    return (
        <div className="container animate__animated animate__fadeIn animate__fast">
            <div className="home-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 className="display-4">Cart</h1>
            </div>

            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                        <span className="badge badge-secondary badge-pill">{ loadedProducts.length }</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {
                            (loaded) 
                                ?   loadedProducts.map(product => (
                                        <CartListItem
                                            key={ product._id }
                                            product={ product }
                                        />
                                    ))
                                : <LoadingSpinner />
                        }
                        <li className="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>${ total }</strong>
                        </li>
                    </ul>
                </div>
                <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" onSubmit={ handleConfirmOrder }>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="firstName" 
                                    placeholder="Please type your first name" 
                                    value={ name }
                                    readOnly={ true }
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="lastName" 
                                    placeholder="Please type your last name" 
                                    value={ last_name }
                                    readOnly={ true }
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="address" 
                                name="address"
                                placeholder="Please type your address" 
                                value={ address }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="country">City</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="city"
                                    name="city"
                                    onChange={ handleInputChange }
                                    value={ city }
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="country">Country</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="country"
                                    name="country"
                                    onChange={ handleInputChange }
                                    value={ country }
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="state">State</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="state"
                                    name="state"
                                    onChange={ handleInputChange }
                                    value={ state }
                                />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="zip">Zip</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="zip"
                                    name="zip"
                                    onChange={ handleInputChange }
                                    value={ zip }
                                />
                            </div>
                        </div>
                    
                        <h4 className="mb-3">Payment</h4>

                        <div className="d-block my-3">
                            <div className="custom-control custom-radio">
                                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required="" />
                                <label className="custom-control-label" htmlFor="credit">Credit card</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required="" />
                                <label className="custom-control-label" htmlFor="debit">Debit card</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required="" />
                                <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <button className="btn btn-primary btn-lg btn-block" type="submit">Confirm order</button>
                    </form>
                </div>
            </div>
        </div>
        
    
    )
}
