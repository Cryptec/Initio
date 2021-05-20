import React, { Component } from 'react'
import Sidebar from '../../Components/Sidebar'
import StaticBar from './Sidebar-Static'
import WindowButtons from '../../Components/WindowButtons'

import '../../css/Global.css'
import '../../css/Settings.css'


class Mailsettings extends Component {

render() {
  return (
    <div>
      <div>
        <WindowButtons />
        <Sidebar />
        <StaticBar />
      </div>

       <div className="container">
         <div className="box-wrapper-settings"> 

           <div className="simplebackground">
           <div id="set4">

                <h3>email Settings:</h3>
                <text>receiving address: </text>
                    <input type="text" name="pass" id="pass" style={{height: "25px", width: "200px", background: "#2A4A51", borderRadius: "6px", border: "none", color: "white"}}/><br /><br />
        
                <text>sending address: </text>
                    <select name="loginselect" id="loginselectid" style={{height: "25px", width: "200px", background: "#2A4A51", borderRadius: "6px", border: "none", color: "white"}}>
                     <option value="enabled">enabled</option>
                     <option value="disabled" id="disabled">disabled</option>
                    </select>
            </div>
                    <p><button className='save-Button' id="save-Button">Save</button></p>
            </div>
           
         </div> 
       </div>
    </div>


        );
    }
}

export default Mailsettings;