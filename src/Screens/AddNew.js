import React, { Component } from 'react'
import axios from "axios"
import Sidebar from '../Components/Sidebar'
import Table from '../Components/Table'

import '../css/Global.css'
import '../css/AddNew.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class New extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Teilenummer: "",
            SKU: "",
            Hersteller: "",
            Preis: "",
            Beschreibung: "",
            answerOk: "Success",
            answerDenied: "Denied",
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
                        type="JSON" 
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
                    <label>
                    SKU: 
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
                        id="Preis" 
                        value={this.state.Preis}
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
                      <input 
                        list="manufacturers"
                        name="Hersteller" 
                        id="Hersteller" 
                        className="herstellerinput"
                        value={this.state.Hersteller}
                        onChange={this.handleChange.bind(this)}
                        required
                      >
                      </input>
                      <datalist id="manufacturers">
                          <option value="Volkswagen">Volkswagen</option>
                          <option value="Audi">Audi</option>
                          <option value="BMW">BMW</option>
                          <option value="Mercedes">Mercedes</option>
                          <option value="Opel">Opel</option>  
                      </datalist>
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

              <input  className="Eintragen-Button" type="submit" value="Anlegen "/>

                       <span id="response"></span>
                       <button className="exportieren" >Exportieren</button>

            </form>

        </div>

        <div id="box3" style={{overflow: "hidden"}}> 
            <div id="box4" style={{overflowY: "hidden"}}> 
             
                  
                   <Table />
                 

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
        } else if (field === "Preis") {
            this.setState({ Preis: event.target.value });
        } else if (field === "Beschreibung") {
            this.setState({ Beschreibung: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ status: "Submit" });

        axios({
            method: "POST",
            url: `${API_ENDPOINT}/api/bestand`,
            headers: { 'Content-Type': 'application/json' },
            data: { 
                   Teilenummer: this.state.Teilenummer, 
                   SKU: this.state.SKU,
                   Hersteller: this.state.Hersteller,
                   Preis: this.state.Preis,
                   Beschreibung: this.state.Beschreibung 
                  }
            
        }).then((response, props) => {
            
            console.log(response);
            if (response.data.answer === this.state.answerOk) {
                
                this.setState({ Teilenummer: "", 
                                SKU: "", 
                                Hersteller: "",
                                Preis: "",
                                Beschreibung: "" })
                console.log("Success");

                
           
            } else if (response.data.answer === this.state.answerDenied) {
                this.setState({ Teilenummer: "", 
                                SKU: "", 
                                Hersteller: "",
                                Preis: "",
                                Beschreibung: "" })
                alert("Failed adding articles");
            }
        });
    
    }
}

export default New