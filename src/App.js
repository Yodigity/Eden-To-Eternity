import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#72cff8",
      main: "#4fc3f7",
      dark: "#3788ac",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ea605d",
      main: "#e53935",
      dark: "#a02725",
      contrastText: "#fff",
    },
  },

  typography: {
    useNextVariants: true,
  },
});

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route path='/signup' component={Signup}></Route>
                <Route path='/login' component={Login}></Route>
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
