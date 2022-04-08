import React, { Component } from 'react'
import { userName } from '../utils'

import '../css/Global.css'


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
        }
    }

async componentDidMount() {
    await this.setState({user: userName()});
}

render() {

    const activeUser = this.state.user || 'Guest'

    return (
    <div>
              
        <div className="box-wrapper"> 
         <div id="background">
          <div style={styles.welcome}>
            Willkommen, {activeUser}!
          </div>
         </div> 
        </div>
          
    </div>
        );
    }
}

const styles = {};

styles.welcome = {
    color: 'white',
    fontSize: '20px',
    margin: '15px',
    fontFamily: 'Arial, Helvetica, sans-serif',
}



export default Home;