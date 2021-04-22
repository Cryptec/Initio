import React, { Component } from 'react'

import '../css/Global.css'
import '../css/WindowButtons.css'

import Sidebar from '../Components/Sidebar'
import WindowButtons from '../Components/WindowButtons'

class Home extends Component {



    render() {
        return (
            <div>
            <div>
                <Sidebar />
            </div>
            <div className="container">
            <WindowButtons />
                HOME
            </div>
            </div>


        );
    }
}

export default Home;