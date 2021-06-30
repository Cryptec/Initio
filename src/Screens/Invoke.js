import React, { Component } from 'react'
import Sidebar from '../Components/Sidebar'
import Table from '../Components/Table'

import '../css/Invoke.css'
import '../css/Global.css'


class Invoke extends Component {

render() {
    return (
    <div>
        <Sidebar />
            <div className="container">
              <div className="box-wrapper"> 
                  <div id="background" style={{ overflowY: 'hidden' }}>

                    <input 
                        type="search" 
                        name="Suchen" 
                        id="suchen" 
                        placeholder="&#124; &#x2315;" 
                        style={{right: "40px", position: "absolute", width: "200px", color: "white"}}/>
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