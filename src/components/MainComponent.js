import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import UserList from '../pages/UserList';
import RequestList from '../pages/RequestList';
// import RegisteredComponent from '../components/RegisteredComponent';
import LoginForm from '../pages/LoginForm';

class MainComponent extends Component {
    render() {
        return (
            <div>
                <Route path="/login" exact component={LoginForm} />
                <Route path="/" exact component={ () => <Layout><Home/></Layout> }/>
                <Route path="/users" component={ () => <Layout><UserList/></Layout> }/>
                <Route path="/requests" component={ () => <Layout><RequestList/></Layout> }/>
            </div>
        );
    };
};

export default MainComponent;