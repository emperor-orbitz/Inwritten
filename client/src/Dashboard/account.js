import React, { Component } from 'react';

import '../css/account.scss';
import { Button,  Grid, Dimmer, Card, Image, Header, Label, Item, Loader } from 'semantic-ui-react';
import {  Icon,  Progress } from 'semantic-ui-react';
import Connection from '../../controllers/auth';

import {  withRouter } from 'react-router';

import { connect } from 'react-redux';
import FetchArticles from '../../controllers/articleController';
import ArticlePreview from './articles/article_preview';


function DimmerLoad(props) {
  return <Loader active={props.active} size={props.size} inline />
}





class Account extends React.Component {

  constructor(props) {

    super(props)
    //this.date_to_string =this.date_to_string.bind(this);
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

  console.log(this.props);
        if (Object.keys(this.props.ArticleReducer).length == 0) {

                
                    this.fetchArticle.fetch_articles_list().then((articles, none) => {
                        if (articles) {
                            this.props.dispatch({ type: 'OVERWRITE_ARTICLE', payload: articles.RESULT });
                            this.setState({dimmerLoad:false})
                        }
                        else {
                            //error
                            this.props.history.replace('/login');

                        }
                    })



        }

        else {
          this.setState({dimmerLoad:false})

            console.log('full', this.props.ArticleReducer);

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
              <Grid.Row>
                <Grid.Column>
                  <Header size="small" as='h2' className="section-header">
                    <Icon color="black" name='align left' size='small'/>
                    <Header.Content style={{ padding: '5px 5px' }}><h4>RECENT ARTICLES</h4></Header.Content>
                  </Header>
                </Grid.Column>
              </Grid.Row>

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








