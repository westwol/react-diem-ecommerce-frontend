import React from 'react'
import ReactNotification from 'react-notifications-component';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

import 'react-notifications-component/dist/theme.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles.css';

export const EcommerceApp = () => {
    return (
        <Provider store={ store }>
            <ReactNotification />
            <AppRouter />
        </Provider>
    )
}
