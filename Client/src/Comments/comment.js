import React from 'react';
import '../../Resources/styles/comment.scss';
//import { Icon, Form, Divider, Button, Loader, ButtonGroup } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller';






class Comment extends React.Component {

    constructor(props) {
        super(props);
        
     
    }


    load_articles =new FetchArticles();

    componentDidMount() {
        console.log(this.props);
                if (Object.keys(this.props.ArticleReducer).length == 0) {
                
            this.load_articles.fetch_articles_list().then((articles, none) => {
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
       
        return (

            <div className="comment-div" style={{marginTop:"0px !important"}}>

               ADULTSJNFBS
               {this.props.match.params.postID}

            </div>
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Comment));






