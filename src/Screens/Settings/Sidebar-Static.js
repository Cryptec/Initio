import React, { Component } from 'react'
import { SaveOutline, IoSettingsOutline, MailOutline } from '../../Components/Icons'
import { Link } from 'react-router-dom'


import '../../css/StaticBar.css'

class StaticBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
        }
    }

    render() { 
   
        return ( 
            
            <div className="StaticBar">
            <ul>
            
              <li className="ListItem">
                   <Link to="/settings"> <IoSettingsOutline color="white"/> </Link>
                </li>
          
              <li className="ListItem">
                   <Link to="/settings-connection"> <SaveOutline color="white" /> </Link>
                </li>

                <li className="ListItem">
                    <Link to="/settings-mail"> <MailOutline color="white" /> </Link>
                </li>
            </ul>

            </div>
         );
    }
}
 
export default StaticBar;