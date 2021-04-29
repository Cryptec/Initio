import React, { Component } from 'react'
//import PrivateRoute from './Routes/PrivateRoute'
import PublicRoute from './Routes/PublicRoute'
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom"

import './App.css'

import Home from './Screens/Home'
import Login from './Screens/Login'
import New from './Screens/AddNew'
import Invoke from './Screens/Invoke'
import Settings from './Screens/Settings/Settings'
import Forgot from './Screens/Forgot'
import Mailsettings from './Screens/Settings/Mailsettings'
import Connectionsettings from './Screens/Settings/Connectionsettings'


class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute restricted={false} component={Login} path="/login" exact />
          <PublicRoute restricted={false} component={Forgot} path="/forgot" exact />

          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={false} component={New} path="/new" exact />
          <PublicRoute restricted={false} component={Invoke} path="/invoke" exact />

          <PublicRoute restricted={false} component={Settings} path="/settings" exact />
          <PublicRoute restricted={false} component={Mailsettings} path="/settings-mail" exact />
          <PublicRoute restricted={false} component={Connectionsettings} path="/settings-connection" exact />
        </Switch>
      </Router>
    );
  }
}

export default App;
  
