import React, { Component } from 'react'
import Sidebar from '../Components/Sidebar'

import '../css/Global.css'
import '../css/Settings.css'

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

class Settings extends Component {

render() {
  return (
    <div>
      <div>
        <Sidebar />
      </div>

      <div className="container">
        <div className="box-wrapper"> 

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
   </div>

</div>
<div id="box3"> 

  <div id="connection">

    <div id="set3">

      <h3>Login Settings:</h3>
        <text>New password: </text>
            <input type="text" name="pass" id="pass" style={{height: "25px", width: "200px", background: "#2A4A51", borderRadius: "6px", border: "none", color: "white"}}/><br /><br />
              
        <text>Login window: </text>
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
</div>
        );
    }
}

export default Settings;