import React, { Component } from 'react'
import { Link } from "react-router-dom"
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
                        <button className="dropbtn">&#9776;</button>
                        <div className="dropdown-content">
                        <a onclick="win.reload()">Refresh (F5)</a>
                        <a onclick=" win.setFullScreen(true)">Fullscreen (F11)</a>
                        <hr/>
                        <a href="https://github.com/Cryptec/Initio" target="_blank" style={{fontSize: "10px", fontWeight: "bold", textAlign: "center" }}>Made with ❤️ by Nippo</a>
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
                        <li>

                                {this.state.isLogin ?
                                    <button onClick={() => this.handleLogout()}>Logout</button>
                                    : <Link to="/login" onClick={() => this.handleLogout()}></Link>
                                }
                            
                        </li>
                     
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar