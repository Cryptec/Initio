import React, { Component } from 'react';
import axios from "axios";

import '../../css/logincss/loginbox.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Registerbox extends Component {
    constructor() {
        super();
        this.state = {
            regname: "",
            regpassword: "",
            regemail:"",
            regconfirm_password:"",
            regstatus: "Submit"
        };
    }

    render() {

        let buttonText = this.state.regstatus;
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="registerContent">
                        <span style={{ fontWeight: "600" }}>Register</span>
        
                            <div className="textbox">
                        
                            <input
                                type='text'
                                className='form-group-register'
                                id="regname"
                                value={this.state.regname}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Username*'
                            />
                       
             
                            <input
                                type='text'
                                className='form-group-register'
                                id="regemail"
                                value={this.state.regemail}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Enter your email*'
                            />
                   
                            <input
                                type='password'
                                className='form-group-register'
                                id="regpassword"
                                value={this.state.regpassword}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Password*'
                            />
               
                            <input
                                type='password'
                                className='form-group-register'
                                id="regconfirm_password"
                                value={this.state.regconfirm_password}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Confirm password*'
                            />
                       </div>
                    
                       </div>
                        
                    
  
                    <button className="registerButton">{buttonText}</button>

                </form>

            </div>

        )
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
            console.log('error');
            this.setState({ regconfirm_password: event.target.value })
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.regpassword !== this.state.regconfirm_password) {
            console.log("The passwords doesn't match")
            return false; // The form won't submit
        }
        else  
    
        this.setState({ status: "Submitting" });
        
        axios({
            method: "POST",
            url: `${API_ENDPOINT}/api/register`,
            headers: { 'Content-Type': 'application/json' },
            data: { regname: this.state.regname, regpassword: this.state.regpassword, regemail: this.state.regemail }

        }).then((response) => {
            if (response.data.answer === "Success") {
                this.setState({ regname: "", regpassword: "", regconfirm_password: "", regemail: "", regstatus: "Submitted" });
                console.log("Form sent");

            } else if (response.data.answer === "Denied") {
                console.log("Wrong Username or Password");
                
            } else if (response.data.answer === "password_too_short") {
                console.log("Password length must be at least 4 characters long");

            } else if (response.data.answer === "Name_Excist") {
                console.log("Username already exist");

            } else if (response.data.answer === "Email_Excist") {
                console.log("There is already an account with this email");
        }
            
        });
    }
}

export default Registerbox