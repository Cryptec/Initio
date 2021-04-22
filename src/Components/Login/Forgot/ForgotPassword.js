import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

import LoginWindow from '../../../Screens/Login'

import '../../../css/logincss/forgotbox.css'


class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email:"",
            password: "",
            confirm_password:"",
            status: "Request email"
        };
    }

    render() {

        let buttonText = this.state.status;
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="orderContent">
                        <span style={{ fontWeight: "600" }}>Forgot your password?</span>

                        <Link to="/login" onClick={() => LoginWindow()} style={{fontSize:"1.5rem", textDecoration:"none", right: "30px", top: "20px", color:"white", position:"absolute"}}> &#x2716; </Link>

                        <br></br>
                        
                        <div>
                        
                            <input
                                type='text'
                                className='form-group-register'
                                id="email"
                                value={this.state.email}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Enter your email*'
                            />
                        <br></br>
                        <input
                                label="Enter your new password:"
                                type='password'
                                className='form-group-register'
                                id="new_pass"
                                value={this.state.password}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' set new password*'
                            />
                  
                            <input
                                label="Confirm your new password:"
                                type='password'
                                className='form-group-register'
                                id="new_pass_re"
                                value={this.state.confirm_password}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' retype new password*'
                            />
                        </div> 
                        </div>
                        <button className="orderButton">{buttonText}</button>

                </form>
            </div>

        )
    }

    handleChange(event) {
        const field = event.target.id;
        if (field === "email") {
            this.setState({ email: event.target.value });
        } else if (field === "new_pass") {
            this.setState({ password: event.target.value });
        } else if (field === "new_pass_re") {
            this.setState({ confirm_password: event.target.value });
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirm_password) {
            alert("The passwords doesn't match")
            return false; // The form won't submit
        }
        else  
        
        this.setState({ status: "Requesting..." });

        axios({
            method: "POST",
            url: "https://rust.mneubauer.com/forgot_password",
            headers: { 'Content-Type': 'application/json' },
            data: { email: this.state.email, password: this.state.password }

        }).then((response) => {
            if (response.data.answer === "Success") {
                this.setState({ email: "", password: "", confirm_password: "", status: "Submit" });
                alert("Request sent");
            } else if (response.data.status === "failed") {
                alert("Request Failed");
            }
        });
    }
}

export default ForgotPassword