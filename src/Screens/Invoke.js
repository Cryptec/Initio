import React, { Component } from 'react'
import Sidebar from '../Components/Sidebar'

import '../css/Invoke.css'

class Invoke extends Component {



    render() {
        return (
            <div>
            <Sidebar />
            <div className="container">
               <div class="section-wrapper"> 
                  <div id="search-wrapper"> 
                     
                     <form className="search">
                       
                       <label>Teilesuche: 
                       <br /> 
                       <input type="text" name="Suchen" id="suchen" style={{'width': '500px'}} />
                       </label>

                     </form>
                     <a href="showitems.html"><input class="suchen-Button" type="submit" value="Suchen" onClick= "document.getElementById('Suchen').value=''" /></a>
                  </div> 
              </div>
            </div>
            </div>


        );
    }
}

export default Invoke;