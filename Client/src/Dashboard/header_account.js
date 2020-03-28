import React, { } from 'react';
import '../../Resources/styles/style.scss';
import { Menu, Icon, Sidebar, Modal, Button, Responsive, Accordion, Dropdown, Divider, MenuItem, MenuHeader, DropdownDivider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Link from 'react-router-dom/Link';
import FetchArticles from '../../Controllers/article.controller';
import Connection from '../../Controllers/auth.controller';
import socketIOClient from 'socket.io-client';

import SideBar from '../../src/Dashboard/sidebar';
import double_u from '../../Resources/images/double-u.png';
import logo from "../../Resources/images/logo-page.png"

class HeaderAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBar: this.props.active,
      visible: false,
      activeAccordion: 0,
      open: false,
      pageTitle: '',
      email_variable: '',
      loadFinish: false,
      new_notification:""

    }
    // realtime notification socket  
   


  }

  connect = new Connection();
  fetchArticle = new FetchArticles();



  UNSAFE_componentWillReceiveProps() {
    //push sideBAR back IN TWEAK
    if (this.state.visible == true) this.setState({ visible: false });
    else;

  }
  componentWillMount() {
    
}

 
  componentDidMount() {

    let token = localStorage.getItem("hs_token");

    if (Object.keys(this.props.ProfileReducer).length == 0) {
      this.connect.isLoggedin(token)
        .then(_ => {

          //SUBSCRIBE TO SOCKET
         let socket = socketIOClient("https://www.inwritten.com", {query:`userid=${_._id}`})
          socket.on("new_notification", _ =>{
            this.setState({ new_notification:"You have a new notification" })
            alert("You have a new notification! Check notifications")
    
        })
        

          //POPULATE PROFILE REDUCER & ARTICLE REDUCER
          this.props.dispatch({ type: 'INJECT_PROFILE', payload: _ })
          this.fetchArticle.fetch_articles_list().then(articles => {

            if (articles.length > 0) {
              this.props.dispatch({ type: 'OVERWRITE_ARTICLE', payload: articles })
              this.setState({ loadFinish: true })

            }
            else
              this.setState({ loadFinish: true });



          }).catch(e => this.setState({ loadFinish: true }))

        })
        .catch(err => this.props.history.replace('/app/login'))

    }


    else {
      /*
      *JUST RENDER
      *Remove the loader
      */
      // this.setState({ loadFinish: true });

      this.connect.isLoggedin(token)
        .then(_ => {
          this.setState({ loadFinish: true })


        })
        .catch(err => this.props.history.replace('/app/login'))


    }



  }


  toggle = () => {
    this.setState({ visible: false });
  }

  toggleSide = () => {
    this.setState({ visible: !this.state.visible });

  }

  showModal = () => this.setState({ open: true })
  close = () => this.setState({ open: false })


  handleClick = (e, titleProps) => {

    var { index } = titleProps;
    var { activeAccordion } = this.state;
    var newIndex = (activeAccordion === index) ? -1 : index;

    this.setState({ activeAccordion: newIndex });

  }


  logout=() => {


    localStorage.removeItem("hs_token");
    this.props.history.replace('/app/login');
    this.props =null;


  }



  render() {
    var side = new SideBar();
    var { articleSubmenu, categorySubmenu } = side.subMenu;
    const { visible } = this.state;
    var { activeAccordion } = this.state;

    //PAGE NAME    
    var xx = this.props.location.pathname.lastIndexOf('/');
    var xx_page = (xx === 0) ? this.props.location.pathname.slice(1) : this.props.location.pathname.slice(1, xx);



    var { open } = this.state;


    if (this.state.loadFinish == true) {
      return (

        <div className="head">

          <div className="sideBar">

              <Modal size="mini" open={open} onClose={this.close} closeOnDimmerClick>
                <Modal.Header>LOGOUT</Modal.Header>
                <Modal.Content>
                  <p style={{ color: 'black' }}>Are you sure you want to log out?<br /> There's still a lot to write about!</p>
                </Modal.Content>
                <Modal.Actions>
               {/*   <Button onClick={() => {
                    this.setState({ open: false })
                  }} >Nope</Button>*/}
                  <Button onClick={this.logout} icon='sign out' labelPosition='right' content='Exit' />
                </Modal.Actions>
              </Modal>
            

            <Sidebar.Pushable>
            <Responsive as={Menu} minWidth={300} className="nav" secondary style={{ fontSize:"12px"}}   >
            <Menu.Item icon="bars" onClick={this.toggleSide} size="big" />
            <Menu.Item header ><img src={double_u} style={{ width:"60px", height:"60px" }}/> </Menu.Item>


            <Menu.Menu position="right"  >
              <Menu.Item as={Link} to="/app/add-post" icon="compose" content="Write a story"/>
              <Menu.Item text={`@${this.props.ProfileReducer.username}`} as={Dropdown} floating >

                <Dropdown.Menu>
                  <Dropdown.Item icon='dashboard' text='Dashboard' as={Link} to='/app/dashboard' />
                  <Dropdown.Item icon='bell' text='Notifications' as={Link} to='/app/notification' style={{color: 'green'}} />

                  <DropdownDivider  />

                  <Dropdown.Item icon='bookmark outline' text='Bookmarks' as={Link} to='/app/bookmark' />
                  <Dropdown.Item icon='folder outline' text='Published Stories' as={Link} to='/app/articles' />
                  <Dropdown.Item icon='box' text='Drafts' as={Link} to='/app/drafts' />
                    <DropdownDivider />

                  <Dropdown.Item icon='user' text='Profile' as={Link} to='/app/settings/profile' />
                  <Dropdown.Item icon='block layout' text='Templates' as={Link} to='/app/settings/templates' />
                  
                  <DropdownDivider/>


                  <Dropdown.Item icon='help' text='Docs' />
                  <Dropdown.Item color="red" onClick={this.showModal} as={Button} fluid icon='sign out' text='logout ' />
                </Dropdown.Menu>
              </Menu.Item>

            </Menu.Menu>
          </Responsive>

              <Sidebar as={Accordion}
                animation="push"
                
                onHide={this.toggle}
                visible={visible}
                vertical='true'
                className='sidebar'>

                <div style={{ textAlign: 'center', padding: '10px 2px',  color: 'rgb(3, 68, 94)', background: 'white' }} >
                  <Link to="/app/dashboard" style={{ color: "black" }}> <img src={logo} style={{ width:"165px", height:"75px" }}/></Link>
                  <br/>
                  <h4>{`${this.props.ProfileReducer.email}`}</h4>
                  
                </div>
             
    


                <div className="accordion-item">
                  <Accordion.Title active={true} style={{ padding: '5px 20px' }} index={3} onClick={this.handleClick}>
                     <span style={{fontSize:"14px",color:"black"}}>INTERESTS</span>
                     <Divider />
                  </Accordion.Title>
                  <Accordion.Content style={{ padding: '1px 20px', }} className="accordion-content" active={true} content={categorySubmenu} />

                </div>

                {/* UNTIL SECOND VERSION RELEASE
                <div className="accordion-item">
                  <Accordion.Title active={true} style={{ padding: '5px 20px' }} index={4} onClick={this.handleClick}>
                     <span style={{fontSize:"14px",color:"black"}}>SOCIALS</span>

                     <Divider />
                  </Accordion.Title>
                  <Accordion.Content style={{ padding: '1px 20px', }} className="accordion-content" active={true} content={settingsSubmenu} />

                </div>
                */}

                <div className="accordion-item">
                  <Button as={Link} to="/about_us" fluid style={{ color: 'black', background:"white" }}>
                    <Icon name="info" />
                    THE APP
                  </Button>

                </div>

              </Sidebar>
              <Sidebar.Pusher>



                {this.props.children}



              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>



        </div>




      )

    }
    else {

      return (<div className='splashscreen'>

        <img src={double_u} className='splash' />
        <p>INWRITTEN</p>
        <h5>Loading your contents in a bit... </h5>
      </div>)
    }


  }

}


const mapStateToProps = (state) => {
  return state;
}


HeaderAccount.T = {
  state: Object
};
export default withRouter(connect(mapStateToProps)(HeaderAccount));






