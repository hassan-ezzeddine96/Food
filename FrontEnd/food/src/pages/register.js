import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';
import {userContext} from '../userContext';

export default function Register () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const { token, setToken } = useContext(userContext);

    const Redirect = () => {
        if(redirect){
            return <Navigate to='/'/>
        }
    };

    const handleEmailChange = event => {
        setEmail(event.target.value)
    };
    const handlePwdChange = event => {
        setPassword(event.target.value)
    };
    const handleNameChange = event => {
        setName(event.target.value)
    };

    const handleSubmit = event => {
        event.preventDefault();
        setIsLoading(true)
        let data={admin:0,name:name, email: email, password: password}
        axios.post('/api/register', data)
            .then(result => {
                setIsLoading(false);
                // setToken(result.data.access_token);
                setRedirect(true);
                setAuthError(false);
            })
            .catch(error => {
                console.log(error);
                setAuthError(true);
                setIsLoading(false);
            });
    };

    return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={(value)=>handleSubmit(value)}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text" id="inputName" className="form-control" placeholder="name"  name="name" onChange={(value)=>handleNameChange(value)} required/>
                                    <label htmlFor="inputName">Name</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input id="inputEmail" className={"form-control " + (authError ? 'is-invalid' : '')} placeholder="Email address" type="text" name="email" onChange={(value)=>handleEmailChange(value)} autoFocus required/>
                                    <label htmlFor="inputEmail">Email address</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Email. or Email Exist
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className="form-control" id="inputPassword" placeholder="******"  name="password" onChange={(value)=>handlePwdChange(value)} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={isLoading ? true : false}>Register &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={'/'}>Back to Login</Link>
                        </div>
                    </div>
                </div>
                {Redirect()}
            </div>
    );
}


