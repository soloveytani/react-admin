import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class LoginForm extends Component {
    render() {
        return (
            <div className="loginForm">
                <h1>Login Form</h1>
                <Link to="/">Log In</Link>
            </div>

        );
    };
};

export default LoginForm;