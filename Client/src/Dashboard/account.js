import React from 'react';

import '../../Resources/styles/account.scss';
import { Button,  Grid, Dimmer, Card, Image, Label, Item, Loader, Divider } from 'semantic-ui-react';
import {  Icon,  Progress } from 'semantic-ui-react';
import Connection from '../../Controllers/auth.controller';

import {  withRouter } from 'react-router';
import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller';
import ArticlePreview from '../Articles/article_preview';





class Account extends React.Component {

  constructor(props) {

    super(props)
    this.state = {

        dimmerLoad: true,
        disabled: true

      
    }


  }


  connect = new Connection();
  fetchArticle = new FetchArticles();


  toggle = () =>this.setState({ visible: false });

  toggleSide = () => this.setState({ visible: !this.state.visible });




componentDidMount() {

  
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
            <Grid >
              <h3>Your recent stories</h3>
              <ArticlePreview credentials= {credentials} imports={imports} />
              <Divider />
              <h3>Stories you've bookmarked</h3>
              <ArticlePreview credentials= {credentials} imports={imports} />


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








