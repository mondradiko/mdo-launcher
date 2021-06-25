import { Component } from 'react';
import { Modal, Button, ButtonGroup, DropdownButton, Image, Dropdown } from 'react-bootstrap';
import home from './noun_Home_4011777.png'
import server from './noun_Server Stack_4002291.png'
import vr from './noun_vr_3346683.png'
import profile from './noun_profile_1201734.png'
import mic from './noun_mic_2216876.png'
import sound from './noun_Speaker_151918.png'
import quick from './noun_Wrench_4008323.png'
import setting from './noun_setting_3077851.png'
import 'bootstrap/dist/css/bootstrap.min.css';

class Mdo_modal extends Component {
    constructor(props){
        super(props)
        this.state = {
            visibility: false,
            titleIcon: quick
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleShow = () => {
        this.setState({visibility: true})
    }

    handleClose = () => {
        this.setState({visibility: false})
    }

    //HANDLE SHOW needs to pass contextual properties to the modal, mostly title, text, and what the setting is aimed at.
    //This is the next todo

  render(){
    return (
        <div>
        <DropdownButton as={ButtonGroup} title="Quick Settings" id="bg-vertical-dropdown-1">
          <Dropdown.Item href="#/action-1" onClick={() => this.handleShow()}><Image width={75}  src={profile} rounded />Playing As</Dropdown.Item>
            <Dropdown.Item href="#/action-2"onClick={() => this.handleShow()}><Image width={75} src={vr} rounded />Display Output</Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={() => this.handleShow()}><Image width={75} src={sound} rounded />Audio Output</Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={() => this.handleShow()}><Image width={75} src={mic} rounded />Audio Input</Dropdown.Item>
          </DropdownButton>

        <Modal show={this.state.visibility} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
            <Modal.Title><Image src={this.state.titleIcon} width={55} align={"center"} /></Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <DropdownButton as={ButtonGroup} title="Input" id="bg-vertical-dropdown-1">
                <Dropdown.Item href="#/action-1" onClick={() => this.handleShow()}><Image width={75}  src={profile} rounded />Playing As</Dropdown.Item>
                <Dropdown.Item href="#/action-2"onClick={() => this.handleShow()}><Image width={75} src={vr} rounded />Display Output</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={() => this.handleShow()}><Image width={75} src={sound} rounded />Audio Output</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={() => this.handleShow()}><Image width={75} src={mic} rounded />Audio Input</Dropdown.Item>
          </DropdownButton>

            <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
                Close
            </Button>
            <Button variant="primary" onClick={() => this.handleClose()}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
  }
}

export default Mdo_modal;