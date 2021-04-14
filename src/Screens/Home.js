import React, { Component } from 'react'

import '../css/Global.css'

import Sidebar from '../Components/Sidebar'

class Home extends Component {



    render() {
        return (
            <div>
            <div>
                
                <Sidebar />
            </div>
            <div className="container">
                HOME
            </div>
            </div>


        );
    }
}

export default Home;