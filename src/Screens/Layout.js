import React, { Component } from 'react'

import '../css/Global.css'
import '../css/WindowButtons.css'

import Sidebar from '../Components/Sidebar'
import Home from './Home'

class Layout extends Component {



    render() {
        return (
            <div>
            <div>
                <Sidebar />
            </div>
            <div className="container">
                <Home />
            </div>
            </div>


        );
    }
}

export default Layout;