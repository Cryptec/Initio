import React, { Component } from 'react'

import '../css/Global.css'
import '../css/WindowButtons.css'

import Sidebar from '../Components/Sidebar'
import WindowButtons from '../Components/WindowButtons'
import Home from './Home'

class Layout extends Component {



    render() {
        return (
            <div>
            <div>
                <Sidebar />
            </div>
            <div className="container">
                <WindowButtons />
                <Home />
            </div>
            </div>


        );
    }
}

export default Layout;