import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainComponent from './components/MainComponent';

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

