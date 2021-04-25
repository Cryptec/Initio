import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';

import ForgotPassword from './ForgotPassword'

import '../../../css/logincss/forgotbox.css'


class ForgotBox extends Component {


    render () {

       
        return(
          <div className="forgotbox">
                
                    <Tabs>

                        <TabList>
                        <div>
                            <Tab className="orderButton" type="submit"> Order key </Tab>
                            <Link to='/login' className="setNewButton">Back</Link>
                        </div>
                        </TabList>
                        
                        <TabPanel>
                            <ForgotPassword/>
                        </TabPanel>
                      
                    </Tabs>
          </div>
          
        )
    }
    
}

export default ForgotBox