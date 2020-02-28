import React from 'react';

import '../../Resources/styles/account.scss';
import { Button,  Grid, Card, Image, Label, Item, Divider } from 'semantic-ui-react';
import {  Icon,  Progress } from 'semantic-ui-react';
import Connection from '../../Controllers/auth.controller';
import {  withRouter } from 'react-router';
import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller';
import DraftPreview from '../Archives/draftpreview';
import NotificationsPreview from '../Notifications/notifications_preview';
import profileController from "../../Controllers/profile.controller"
import FetchNotifications from "../../Controllers/notifications.controller"





class Account extends React.Component {

  constructor(props) {

    super(props)
    this.state = {

        dimmerLoad: true,
        disabled: true,
        notifications:[],
        follower_count:0,
        story_count:0,
        

      
    }


  }


  connect = new Connection();
  fetchArticle = new FetchArticles();


  toggle = () =>this.setState({ visible: false });

  toggleSide = () => this.setState({ visible: !this.state.visible });




async componentDidMount() {
//Lots of fetches to go here...
//Notification Preview
//Stats Counts

try {
  let notifications = new FetchNotifications();
  let stats = new profileController()
  let counts = await stats.fetchStats();
  let notif = await notifications.get_notifications(this.props.ProfileReducer._id)

  if (notif.data == null) {
    this.setState({  follower_count: counts.data.follower_count, story_count: counts.data.story_count })

  }
  else {
      
      this.setState({ notifications: notif.data.slice(0,5), follower_count: counts.data.follower_count, story_count: counts.data.story_count })
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
                  <p style={{fontSize:"25px"}}>{this.state.follower_count}</p>
                  <p>FOLLOWERS</p>
                </Grid.Column>
                <Grid.Column>
                  <p style={{fontSize:"25px"}}>{this.state.story_count}</p>
                  <p>STORIES</p>
                </Grid.Column>
                <Grid.Column>
                  <p style={{fontSize:"25px"}}>{this.props.ProfileReducer.bookmarks.length}</p>
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








