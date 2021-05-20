import React, { Component } from 'react'
import Sidebar from '../../Components/Sidebar'
import StaticBar from './Sidebar-Static'
import WindowButtons from '../../Components/WindowButtons'

import '../../css/Global.css'
import '../../css/Settings.css'


class Settings extends Component {

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

          <div id="general"> 

            <div id="set1">
              <h3>General settings:</h3>
               <text>Choose Design: </text>

               <select name="Hersteller" id="Hersteller" style={{height: "25px", width: "200px", background: "#2A4A51", borderRadius: "6px", border: "none", color: "white"}}>
                  <option value="design_default">Default</option> 
               </select>
            </div>

       <br />

  <div id="set2">

        
   </div>

</div>
<div id="box3"> 

  <div id="connection">

    <div id="set3">

      <h3>Login Settings:</h3>
        <text>New password: </text>
            <input type="text" name="pass" id="pass" style={{height: "25px", width: "200px", background: "#2A4A51", borderRadius: "6px", border: "none", color: "white"}}/>
              
        <text> Login window: </text>
            <select name="loginselect" id="loginselectid" style={{height: "25px", width: "200px", background: "#2A4A51", borderRadius: "6px", border: "none", color: "white"}}>
                <option value="enabled">enabled</option>
                <option value="disabled" id="disabled">disabled</option>
            </select>

    </div>
    <br />
    
    <p><button className='save-Button' id="save-Button">Save</button></p>
  </div>

</div> 
</div> 
</div>
</div>
        );
    }
}

export default Settings;