import React, { Component } from 'react'
import axios from "axios"
import Sidebar from '../Components/Sidebar'

import '../css/Global.css'
import '../css/AddNew.css'

class New extends Component {
    constructor() {
        super();
        this.state = {
            Teilenummer: "",
            SKU: "",
            Hersteller: "Submit",
            Price: "",
            Beschreibung: "",
            answerOk: "Success",
            answerDenied: "Denied"
        };
    }

    render() {
        return (
<div>
<Sidebar />
<div className="container">

    <div className="box-wrapper"> 
        <div id="box2"> 

            <form onSubmit={this.handleSubmit.bind(this)} method="POST">

                <div className="Teilenummer">
                    <label>
                    Teilenummer: 
                    <br/>
                    <input 
                        type="text" 
                        className="teilenrinput" 
                        name="Teilenummer" 
                        id="Teilenummer" 
                        value={this.state.Teilenummer}
                        onChange={this.handleChange.bind(this)}
                        required
                    />
                    <br /><br />
                    </label>
                </div> 

                <div className="SKU">
                    <label>SKU: 
                    <br />
                    <input 
                        type="text" 
                        name="SKU" 
                        className="skuinput" 
                        id="SKU" 
                        value={this.state.SKU}
                        onChange={this.handleChange.bind(this)}
                        required
                    />
                    <br /><br />
                    </label>
                </div> 

                <div className="Price">
                    <label>
                    Preis: 
                    <br />
                    <input 
                        type="text" 
                        name="Price" 
                        className="priceinput" 
                        id="Price" 
                        value={this.state.Price}
                        onChange={this.handleChange.bind(this)}
                        required
                    />
                    <br /><br />
                    </label>
                </div> 

                <div className="Hersteller">
                  <label>
                  Hersteller: 
                  <br />
                      <select 
                        name="Hersteller" 
                        id="Hersteller" 
                        className="herstellerinput"
                        value={this.state.Hersteller}
                        onChange={this.handleChange.bind(this)}
                        required
                      >
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
                  <input 
                     type="text" 
                     name="Beschreibung" 
                     className="beschreibunginput" 
                     id="Beschreibung"
                     value={this.state.Beschreibung}
                    onChange={this.handleChange.bind(this)}
                    required 
                  />
                  <br /><br />      
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

    handleChange(event) {
        const field = event.target.id;
        if (field === "Teilenummer") {
            this.setState({ Teilenummer: event.target.value });
        } else if (field === "SKU") {
            this.setState({ SKU: event.target.value });
        } else if (field === "Hersteller") {
            this.setState({ Hersteller: event.target.value });
        } else if (field === "Price") {
            this.setState({ Price: event.target.value });
        } else if (field === "Beschreibung") {
            this.setState({ Beschreibung: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ status: "Submit" });

        axios({
            method: "POST",
            url: "http://localhost:5000/api/teile/",
            headers: { 'Content-Type': 'application/json' },
            data: { 
                   Teilenummer: this.state.Teilenummer, 
                   SKU: this.state.SKU,
                   Hersteller: this.state.Hersteller,
                   Price: this.state.Price,
                   Beschreibung: this.state.Beschreibung 
                  }
            
        }).then((response, props) => {
            
            console.log(response);
            if (response.data.answer === this.state.answerOk) {
                
                this.setState({ Teilenummer: "", 
                                SKU: "", 
                                Hersteller: "",
                                Price: "",
                                Beschreibung: "",
                                status: "Logged in" })
                alert("Success");

                
           
            } else if (response.data.answer === this.state.answerDenied) {
                this.setState({ Teilenummer: "", 
                                SKU: "", 
                                Hersteller: "",
                                Price: "",
                                Beschreibung: "",
                                status: "Failed" })
                alert("Wrong Username or Password");
            }
        });
    
    }
}

export default New