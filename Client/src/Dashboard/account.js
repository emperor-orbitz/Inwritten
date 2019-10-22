import React from 'react';

import '../../Resources/styles/account.scss';
import { Button,  Grid, Dimmer, Card, Image, Header, Label, Item, Loader } from 'semantic-ui-react';
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

        if (Object.keys(this.props.ArticleReducer).length == 0) {
                
                    this.fetchArticle.fetch_articles_list().then((articles, none) => {
                        if (articles) {

                          this.props.dispatch({ type: 'OVERWRITE_ARTICLE', payload: articles});
                            this.setState({dimmerLoad:false})
                        }
                        else {
                            //error
                            //this.props.history.replace('/login');

                        }
                    })

        }

        else {
          this.setState({dimmerLoad:false})
        }

        this.setState({dimmerLoad:false})

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
        <Dimmer active={this.state.dimmerLoad}>
          <Loader size="small"> Loading Dashboard in a bit...</Loader>
        </Dimmer>


          <div className="bodyAccount">
            <Grid >
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








