import React, { Component } from 'react';
import axios from "axios";
import { withRouter, Link } from 'react-router-dom';

import ForgotWindow from '../../Screens/Forgot';
import login from '../../utils';

import '../../css/logincss/loginbox.css';


class Loginform extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            password: "",
            status: "Submit",
            answerOk: "Success",
            answerDenied: "Denied"
        };
    }

    render() {

        let buttonText = this.state.status;
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
                                value={this.state.name}
                                onChange={this.handleChange.bind(this)}
                                required
                                placeholder=' Username'
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
                        <Link to="/forgot" onClick={() => ForgotWindow()} style={{fontSize: "0.8rem", textDecoration: "none", color: "white"}}> forgot password? </Link>

                    </div>
   
                    <button className="loginButton">{buttonText}</button>

                </form>
              
            </div>

        )
    }

    handleChange(event) {
        const field = event.target.id;
        if (field === "name") {
            this.setState({ name: event.target.value });
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
            url: "https://rust.mneubauer.com/login",
            headers: { 'Content-Type': 'application/json' },
            data: { name: this.state.name, password: this.state.password }
            
        }).then((response, props) => {
            
            console.log(response);
            if (response.data.answer === this.state.answerOk) {
                
                this.setState({ name: "", password: "", status: "Logged in" })
                this.handleLogin()
                alert("Login Success");

                
           
            } else if (response.data.answer === this.state.answerDenied) {
                this.setState({ password: "", status: "Logging in" });
                alert("Wrong Username or Password");
            }
        });
    
    }
}
//export default Loginform
export default withRouter(Loginform);