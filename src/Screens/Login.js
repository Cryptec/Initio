import React, { Component } from 'react'
import Loginbox from '../Components/Login/Loginbox'
import '../css/Login.css'

class Login extends Component {

    render() {
        return (
            <div>
                <div id="logincontainer">
                    <Loginbox />
                </div>
            </div>
        )
    }
}

export default Login