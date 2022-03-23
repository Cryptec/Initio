import React, { Component } from 'react'
import axios from "axios"
import { withRouter, Link } from 'react-router-dom'

import login from '../../utils'

import '../../css/logincss/loginbox.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Loginform extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            status: "Submit",
            answerOk: "Success",
            answerDenied: "Denied",
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

        let buttonText = this.state.status
        let errorMessage = this.state.errorMessage

        return (
            <div>
               
                <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="loginContent">
                    <div className="loginTextBox">
                         <span>
                             <br></br>
                             Hello!
                             <br></br>
                             Nice, to have you back!
                         </span>
                    </div>
                        <span style={{ fontWeight: "600"}}>Login</span>

                        <div className="textbox">

                    
                            <input
                                type='text'
                                className='form-group'
                                id="name"
                                value={this.state.email}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Useremail'
                            />
                      <br className="space"></br>
                            <input
                                type='password'
                                className='form-group'
                                id="password"
                                value={this.state.password}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Password'
                            />
                        
                        </div>

                        <Link to="/forgot" style={{fontSize: "0.8rem", textDecoration: "none", color: "white"}}> forgot your password? </Link>
                        
                        
                        {this.state.isActive ? <p className="errorTextLogin">{errorMessage}</p> : null}
                        

                    </div>
   
                    <button className="loginButton">{buttonText}</button>

                </form>
              
            </div>

        )
    }

    handleChange(event) {
        const field = event.target.id;
        if (field === "name") {
            this.setState({ email: event.target.value });
        } else if (field === "password") {
            this.setState({ password: event.target.value });
        }
    }

    handleLogin = () => {
        login();
        this.props.history.push('/')
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ status: "Submit" });

        axios({
            method: "POST",
            withCredentials: true,
            credentials: 'include',
            url: `${API_ENDPOINT}/api/login`,
            headers: { 'Content-Type': 'application/json' },
            data: { username: this.state.email, password: this.state.password}
            
        }).then((response, props) => {
            
            console.log(response);
            if (response.data.success) {
                localStorage.setItem("userName", response.data.name);
                localStorage.setItem("emailAddress", response.data.email);
                this.setState({ email: "", password: "", status: "Logged in" })
                this.handleLogin()
                console.log("Login Success");

            } else if (response.data.answer === "UserError") {
                this.setState({ password: "", status: "Logging in" });
                this.setState({ errorMessage: "User not found!" });
                this.setState({ status: "Submit" });
                this.handleShow()
                console.log("User not found!");
            
            } else if (response.data.answer === "PassError") {
                this.setState({ password: "", status: "Logging in" });
                this.setState({ errorMessage: "Wrong Password!" });
                this.setState({ status: "Submit" });
                this.handleShow()
                console.log("Wrong Password!");
            
            } else if (response.data.answer === this.state.answerDenied) {
                this.setState({ password: "", status: "Logging in" });
                this.setState({ errorMessage: "Wrong Username or Password" });
                this.setState({ status: "Submit" });
                this.handleShow()
                console.log("Wrong Username or Password");

            }
        });
    }
}

export default withRouter(Loginform);