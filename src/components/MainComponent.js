import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Redirect } from "react-router-dom";
import Layout from '../components/Layout';
import Home from '../pages/Home';
import UserList from '../pages/UserList';
import RequestList from '../pages/RequestList';
import LoginForm from '../pages/LoginForm';
import { connect } from 'react-redux';
import { login }  from '../actions';

const styles = theme => ({
    container: {
        background: 'linear-gradient(#B7BECE ,#f0f3f9)'
    }
})

const mapStateToProps = ({ auth: {token}}) => {
    return { token }
};
class MainComponent extends Component {
    render() {
        const { token, classes } = this.props;
        return (
            <div className={ classes.container }>
                <Route path="/login" exact component={ LoginForm } />
                <Route path="/" exact component={ () => token ? <Layout><Home/></Layout> : <Redirect to="/login"/> }/>
                <Route path="/users" component={ () => token ? <Layout><UserList/></Layout> : <Redirect to="/login" /> }/>
                <Route path="/requests" component={ () => token ? <Layout><RequestList/></Layout> : <Redirect to="/login"/> }/>
            </div>
        );
    };
};

export default withStyles(styles)(connect(mapStateToProps, { login })(MainComponent));