import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

import '../../../css/logincss/forgotbox.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email:"",
            password: "",
            confirm_password:"",
            status: "Request email",
            message: '',
            isActiveError: false,
            isActiveSuccess: false
        };
    }

    handleShowSuccess = () => {
        this.setState({
            isActiveSuccess: true,
            isActiveError: false
        })
    }


    handleShowError = () => {
        this.setState({
            isActiveSuccess: false,
            isActiveError: true
        })
    }

    render() {

        let buttonText = this.state.status
        let message = this.state.message

        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="orderContent">
                        <span style={{ fontWeight: "600" }}>Forgot your password?</span>

                        <Link to="/login" style={{fontSize:"1.5rem", textDecoration:"none", right: "30px", top: "20px", color:"white", position:"absolute"}}> &#x2716; </Link>

                        <br></br>
                        
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}
>
                        
                            <input
                                type='text'
                                className='form-group-register'
                                id="email"
                                value={this.state.email}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Enter your email*'
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {this.state.isActiveError ? <p className="errorTextLogin" style={{display: 'flex', justifyContent: 'center'}}>{message}</p> : null} 
                        {this.state.isActiveSuccess ? <p className="successTextLogin" style={{ display: 'flex', justifyContent: 'center' }}>{message}</p> : null} 
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
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        axios({
            method: "POST",
            withCredentials: true,
            credentials: 'include',
            url: `${API_ENDPOINT}/api/forgot`,
            headers: { 'Content-Type': 'application/json' },
            data: { email: this.state.email }

        }).then((response, props) => {
            console.log(response)
            if (response.data.success) {
                this.setState({ email: "", message: "An email was sent to you!" })
                this.handleShowSuccess()
                console.log("Success");
            } else if (response.data.answer === "UserError") {
                this.setState({ password: "", message: "Email don´t exist!" });
                this.handleShowError()
                console.log("Email not found!");

            }
        });
    }
}

export default ForgotPassword