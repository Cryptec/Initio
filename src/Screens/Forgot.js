import { Component } from 'react';
import ForgotBox from '../Components/Login/Forgot/Forgotbox'
import WindowButtons from '../Components/WindowButtons';


class ForgotWindow extends Component {
  
  render() {
  return (
    <div>
      <WindowButtons />
      <header className="App-header">

        <ForgotBox />

      </header>
    </div>
  );
}}

export default ForgotWindow;