import React, { Component } from 'react'
import axios from "axios"

import '../../css/logincss/loginbox.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Registerbox extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            password: "",
            email:"",
            confirm_password:"",
            status: "Submit",
            errorMessage: "",
            isActive: false
        };
    }

    handleShow = () =>{
        this.setState({
            isActive: true
        })
    }

    render() {

        let buttonText = this.state.regstatus
        let errorMessage = this.state.errorMessage

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
                                value={this.state.name}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Username*'
                            />
                       
             
                            <input
                                type='text'
                                className='form-group-register'
                                id="regemail"
                                value={this.state.email}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Enter your email*'
                            />
                   
                            <input
                                type='password'
                                className='form-group-register'
                                id="regpassword"
                                value={this.state.password}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Password*'
                            />
               
                            <input
                                type='password'
                                className='form-group-register'
                                id="regconfirm_password"
                                value={this.state.confirm_password}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Confirm password*'
                            />
                       </div>
 
                        <div>
                        {this.state.isActive ? <p className="errorText">{errorMessage}</p>  : null }
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
            this.setState({ name: event.target.value });
        } else if (field === "regemail") {
            this.setState({ email: event.target.value });
        } else if (field === "regpassword") {
            this.setState({ password: event.target.value });
        } else if (field === "regconfirm_password") {
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
            this.setState({ errorMessage: "The passwords doesn't match" });
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
                console.log("Form sent");
   
            } else if (response.data.answer === "password_too_short") {
                console.log("Password length must be at least 4 characters long");
                this.setState({ errorMessage: "Password length must be at least 4 characters long" });
                this.setState({ status: "Submit" });
                this.handleShow()

            } else if (response.data.answer === "Name_Excist") {
                console.log("Username already exist");
                this.handleShow()

            } else if (response.data.answer === "Email_Excist") {
                console.log("There is already an account with this email");
                this.handleShow()
        }
            
        });
    }
}

export default Registerbox