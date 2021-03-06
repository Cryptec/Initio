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
            regname: "",
            regpassword: "",
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
                                value={this.state.regname}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Username'
                            />
                      <br className="space"></br>
                            <input
                                type='password'
                                className='form-group'
                                id="password"
                                value={this.state.regpassword}
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
            this.setState({ regname: event.target.value });
        } else if (field === "password") {
            this.setState({ regpassword: event.target.value });
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
            url: `${API_ENDPOINT}/api/login`,
            headers: { 'Content-Type': 'application/json' },
            data: { regname: this.state.regname, regpassword: this.state.regpassword}
            
        }).then((response, props) => {
            
            console.log(response);
            if (response.data.answer === this.state.answerOk) {
                
                this.setState({ regname: "", regpassword: "", status: "Logged in" })
                this.handleLogin()
                console.log("Login Success");

            } else if (response.data.answer === "UserError") {
                this.setState({ regpassword: "", status: "Logging in" });
                this.setState({ errorMessage: "User not found!" });
                this.setState({ status: "Submit" });
                this.handleShow()
                console.log("User not found!");
            
            } else if (response.data.answer === "PassError") {
                this.setState({ regpassword: "", status: "Logging in" });
                this.setState({ errorMessage: "Wrong Password!" });
                this.setState({ status: "Submit" });
                this.handleShow()
                console.log("Wrong Password!");
            
            } else if (response.data.answer === this.state.answerDenied) {
                this.setState({ regpassword: "", status: "Logging in" });
                this.setState({ errorMessage: "Wrong Username or Password" });
                this.setState({ status: "Submit" });
                this.handleShow()
                console.log("Wrong Username or Password");

            }
        });
    }
}

export default withRouter(Loginform);