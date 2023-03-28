import React, { Component } from 'react'
import axios from "axios"
import Sidebar from '../../Components/Sidebar'
import StaticBar from './Sidebar-Static'
import Userstable from '../../Components/Userstable'

import '../../css/Global.css'
import '../../css/Usersettings.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

class Usersettings extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            password: "",
            email:"",
            confirm_password:"",
            count: 0
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

               <form onSubmit={this.handleSubmit.bind(this)} method="POST">
        
                            <div className="Userinput">
                            <label>
                            Username:
                            <br />
                            <input
                                type='text'
                                className='inAppInput'
                                id="name"
                                value={this.state.name}
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
                                id="email"
                                value={this.state.email}
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
                                id="password"
                                value={this.state.password}
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
                                id="confirm_password"
                                value={this.state.confirm_password}
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            </label>
                            </div>
                              <input className="Add-Button" type="submit" value="Anlegen " />      
                </form>
            
</div>
<div id="box3"> 

  <div id="userTable"> 

    <div className="table" id="tblData">
                <div className="tblhead" >
                  
                   <Userstable key={this.state.count} />

                </div>
                 
               </div>
        

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
        if (field === "name") {
            this.setState({ name: event.target.value });
        } else if (field === "email") {
            this.setState({ email: event.target.value });
        } else if (field === "password") {
            this.setState({ password: event.target.value });
        } else if (field === "confirm_password") {
            this.setState({ confirm_password: event.target.value });
        }
    }
    handleConfirmPassword = (event) => {
        if (event.target.value !== this.state.password) {
            console.log('error');
            this.setState({ confirm_password: event.target.value })
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirm_password) {
            console.log("The passwords doesn't match")
            return false; // The form won't submit
        }
        else  
        this.setState({ status: "Submitting" });
        
        axios({
            method: "POST",
            url: `${API_ENDPOINT}/api/register`,
            headers: { 'Content-Type': 'application/json' },
            data: { name: this.state.name, password: this.state.password, email: this.state.email }

        }).then((response) => {
            if (response.data.answer === "successfully_registered") {
                this.setState({ name: "", password: "", confirm_password: "", email: "", status: "Submitted" });
                this.setState({ count: this.state.count + 1 })
                console.log("User registration sent");

            } else if (response.data.answer === "Denied") {
                console.log("Wrong Username or Password");
                
            } else if (response.data.answer === "Name_Excist") {
                console.log("Username already exist");

            } else if (response.data.answer === "Email_Excist") {
                console.log("There is already an account with this email");
        }
            
        });
    }
}

export default Usersettings;