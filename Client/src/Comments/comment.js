import React from 'react';
import '../../Resources/styles/comment.scss';
import { Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
//import FetchArticles from '../../Controllers/article.controller';


function getmonthName(number) {
    var months = [
        '01', '02', '03', '04', '05', '06',
        '07',
        '08',
        '09', '10', '11', '12'
    ]
    return months[number];

}

function date_to_string(date) {
    var fulldate = new Date(date);
    var month = getmonthName(fulldate.getMonth());
    var year = fulldate.getFullYear();
    var day = fulldate.getDate();
    var convert = `${day}'${month}`;
    return convert;
}

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            comments: [],
            post_title: ""
        }

    }

    delete_comment =(id) =>{

        alert("Are u sure u want to delete this???"+id);
    
        }


        like_comment =(id) =>{

            alert("I like this???"+id);
        
            }
    //load_articles = new FetchArticles();

    componentDidMount() {
        console.log(this.props);
        var { ArticleReducer, match } = this.props;
        for (var x of ArticleReducer) {
            if (x._id == match.params.postID) {

                this.setState({
                    comments: x.comments,
                    post_title: x.title
                })


            }
        }
    }



   










    render() {
        console.log(this.state.comments, "this is comments oo");

        if (this.state.comments.length == 0){
            return (<div className="comment-div" style={{ marginTop: "0px !important" }}>
            <p>Sorry your post hasn't received any response yet.</p>
            <p>Try sharing your links to your audience (this can help).</p>
            </div>)
        }

        return (

            <div className="comment-div" style={{ marginTop: "0px !important" }}>

                <h3 style={{color:"rgb(3, 68, 94)"}}>Responses to your story: "{this.state.post_title}" </h3>

                {
                    this.state.comments.map(each => {
                        return (
                            <div className="comment-panel">
                                <h5>{each.comment}</h5>
                                <p>By <i>{each.commenter_id.username}({each.commenter_id.email})</i></p>
                                <Button.Group size='mini' basic >
                                            <Button icon='like' onClick ={()=>{this.like_comment(each._id)}} />
                                            <Button icon='trash alternate outline' onClick ={()=>{this.delete_comment(each._id)}} />
                                            <Button>{each.seen == true? 'Hide':"Accept"}</Button>

                                </Button.Group>
                                &nbsp;&nbsp;&nbsp; 

                                <Icon name="clock outline" size='small' color="blue" /> {date_to_string(each.createdAt)}
                                &nbsp;&nbsp;&nbsp; 
                                
                            
                            </div>

                        )

                    })



                }

            </div>
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Comment));






