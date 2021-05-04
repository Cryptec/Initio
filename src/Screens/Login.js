import React, { Component } from 'react'
import Loginbox from '../Components/Login/Loginbox'


class Login extends Component {

    render() {
        return (
            <div>
                <header className="App-header">
                    <Loginbox />
                </header>
            </div>
        )
    }
}

export default Login