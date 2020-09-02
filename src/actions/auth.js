import { signIn, isMe, signUp } from "../api/auth"
import { types } from "../types/types";
import { setError, removeError, uiStartLoading, uiFinishLoading } from "./ui";
import { saveState } from "../store/localStorage";
import tokenAuth from "../config/token";

export const startEmailAndPasswordRegister = (name, last_name, email, password) => {
    return async(dispatch) => {
        try {
            dispatch(
                removeError()
            )
            dispatch(
                uiStartLoading()
            )
            await signUp(name, last_name, email, password);
            dispatch(
                startEmailAndPasswordLogIn(email, password)
            );
            dispatch(
                uiFinishLoading()
            )
        } catch (error) {
            dispatch(
                setError(error.response.data)
            )
            dispatch(
                uiFinishLoading()
            )
        }
    }
}

export const startEmailAndPasswordLogIn = (email, password) => {
    return async(dispatch) => {
        try {
            dispatch(
                removeError()
            )
            dispatch(
                uiStartLoading()
            )
            const authUser = await signIn(email, password);
            const { token, name, last_name } = authUser;
            // Setting token in headers for the next requests
            tokenAuth(token);
            saveState('auth', {
                token,
                name,
                last_name
            });
            dispatch(
                login(token, name, last_name)
            );
            dispatch(
                uiFinishLoading()
            )
        } catch (error) {
            dispatch(
                setError('Email or password appears to be invalid')
            )
            dispatch(
                uiFinishLoading()
            )
        }
        
    }
}

export const startTokenLogin = (prevToken) => {
    return async(dispatch) => {
        try {
            // Setting token in headers for the next requests
            tokenAuth(prevToken);
            // Requesting backend for authentification based on token passed
            const authMe = await isMe();
            const { name, last_name, token } = authMe;
            saveState('auth', {
                token,
                name,
                last_name
            });
            dispatch(
                login(token, name, last_name)
            )
            dispatch(
                setLoaded(true)
            )
        } catch (error) {
            // Wipe out localStorage as token is invalid or expired
            saveState('auth', {});
            dispatch(
                setLoaded(true)
            )
        }
    }
}

export const login = (token, name, last_name) => ({
    type: types.authLogin,
    payload: {
        token,
        name,
        last_name
    }
})

export const startLogout = () => {
    return (dispatch) => {
        saveState('auth', {});
        dispatch(
            logout()
        );
    }
}

export const logout = () => ({
    type: types.authLogout
})

export const setLoaded = (bool) => ({
    type: types.authSetLoaded,
    payload: bool
});
