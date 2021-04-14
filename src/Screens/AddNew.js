import React, { Component } from 'react'

import Sidebar from '../Components/Sidebar'

import '../css/Global.css'

class New extends Component {

    render() {
        return (
            <div>
                <Sidebar />
                <div className="container">
                    NEW
                </div>
            </div>
        )
    }
}

export default New