import React, { Component } from 'react'
import Loginbox from '../Components/Login/Loginbox'


class Login extends Component {

    render() {
        return (
            <div>
                
                <header className="App-header">
                    <Loginbox />
                    <div style={{ alignItems: 'center', display: 'flex', zIndex: '5', marginBottom: '-500px', fontSize: "0.9rem", color: 'gray' }}> Developed by Martin 'Scheiß' Neubauer</div>
                </header>
            </div>
        )
    }
}

export default Login