import React, { useEffect } from 'react';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { startEmailAndPasswordRegister } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

import './auth.css';
import { setError } from '../../actions/ui';


export const RegisterScreen = ({ history }) => {

    const { loaded, name:userName } = useSelector(state => state.auth);

    const { loading, msgError } = useSelector(state => state.ui);

    useEffect(() => {
        if (loaded && userName !== '') {
            history.push('/');
        }  
    }, [ loaded, userName, history ])

    const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const { name, last_name, email, password } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            console.log('lol');
            return false;
        }
        dispatch(
            startEmailAndPasswordRegister(name, last_name, email, password)
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
                <form className="form-signin" onSubmit={handleRegister}>
                    <h3 className="display-4">Register</h3>

                    {
                        msgError &&
                        (
                            <div className="alert alert-warning" role="alert">
                                { msgError }
                            </div>
                        )
                    }

                    <label htmlFor="name" className="sr-only">First name</label>
                    <input 
                        id="name"
                        type="name" 
                        name="name" 
                        className="form-control" 
                        placeholder="First name" 
                        value={ name }
                        onChange={ handleInputChange }
                    />

                    <label htmlFor="name" className="sr-only">Last name</label>
                    <input 
                        id="last_name"
                        type="last_name" 
                        name="last_name" 
                        className="form-control" 
                        placeholder="Last name" 
                        value={ last_name }
                        onChange={ handleInputChange }
                    />

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
                    <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={ loading }>Sign Up</button>
                </form>
            </div>
        </div>
    )
}
