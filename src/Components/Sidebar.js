import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout, isLogin } from '../utils'

import '../css/Sidebar.css'
import '../css/Dropdown.css'

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: isLogin()
        }
    }

    handleLogout = () => {
        logout();
        this.props.history.push('/login')
        this.setState({
            isLogin: false
        })
    }

    render () {
        return(
            <div>
                <div id="container">

                    <div className="dropdown">
                        <button className="dropbtn"> &#9776;</button>
                        <div className="dropdown-content">
                        <p onclick="win.reload()">Refresh (F5)</p>
                        <p onclick=" win.setFullScreen(true)"> Fullscreen (F11)</p>
                        <hr/>
                       

                                {this.state.isLogin ?
                                    <p onClick={() => this.handleLogout()}>Logout</p>
                                    : <Link to="/login" onClick={() => this.handleLogout()}>Logout</Link>
                                }
                            
                      
                        </div>
                    </div>


                    <ul id="liststyle">
                        <li>
                            <Link className="liststyle" to="/">Home</Link>
                        </li>
                        <li>
                            <Link className="liststyle" to="/new">Neuer Artikel</Link>
                        </li>
                        <li>
                            <Link className="liststyle" to="/invoke">Abrufen</Link>
                        </li>
                        <li>
                            <Link className="liststylesettings" to="/settings">&#9881; Einstellungen</Link>
                        </li>
                     
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(Sidebar)