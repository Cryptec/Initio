import React, { Component } from 'react'
import Loginbox from '../Components/Login/Loginbox'
import WindowButtons from '../Components/WindowButtons'


class Login extends Component {

    render() {
        return (
            <div>
                <WindowButtons />
                <header className="App-header">
                    <Loginbox />
                </header>
            </div>
        )
    }
}

export default Login