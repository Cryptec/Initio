import React, { Component } from 'react'
import Sidebar from '../../Components/Sidebar'
import StaticBar from './Sidebar-Static'
import WindowButtons from '../../Components/WindowButtons'

import '../../css/Global.css'
import '../../css/Settings.css'

const $ = require('jquery');

$(document).ready(function() {
    $("#storage").change(function() {
      if ($(this).val() === "local") {
        $('#server').hide(); $('.server').hide();
        $('#user').hide(); $('.user').hide();
        $('#password').hide(); $('.password').hide();
      } else {
        $('#server').show(); $('.server').show();
        $('#user').show(); $('.user').show();
        $('#password').show(); $('.password').show();
      }
    })
  })
  
class Connectionsettings extends Component {

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
           <h3>Connection settings:</h3>

              <text>Type: </text>
                <select name="Storage" id="storage" style={{height: "25px", width: "200px", background: "#2A4A51", borderRadius: "6px", border: "none", color: "white"}}>
                   <option value="MySQL">MySQL</option>
                   <option value="local" id="local">local</option>
                </select>

              <text className="server"> Server: </text>
                <input type="text" name="pass" id="server" style={{height: "25px", width: "200px", background: "#2A4A51", borderRadius: "6px", border: "none", color: "white"}}/><br /><br />
   
              <text className="user">User: </text>
                <input type="text" name="pass" id="user" style={{height: "25px", width: "200px", background: "#2A4A51", borderRadius: "6px", border: "none", color: "white"}}/>

              <text className="password"> Password: </text>
                <input type="text" name="pass" id="password" style={{height: "25px", width: "200px", background: "#2A4A51", borderRadius: "6px", border: "none", color: "white"}}/><br /><br />
    
              <p><button className='save-Button' id="save-Button">Save</button></p>
           
           </div>

         </div> 
       </div>
    </div>


        );
    }
}

export default Connectionsettings;