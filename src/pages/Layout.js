import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

function Layout(props) {
  return (
    <div className="App">
      <header className="App-header">
        <p> Administration Panel</p>
      </header>
      <div className="Container">
        <Link to="/users">Users</Link>
        <Link to="/requests">Requests</Link>
        <Link to="/login">Log out</Link>
      </div>
      <div className="Container">
        { props.children }
      </div>
    </div>
  );
}

export default Layout;
