import React from 'react';
import { Route, Link } from "react-router-dom";
import Layout from '../pages/Layout';
import UserList from '../pages/UserList';
import RequestList from '../pages/RequestList';
import '../App.css';

function RegisteredComponent() {
  return (
    <div className="App">
      <Route path="/" component={ () => <Layout/> }/>
      <Route path="/users" component={ () => <Layout><UserList/></Layout> }/>
      <Route path="/requests" component={ () => <Layout><RequestList/></Layout> }/>
    </div>
  );
}

export default RegisteredComponent;
