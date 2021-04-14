import React, { Component } from 'react';
//import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import './App.css'

import Home from './Screens/Home'
import Login from './Screens/Login';
import New from './Screens/AddNew';


class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute restricted={false} component={Login} path="/login" exact />

          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={false} component={New} path="/new" exact />

        </Switch>
      </Router>
    );
  }
}

export default App;
  
