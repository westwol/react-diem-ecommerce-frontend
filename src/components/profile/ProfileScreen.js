import React, { useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { startLoadingOrders } from '../../actions/orders';
import { startLogout } from '../../actions/auth';

export const ProfileScreen = ({ history }) => {

    const dispatch = useDispatch();

    const { orders } = useSelector(state => state.orders);
    const { loaded:authLoaded, name, last_name } = useSelector(state => state.auth);

    useEffect(() => {
        if (authLoaded && name === '') {
            history.push('/auth/login');
        }  
    }, [ authLoaded, name, history ]);

    
    useEffect(() => {
        dispatch(
            startLoadingOrders()
        );        
    }, [ dispatch ]);

    const handleLogout = () => {
        dispatch(
            startLogout()
        );
    }


    return (
       <div className="container p-5 animate__animated animate__fadeIn animate__fast">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="orders-tab" data-toggle="tab" href="#orders" role="tab" aria-controls="orders" aria-selected="false">Orders</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                Name: { name } { last_name }
                <hr />
                <button className="btn btn-info" onClick={ handleLogout }>Logout</button>
                </div>
                <div className="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                    <ul className="list-group p-3">
                        {
                            orders.length > 0 
                                ? orders.map(order => (
                                        (
                                            <li key={order._id} className="list-group-item">{order._id} | { moment(order.created_at).format('LLL') }</li>
                                        )
                                    ))
                                : 'There are not orders to display.'
                        }
                    </ul>
                </div>
            </div>
       </div>
    )
}
