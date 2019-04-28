import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import Layout from '../components/Layout';
import Home from '../pages/Home';
import UserList from '../pages/UserList';
import RequestList from '../pages/RequestList';
import LoginForm from '../pages/LoginForm';

class MainComponent extends Component {

    state = {
        loggedIn: false
    };

    authentification = () => {
        this.setState({ loggedIn: true });
    };

    render() {
        const { loggedIn } = this.state;
        return (
            <div>
                <Route path="/login" exact component={ LoginForm } />
                <Route path="/" exact component={ () => loggedIn ? <Layout><Home/></Layout> : <Redirect to="/login"/> }/>
                <Route path="/users" component={ () => <Layout><UserList/></Layout> }/>
                <Route path="/requests" component={ () => <Layout><RequestList/></Layout> }/>
            </div>
        );
    };
};

export default MainComponent;