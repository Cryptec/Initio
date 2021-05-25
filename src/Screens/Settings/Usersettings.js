import React, { Component } from 'react'
import Sidebar from '../../Components/Sidebar'
import StaticBar from './Sidebar-Static'
import Userstable from '../../Components/Userstable'

import '../../css/Global.css'
import '../../css/Settings.css'



class Usersettings extends Component {

render() {
  return (
    <div>
      <div>
        <Sidebar />
        <StaticBar />
      </div>

      <div className="container">
        <div className="box-wrapper-settings"> 

          <div id="general"> 

            <div id="set1">
              <h3>User settings:</h3>
               <text>Add new user: </text>

            </div>

       <br />

  <div id="set2">

        
   </div>

</div>
<div id="box3"> 

  <div id="connection">

    <div id="set3">

    <table className="table" id="tblData">
                <thead className="tblhead" >
                  
                   <Userstable />
                 
                </thead>
                 
               </table>
        

    </div>
    <br />
    
  </div>

</div> 
</div> 
</div>
</div>
        );
    }
}

export default Usersettings;