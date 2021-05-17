import React, { Component } from 'react'
import Sidebar from '../Components/Sidebar'
import WindowButtons from '../Components/WindowButtons'
import Table from '../Components/Table'

import '../css/Invoke.css'
import '../css/Global.css'


class Invoke extends Component {

render() {
    return (
    <div>
        <WindowButtons />
        <Sidebar />
            <div className="container">
              <div className="box-wrapper"> 
                <div id="background">

                    <input type="search" name="Suchen" id="suchen" placeholder="&#124; &#x2315;" style={{right: "40px", position: "absolute", width: "200px"}}/>
                    <br />
                    <br />
        
                  <Table />
                 </div> 
              </div>
            </div>
    </div>
        );
    }
}

export default Invoke;