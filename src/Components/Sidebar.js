import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../css/Sidebar.css'

class Sidebar extends Component {

    render () {
        return(
            <div>
                <div id="container">
                    <ul className="liststyle">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/new">Neuer Artikel</Link>
                        </li>
                     
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar