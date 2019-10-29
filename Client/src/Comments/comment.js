import React from 'react';
import '../../Resources/styles/comment.scss';
//import { Icon, Form, Divider, Button, Loader, ButtonGroup } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller';






class Comment extends React.Component {

    constructor(props) {
        super(props);
       this.state={

        comments:[]
       } 
     
    }


    load_articles =new FetchArticles();

    componentDidMount() {
        console.log(this.props);
                if (Object.keys(this.props.ArticleReducer).length == 0) {
                
            /*this.load_articles.fetch_articles_list().then((articles, none) => {
                if (articles) {

                  this.props.dispatch({ type: 'OVERWRITE_ARTICLE', payload: articles});
                    //Load the article with the attributed :ID



                    this.setState({dimmerLoad:false, comments: articles })
                }
                else;
            })
*/
}

else {
  this.setState({dimmerLoad:false})

}

this.setState({dimmerLoad:false})

     

    }



   




 



    render() {
       
        return (

            <div className="comment-div" style={{marginTop:"0px !important"}}>

               
               {this.props.match.params.postID}

            </div>
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Comment));






