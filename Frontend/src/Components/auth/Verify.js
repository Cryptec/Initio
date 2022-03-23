import React, { Component } from 'react';
import axios from "axios";


import '../../css/loginbox.css';


class Verify extends Component {


render() {
        

let search = window.location.search;
let params = new URLSearchParams(search);
let foo = params.get('token');
let foo2 = params.get('token-forget');
if (foo!=null || foo2!=null){

if (foo!=null){
//funktion auslösen
this.handleSubmit(foo,true);
}

if (foo2!=null){
//funktion auslösen
this.handleSubmit(foo2,false);
}

        
        return (
            <div>

                <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="redirectContent">
                      
                             Success! 
                         
                             ...Redirect...
                       

                        <div className="textbox">


                    

                        </div>

                    </div>


                </form>

            </div>

        )
    }

else{
    //Darstellung wenn kein key als parameter mit gegeben wird
    return (
        <div>

            <form onSubmit={this.handleSubmit.bind(this)} method="POST">
            
                    <div className="redirectContent">
                  
                   
                         no access to this page!
                   
               
                    </div>

            </form>

        </div>

    )
}
}


handleSubmit(foo,registration){
    
    alert("Eingabe: " + foo + " wird weiter geleitet!");
    axios({
        method: "POST",
        url: "https://rust.mneubauer.com/verify",
        headers: { 'Content-Type': 'application/json' },
        data: { token: foo, registration: registration }

    }).then((response) => {
        if (response.data.answer === "Success") {
           
            }
        })

    setTimeout(function(){ window.location.replace("/login"); }, 3000);
    }
}

export default Verify