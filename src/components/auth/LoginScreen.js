import React, { useEffect } from 'react';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { startEmailAndPasswordLogIn } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

import './auth.css';
import { setError } from '../../actions/ui';
import { Link } from 'react-router-dom';


export const LoginScreen = ({ history }) => {

    const { loaded, name } = useSelector(state => state.auth);

    const { loading, msgError } = useSelector(state => state.ui);

    useEffect(() => {
        if (loaded && name !== '') {
            history.push('/');
        }  
    }, [ loaded, name, history ])

    const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogIn = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            console.log('lol');
            return false;
        }
        dispatch(
            startEmailAndPasswordLogIn(email, password)
        );
    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            dispatch(
                setError('The email appears to be invalid')
            );
            return false;
        }
        else if (password.length < 5) {
            dispatch(
                setError('The password should be atleast 5 characters and have to match to eachother')
            );
            return false;
        }
        dispatch(
            setError(null)
        );
        return true;
    }

    return (
        <div className="auth-main animate__animated animate__fadeIn animate__fast">
            <div className="auth-container text-center">
                <form className="form-signin" onSubmit={handleLogIn}>
                    <h3 className="display-4">Login</h3>

                    {
                        msgError &&
                        (
                            <div className="alert alert-warning" role="alert">
                                { msgError }
                            </div>
                        )
                    }

                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input 
                        id="email"
                        type="email" 
                        name="email" 
                        className="form-control" 
                        placeholder="Email address" 
                        value={ email }
                        onChange={ handleInputChange }
                    />
                    <label htmlFor="password"  className="sr-only">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        name="password" 
                        className="form-control" 
                        placeholder="Password" 
                        value={ password }
                        onChange={ handleInputChange }
                    />
                    <div className="checkbox mb-3">
                        <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <span>Aren't you signed up? <Link to="/auth/register">click here!</Link></span>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={ loading }>Login</button>
                </form>
            </div>
        </div>
    )
}
