import React, { } from 'react';
import '../../Resources/styles/style.scss';
import { Menu, Icon,  Sidebar, Modal, Button, Responsive, Accordion, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Link from 'react-router-dom/Link';
import FetchArticles from '../../Controllers/article.controller';
import Connection from '../../Controllers/auth.controller';

import SideBar from '../../src/Dashboard/sidebar';
import splash from '../../Resources/images/splash.png';




class HeaderAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBar: this.props.active,
      visible: false,
      activeAccordion: 0,
      //dimmerActive:true,
      open: false,
      pageTitle: '',
      email_variable: '',
      loadFinish: false,

    }
    if(this.state.visible== true)  this.setState({visible:false});
    else ;


    this.handleClick = this.handleClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.logout = this.logout.bind(this);
  }


UNSAFE_componentWillReceiveProps(){
  //push sideBAR back IN TWEAK
  if(this.state.visible== true)  this.setState({visible:false});
  else ;

}


  connect = new Connection();
  fetchArticle = new FetchArticles();


  componentDidMount() {

    let token = localStorage.getItem("hs_token");

    if (Object.keys(this.props.ProfileReducer).length == 0) {

      this.connect.isLoggedin(token)
        .then(_ => {

          this.props.dispatch({ type: 'INJECT_PROFILE', payload: _ })

          this.fetchArticle.fetch_articles_list().then( articles => {

            if (articles.length >0 ) {
              this.props.dispatch({ type: 'OVERWRITE_ARTICLE', payload: articles })
              this.setState({ loadFinish: true })

            }
            else 
               this.setState({ loadFinish: true });

            

          }).catch( e => this.setState({ loadFinish: true }) )

        })
        .catch( err => this.props.history.replace('/login') ) 

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
        .catch( err => this.props.history.replace('/login') ) 


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


  handleClick(e, titleProps) {

    var { index } = titleProps;
    var { activeAccordion } = this.state;
    var newIndex = (activeAccordion === index) ? -1 : index;

    this.setState({ activeAccordion: newIndex });

  }


  logout() {
 

  localStorage.removeItem("hs_token");
   // console.log(this.props.history);
 this.props.history.replace('/login');


  }



  render() {
    var side = new SideBar();
    var { articleSubmenu,  categorySubmenu, imageSubmenu, settingsSubmenu } = side.subMenu;
    const { visible } = this.state;
    var { activeAccordion } = this.state;

//PAGE NAME    
var xx= this.props.location.pathname.lastIndexOf('/');
var xx_page = ( xx===0 ) ? this.props.location.pathname.slice(1) : this.props.location.pathname.slice(1, xx);



    var { open } = this.state;


    if (this.state.loadFinish == true) {
      return (

        <div className="head">
          <Responsive as={Menu} minWidth={300} className="nav"  secondary  >
            <Menu.Item icon="bars" onClick={this.toggleSide} size="big" />
            <Menu.Item style={{ 'width': '20%' }} header ><h3>Hashstack.io</h3> </Menu.Item>


            <Menu.Menu pointing='true' position="right">
              <Menu.Item as={Link} to="/add-post" icon="compose" />
              <Menu.Item as={Link} to="/notification" icon="bell outline" />
              <Menu.Item text={this.props.ProfileReducer.username} as={Dropdown} floating >

                <Dropdown.Menu>
                  <Dropdown.Item icon='user outline' text='Profile' as={Link} to='/profile' />
                  <Dropdown.Item icon='dashboard' text='Dashboard' as={Link} to='/dashboard' />
                  <Dropdown.Item icon='sliders horizontal' text='Settings' />
                  <Dropdown.Item icon='graduation' text='Penbox Acad' />
                  <Dropdown.Item icon='help' text='Help' />
                  <Dropdown.Item color="red" onClick={this.showModal} as={Button} fluid icon='sign out' text='logout ' />
                </Dropdown.Menu>
              </Menu.Item>

            </Menu.Menu>
          </Responsive>


          <div className="sideBar">


            <div>

              <Modal size="mini" open={open} onClose={this.close}>
                <Modal.Header>LOGOUT</Modal.Header>
                <Modal.Content>
                  <p style={{ color:'black'}}>Are you sure you want to log out?<br /> There's still a lot to write about!</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => {
                    this.setState({ open: false })
                  }} color="teal">Nope</Button>
                  <Button onClick={this.logout} negative icon='checkmark' labelPosition='right' content='Yes' />
                </Modal.Actions>
              </Modal>
            </div>



            <Responsive as={Sidebar.Pushable}>
              <Sidebar as={Accordion}
                animation="push"
                onHide={this.toggle}
                visible={visible}
                vertical='true'
                className='sidebar'
                
              >
                <div style={{ textAlign: 'center', padding: '20px 2px', paddingBottom: '10px', color: 'rgb(3, 68, 94)', background: 'white' }} >
                 <Link to="/dashboard" style={{color:"black"}}> <h3>DASHBOARD</h3></Link>
                </div>
     

                <div className="accordion-item">
                  <Accordion.Title active={this.state.activeAccordion === 1} style={{ padding: '5px 20px' }} index={1} onClick={this.handleClick}  >
                    <Icon name="file alternate" className="accordion-icon" size="large" /> <b style={{ fontSize: '12px' }}>MY ARTICLES</b> 
                  </Accordion.Title>
                  <Accordion.Content style={{ padding: '5px 20px' }} active={activeAccordion === 1} content={articleSubmenu} />

                </div>

                <div className="accordion-item">
                  <Accordion.Title active={this.state.activeAccordion === 2} style={{ padding: '5px 20px' }} index={2} onClick={this.handleClick}  >
                  <Icon name="file image outline" className="accordion-icon" size="large" />  <b style={{ fontSize: '12px' }}>BOOKMARK</b>
                  </Accordion.Title>
                  <Accordion.Content style={{ padding: '5px 20px' }} active={activeAccordion === 2} content={imageSubmenu} />

                </div>


                <div className="accordion-item">
                  <Accordion.Title active={this.state.activeAccordion === 3} style={{ padding: '5px 20px' }} index={3} onClick={this.handleClick}>
                  <Icon name="hashtag" className="accordion-icon" size="large" />  <b style={{ fontSize: '12px' }}>INTERESTS</b> 
                  </Accordion.Title>
                  <Accordion.Content style={{ padding: '5px 20px' }} active={activeAccordion === 3} content={categorySubmenu} />
                </div>

                <div className="accordion-item">
                  <Accordion.Title active={this.state.activeAccordion === 4} style={{ padding: '5px 20px' }} index={4} onClick={this.handleClick}>
                  <Icon name="sliders horizontal" className="accordion-icon" size="large" />  <b style={{ fontSize: '12px' }}>SETTINGS</b> 
                  </Accordion.Title>
                  <Accordion.Content style={{ padding: '5px 20px' }} active={activeAccordion === 4} content={settingsSubmenu} />


                </div>

                <div className="accordion-item">
                  <Button as={Link} to="/about_us" fluid style={{ color: 'rgb(3, 68, 94)' }}>
                    <Icon name="info" />
THE APP
</Button>

                </div>

              </Sidebar>
              <Sidebar.Pusher  >



                {this.props.children}




              </Sidebar.Pusher>
            </Responsive>
          </div>



        </div>




      )

    }
    else {

      return (<div className='splashscreen'>

        <img src={splash} className='splash' />
    <p>HASHSTACK</p>
        <h5>Loading your contents a bit... </h5>
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






