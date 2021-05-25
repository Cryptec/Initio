import React, { Component } from 'react'
import PrivateRoute from './Routes/PrivateRoute'
import PublicRoute from './Routes/PublicRoute'
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom"

import './App.css'

import Layout from './Screens/Layout'
import Login from './Screens/Login'
import New from './Screens/AddNew'
import Invoke from './Screens/Invoke'
import Settings from './Screens/Settings/Settings'
import Forgot from './Screens/Forgot'
import Mailsettings from './Screens/Settings/Mailsettings'
import Connectionsettings from './Screens/Settings/Connectionsettings'
import Usersettings from './Screens/Settings/Usersettings'


class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute restricted={false} component={Login} path="/login" exact />
          <PublicRoute restricted={false} component={Forgot} path="/forgot" exact />

          <PrivateRoute restricted={false} component={Layout} path="/" exact />
          <PrivateRoute restricted={false} component={New} path="/new" exact />
          <PrivateRoute restricted={false} component={Invoke} path="/invoke" exact />

          <PrivateRoute restricted={false} component={Settings} path="/settings" exact />
          <PrivateRoute restricted={false} component={Mailsettings} path="/settings-mail" exact />
          <PrivateRoute restricted={false} component={Usersettings} path="/settings-users" exact />
          <PrivateRoute restricted={false} component={Connectionsettings} path="/settings-connection" exact />
        </Switch>
      </Router>
    );
  }
}

export default App;
  
