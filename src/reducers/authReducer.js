import { types } from '../types/types';

const initialState = {
    token: '',
    name: '',
    last_name: '',
    loaded: false
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.authLogin:
            return {
                ...state,
                token: action.payload.token,
                name: action.payload.name,
                last_name: action.payload.last_name
            }
        case types.authLogout: {
            return {
                ...state,
                token: '',
                name: '',
                last_name: '',
            }
        }
        case types.authSetLoaded:
            return {
                ...state,
                loaded: action.payload
            }
        default:
            return state;
    }
}