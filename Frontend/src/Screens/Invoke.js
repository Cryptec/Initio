import React, { Component } from 'react'
import Sidebar from '../Components/Sidebar'
import Table from '../Components/Table'

import '../css/Invoke.css'
import '../css/Global.css'


class Invoke extends Component {
    constructor(props) {
        super(props)
        this.state = {
          count: 0,
          inputText: ''   
        }
    }

inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    this.setState({ inputText: lowerCase});
};

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
                        onChange={this.inputHandler.bind(this)}
                        style={{right: "40px", position: "absolute", width: "200px", color: "white"}}/>
                    <br />
                    <br />
        
                  <Table input={this.state.inputText} key={this.state.count}/>
                 </div> 
              </div>
            </div>
    </div>
        );
    }
}

export default Invoke;