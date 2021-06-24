import {Image, Button, ButtonGroup} from 'react-bootstrap';
import Mdo_modal from './mdoModal.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './emblem.svg';
import home from './noun_Home_4011777.png'
import server from './noun_Server Stack_4002291.png'
import vr from './noun_vr_3346683.png'
import profile from './noun_profile_1201734.png'
import mic from './noun_mic_2216876.png'
import sound from './noun_Speaker_151918.png'
import quick from './noun_Wrench_4008323.png'
import setting from './noun_setting_3077851.png'

import './App.css';

function alertClicked() {
  alert('You clicked the third ListGroupItem');
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" width={95} align="right" alt="logo" />
        <p>Mondradiko</p>
      </header>

      <div id="mySidenav" class="sidenav">     
        <ButtonGroup vertical>
          <Button variant="outline-success"><Image width={95} align={"left"} src={home} rounded />Home</Button>{' '}
          <Button variant="outline-success"><Image width={95} align={"left"} src={server} rounded />Server Browser</Button>{' '}
          <Button variant="outline-success"><Image width={95} align={"left"} src={profile} rounded />Profiles</Button>{' '}
          <Button variant="outline-success"><Image width={95} align={"left"} src={setting} rounded />Settings</Button>{' '}
        </ButtonGroup>

        <Mdo_modal />
      </div>


      <main>
        <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://github.com/mondradiko"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn XR
          </a>
        </main>
    </div>
  );
}

export default App;
