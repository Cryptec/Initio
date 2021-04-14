import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { logout, isLogin } from '../utils'

import '../css/Sidebar.css'

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
                    <ul className="liststyle">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/new">Neuer Artikel</Link>
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