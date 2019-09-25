import React, { Component } from 'react';
import '../../Resources/styles/style.scss';
import {  Menu, Icon, Sidebar, Button, Responsive } from 'semantic-ui-react';

import {  withRouter } from 'react-router';
import { BrowserRouter as Router, Link } from 'react-router-dom';


var qs = require('query-string');


class Header extends React.Component {

  constructor(props) {
    super(props);

  }


  state = {
    status: {
      activeBar: this.props.active,
    },
    visible: false
  }

  toggle = () => {
    //console.log(this.state.visible);
    this.setState({ visible: false });
  }

  toggleSide = () => {
    //console.log(this.state.visible);
    this.setState({ visible: !this.state.visible });

  }

  render() {

    var activeBar = this.state.status.activeBar;
    const { visible } = this.state;
    console.log(this.state.visible);

    return (

      <div className="head">
        <Responsive as={Menu} style={{color:'white'}} minWidth={60} className="nav" secondary >
          <Menu.Item style={{ 'width': '20%' , color:'white'}} header as="h3">Penbox.io</Menu.Item>


          <Menu.Menu  position="right">
            <Menu.Item name="login" style={{color:'white'}}  as={Link} to="/login" active={activeBar === 'login'} />
            <Menu.Item name="Signup" style={{color:'white'}}  as={Link} to="/signup" active={activeBar === 'signup'} />
          </Menu.Menu>
        </Responsive>


        <Responsive as={Sidebar.Pushable} maxWidth={59}>
          <Sidebar as={Menu}
            animation="overlay"
            onHide={this.toggle}
            visible={visible}
            width="wide"
            vertical>

            <Menu.Item name="Games" icon="gamepad" as={Link} to="/" />
            <Menu.Item name="Games" icon="gamepad" />

            <Button primary onClick={this.toggleSide}>CLICK ME</Button>
          </Sidebar>
          <Sidebar.Pusher>

            <Menu secondary className="no-radius" >
              <Menu.Item><Icon name="align justify" size="big" onClick={this.toggleSide} /></Menu.Item>
              <Menu.Menu >
                <Menu.Item header as="h2" name="APPSOLIT">Appsolit</Menu.Item>
              </Menu.Menu>

            </Menu>
            {this.props.children}
          </Sidebar.Pusher>
        </Responsive>

      </div>




    )
  }

}



export default withRouter(Header);






