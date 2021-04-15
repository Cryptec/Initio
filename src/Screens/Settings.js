import React, { Component } from 'react'

import '../css/Global.css'

import Sidebar from '../Components/Sidebar'

class Settings extends Component {



    render() {
        return (
            <div>
            <div>
                
                <Sidebar />
            </div>
            <div className="container">
                Settings
            </div>
            </div>


        );
    }
}

export default Settings;