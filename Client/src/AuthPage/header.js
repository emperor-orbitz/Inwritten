import React from 'react';
import '../../Resources/styles/style.scss';
import {  Menu, Icon, Sidebar, Button, Responsive } from 'semantic-ui-react';
import {  withRouter } from 'react-router';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import logo from "../../Resources/images/logo-page.png"


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

  toggle = () => this.setState({ visible: false })

  toggleSide = () =>  this.setState({ visible: !this.state.visible })



  render() {

    var activeBar = this.state.status.activeBar;
    const { visible } = this.state;

    return (

      <div className="head">
        <Responsive as={Menu} style={{color:'white'}} minWidth={60} className="nav" secondary >
          <Menu.Item style={{ 'width': '50%' , color:'black'}} header ><a href='/'><img src={logo} style={{ width:"130px", height:"50px" }}/></a></Menu.Item>

          <Menu.Menu  position="right">
            <Menu.Item name="login" style={{color:'black'}}  as={Link} to="/login" active={activeBar === 'login'} />
            <Menu.Item name="Signup" style={{color:'black'}}  as={Link} to="/signup" active={activeBar === 'signup'} />
          </Menu.Menu>
        </Responsive>

        <Responsive as={Sidebar.Pushable} maxWidth={59}>
         
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






