import React, { Component } from 'react'
import axios from "axios"
import Sidebar from '../../Components/Sidebar'
import StaticBar from './Sidebar-Static'
import Userstable from '../../Components/Userstable'

import '../../css/Global.css'
import '../../css/Settings.css'
import '../../css/Usersettings.css'



class Usersettings extends Component {
    constructor() {
        super();
        this.state = {
            regname: "",
            regpassword: "",
            regemail:"",
            regconfirm_password:"",
        };
    }

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

              <h3>User settings:</h3>
               <text>Add new user: </text>

               <form onSubmit={this.handleSubmit.bind(this)} method="POST">
        
                        <div className="textbox">
                            <div className="Userinput">
                            <label>
                            Username:
                            <br />
                            <input
                                type='text'
                                className='inAppInput'
                                id="regname"
                                value={this.state.regname}
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <br /><br />
                            </label>
                            </div>

                            <div className="Emailinput">
                            <label>
                            email:
                            <br />
                            <input
                                type='text'
                                className='inAppInput'
                                id="regemail"
                                value={this.state.regemail}
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <br /><br />
                            </label>
                            </div>
                            
                            <div className="Passwordinput">
                            <label>
                            Password:
                            <br />
                            <input
                                type='password'
                                className='inAppInput'
                                id="regpassword"
                                value={this.state.regpassword}
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <br /><br />
                            </label>
                            </div>
               
                            <div className="Secondpasswordinput">
                            <label>
                            retype password:
                            <br />
                            <input
                                type='password'
                                className='inAppInput'
                                id="regconfirm_password"
                                value={this.state.regconfirm_password}
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <br /><br />
                            </label>
                            </div>
                              <input className="Eintragen-Button" type="submit" value="Anlegen " />
                       </div>
                </form>
            
</div>
<div id="box3"> 

  <div id="connection">

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
        );
    }

    handleChange(event) {
        const field = event.target.id;
        if (field === "regname") {
            this.setState({ regname: event.target.value });
        } else if (field === "regemail") {
            this.setState({ regemail: event.target.value });
        } else if (field === "regpassword") {
            this.setState({ regpassword: event.target.value });
        } else if (field === "regconfirm_password") {
            this.setState({ regconfirm_password: event.target.value });
        }
    }
    handleConfirmPassword = (event) => {
        if (event.target.value !== this.state.regpassword) {
            alert('error');
            this.setState({ regconfirm_password: event.target.value })
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.regpassword !== this.state.regconfirm_password) {
            alert("The passwords doesn't match")
            return false; // The form won't submit
        }
        else  
    
        this.setState({ status: "Submitting" });
        
        axios({
            method: "POST",
            url: "http://localhost:5000/api/register",
            headers: { 'Content-Type': 'application/json' },
            data: { regname: this.state.regname, regpassword: this.state.regpassword, regemail: this.state.regemail }

        }).then((response) => {
            if (response.data.answer === "Success") {
                this.setState({ regname: "", regpassword: "", regconfirm_password: "", regemail: "", regstatus: "Submitted" });
                alert("Form sent");

            } else if (response.data.answer === "Denied") {
                alert("Wrong Username or Password");
                
            } else if (response.data.answer === "Name_Excist") {
                alert("Username already exist");

            } else if (response.data.answer === "Email_Excist") {
                alert("There is already an account with this email");
        }
            
        });
    }
}

export default Usersettings;