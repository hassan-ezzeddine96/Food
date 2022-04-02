import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';
import {userContext} from '../userContext';


export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [isadmin, setIsadmin] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { token, setToken } = useContext(userContext);

    const Redirect = () => {
        if(isadmin && redirect){
            return <Navigate to='/adminDashboard'/>
        }
        else if(redirect){
            return <Navigate to='/dashboard'/>
        }
    };
    // useEffect(() => {
        
    //   }, []);

    const handleEmailChange = event => {
        setEmail(event.target.value)
    };
    const handlePwdChange = event => {
        setPassword(event.target.value)
    };

    const handleSubmit = event => {
        event.preventDefault();
        setIsLoading(true)
        let data={email: email, password: password}
        axios.post('/api/login', data)
            .then(result => {
                axios.get('/api/user', {
                    headers: {
                      'Authorization': `Bearer ${result.data.access_token}`
                    }
                  })
                  .then(res => {
                      if(res.data.admin===1){
                        setIsadmin(true);
                        setRedirect(true);
                      }
                      else{
                        setRedirect(true);
                      }
                })
                localStorage.setItem('token', result.data.access_token);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setAuthError(true)
                setIsLoading(false)
            });
    };
    

    return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form onSubmit={(value)=>handleSubmit(value)}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input className={"form-control " + (authError ? 'is-invalid' : '')} id="inputEmail" placeholder="Email address" type="text" name="email" onChange={(value)=>handleEmailChange(value)} autoFocus required/>
                                    <label htmlFor="inputEmail">Email address</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Email.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className={"form-control " + (authError ? 'is-invalid' : '')} id="inputPassword" placeholder="******" name="password" onChange={(value)=>handlePwdChange(value)} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Password.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={isLoading ? true : false}>Login &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={'register'}>Register here</Link>
                        </div>
                    </div>
                    {Redirect()}
                </div>
            </div>
    );
}


