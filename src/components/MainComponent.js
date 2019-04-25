import React, { Component } from 'react';
import { Route } from "react-router-dom";
import RegisteredComponent from '../components/RegisteredComponent';
import LoginForm from '../pages/LoginForm';

class MainComponent extends Component {
    render() {
        return (
            <div>
                <Route path="/login" component={LoginForm} />
                <Route path="/home" component={RegisteredComponent}/>
            </div>
        );
    };
};

export default MainComponent;