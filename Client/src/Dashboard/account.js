import React from 'react';

import '../../Resources/styles/account.scss';
import { Button,  Grid, Table, Card, Image, Label, Item, Divider } from 'semantic-ui-react';
import {  Icon,  Progress } from 'semantic-ui-react';
import Connection from '../../Controllers/auth.controller';
import { Link } from "react-router-dom"
import {  withRouter } from 'react-router';
import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller';
import DraftPreview from '../Archives/draftpreview';
import NotificationsPreview from '../Notifications/notifications_preview';

import FetchNotifications from "../../Controllers/notifications.controller"





class Account extends React.Component {

  constructor(props) {

    super(props)
    this.state = {

        dimmerLoad: true,
        disabled: true,
        notifications:[]

      
    }


  }


  connect = new Connection();
  fetchArticle = new FetchArticles();


  toggle = () =>this.setState({ visible: false });

  toggleSide = () => this.setState({ visible: !this.state.visible });




async componentDidMount() {
//Lots of fetches to go here...
//Notification Preview
try {
  let notifications = new FetchNotifications();
  let notif = await notifications.get_notifications(this.props.ProfileReducer._id)
  if (notif == null) {

  }
  else {
      
          
      this.setState({ notifications: notif.data.slice(0,5) })
  }
} catch (err) {
  //catch uncaught server error
  console.log(err, "error")
}

  
  }


  render() {

  
    var imports = {
      Icon: Icon,
      Grid: Grid,
      Image: Image,
      Card: Card,
      Progress: Progress,
      Button: Button,
      Label: Label,
      Item: Item,
      ArticleReducer: this.props.ArticleReducer
    }

var credentials={
  username:this.props.ProfileReducer.username
}


    return (

      <div >

          <div className="bodyArticle">
          <h2>Your Board</h2>
            <Grid stackable >
              <Grid.Row textAlign="center" divided columns="3">
                <Grid.Column>
                  <p style={{fontSize:"25px"}}>25</p>
                  <p>FOLLOWERS</p>
                </Grid.Column>
                <Grid.Column>
                  <p style={{fontSize:"25px"}}>1000+</p>
                  <p>STORIES</p>
                </Grid.Column>
                <Grid.Column>
                  <p style={{fontSize:"25px"}}>20</p>
                  <p>BOOKMARKS</p>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
              <DraftPreview credentials= {credentials} imports={imports} />
              </Grid.Row>
              <Divider />

              <Grid.Row>
                <NotificationsPreview data={this.state.notifications} />
              </Grid.Row>

            </Grid>


          </div>

      </div>



    )
  }
}


const mapStateToProps = (state) => {
  return state;
}


Account.T = {
  state: Object
};
export default withRouter(connect(mapStateToProps)(Account));








