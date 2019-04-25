import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import MainComponent from './components/MainComponent';
// import Sample from './pages/Sample';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Route component={MainComponent}/>
        </Router>
      </div>
    );
  }
}

export default App;

