import React, { Component } from 'react'

import Sidebar from '../Components/Sidebar'

import '../css/Global.css'
import '../css/AddNew.css'

class New extends Component {

    render() {
        return (
<div>
<Sidebar />
<div className="container">

    <div className="box-wrapper"> 
        <div id="articles"> 

            <form type="submit">

                <div className="Teilenummer">
                    <label>
                    Teilenummer: 
                    <br/>
                    <input type="text" className="teilenrinput" name="Teilenummer" id="Teilenummer" /><br /><br />
                    </label>
                </div> 

                <div className="SKU">
                    <label>SKU: 
                    <br />
                    <input type="text" name="SKU" className="skuinput" id="SKU" /><br /><br />
                    </label>
                </div> 

                <div className="Price">
                    <label>
                    Preis: 
                    <br />
                    <input type="text" name="Price" className="priceinput" id="Price" /><br /><br />
                    </label>
                </div> 

                <div className="Hersteller">
                  <label>
                  Hersteller: 
                  <br />
                      <select name="Hersteller" id="Hersteller" className="herstellerinput">
                          <option value="Volkswagen">Volkswagen</option>
                          <option value="Audi">Audi</option>
                          <option value="BMW" selected="selected">BMW</option>
                          <option value="Mercedes" selected="selected">Mercedes</option>
                          <option value="Opel" selected="selected">Opel</option>  
                      </select>
                  </label>
              </div>

              <div className="Beschreibung">
                  <label>
                  Beschreibung: 
                  <br />
                  <input type="text" name="Beschreibung" className="beschreibunginput" id="Beschreibung" /><br /><br />      
                  </label>
              </div>

              <input  class="Eintragen-Button" type="submit" value="Anlegen " 
                       onclick="values(); 
                       document.getElementById('Teilenummer').value='';
                       document.getElementById('Beschreibung').value='';
                       document.getElementById('Price').value='';
                       document.getElementById('SKU').value=''; "/>

                       <span id="response"></span>
                       <button class="exportieren" onclick="exportTableToExcel('tblData')">Exportieren</button>

            </form>

        </div>

        <div id="box3"> 
            <div id="box4"> 
               <table className="table" id="tblData" >
                <thead>
                   <tr className="tblhead">
                      <th style={{'borderTopLeftRadius': '4px'}}>Teilenummer</th>
                      <th>Hersteller</th>
                      <th>Beschreibung</th>
                      <th>Preis</th>
                      <th style={{'borderTopRightRadius': '4px'}}>SKU</th>
                   </tr>
                </thead>
               </table>
            </div>
        </div>

    </div>

</div>
</div>
        )
    }
}

export default New