import React from 'react';
import { Route, Link } from "react-router-dom";
import UserList from '../pages/UserList';
import RequestList from '../pages/RequestList';
import '../App.css';

function RegisteredComponent() {
  return (
    <div className="App">
      <header className="App-header">
        <p> Administration Panel</p>
      </header>
      <div className="Container">
        <Link to="/home/users">Users</Link>
        <Link to="/home/requests">Requests</Link>
        <Link to="/login">Log out</Link>
      </div>
      <Route path="/home/users" component={UserList}/>
      <Route path="/home/requests" component={RequestList}/>
    </div>
  );
}

export default RegisteredComponent;
