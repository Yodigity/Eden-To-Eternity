import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import User from "./Pages/User";
import AuthRoute from "./util/AuthRoute";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import jwtDecode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./redux/store";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObj from "./util/theme";
import Axios from "axios";

const theme = createMuiTheme({ themeObj });

const token = localStorage.FBToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    Axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className='container'>
              {console.log("lol!")}
              <Switch>
                <Route exact path='/' component={Home}></Route>
                <AuthRoute path='/signup' component={Signup} />
                <AuthRoute path='/login' component={Login} />
                <Route exact path='/users/:handle' component={User} />
                <Route
                  exact
                  path='/users/:handle/talk/:talkId'
                  component={User}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
