import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainComponent from './components/MainComponent';
import { createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#5B7DEB',
        main: '#273EAE',
        dark: '#0b1545',
        contrastText: '#fff',
      },
      secondary: {
        light: '#88d4db',
        main: '#38C2CF',
        dark: '#ABEDF3',
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

