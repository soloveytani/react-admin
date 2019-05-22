import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainComponent from './components/MainComponent';
import { createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#53565c',
        main: '#282c34',
        dark: '#1c1e24',
        contrastText: '#fff',
      },
      secondary: {
        light: '#f73378',
        main: '#f50057',
        dark: '#ab003c',
        contrastText: '#fff',
      },
    },
    typography: {
      useNextVariants: true,
      fontFamily: "'Rubik', sans-serif"
    },
});
class App extends Component {

  render() {
        return (
            <div>
              <MuiThemeProvider theme={ theme }>
                <Router>
                    <Route component={MainComponent}/>
                </Router>
              </MuiThemeProvider>
            </div>
        );
    }
}

export default App;

