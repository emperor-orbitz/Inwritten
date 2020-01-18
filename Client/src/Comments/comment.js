import React from 'react';
import '../../Resources/styles/comment.scss';
import { Icon, Button, List, Grid, GridColumn } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import comment_controller from '../../Controllers/comments.controller';
import ListExampleSelection from "./cards"

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

    delete_comment = (id) => {

        var comment = new comment_controller();
        var new_comment = [];
        comment.delete_comment(id)
            .then(_ => {
                new_comment = this.state.comments.filter(e => {
                    if (e._id != id) return e;

                })

                this.setState({ comments: new_comment })
                alert("deleted successfully")

            }
            )
            .catch(e => console.log(e)); //remember an error mesage display


    }


    like_comment = (id) => {
        var comment = new comment_controller();

        comment.like_comment(id)
            .then(_ => {
                for (var x of this.state.comments) {
                    if (x._id == id) {
                        x.likes++;
                    }
                }
                this.setState({ comments: this.state.comments })

            }
            )
            .catch(e => console.log(e)); //remember an error mesage display



    }


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
            // break;
        }
    }














    render() {
        console.log(this.state.comments, "this is comments oo");

        if (this.state.comments.length == 0) {
            return (<div className="comment-div" style={{ marginTop: "0px !important" }}>
                <p>Sorry your post hasn't received any response yet.</p>
                <p>Try sharing your links to your audience (this can help).</p>
            </div>)
        }

        return (

            <div className="comment-div" style={{ marginTop: "0px !important" }}>

                <h3 style={{ color: "rgb(3, 68, 94)" }}>Responses to your story: "{this.state.post_title}" </h3>
                <Grid>
                    <Grid.Row>
                        
                                    <Grid.Column computer={16} mobile={16} tablet={8}>

                                            {this.state.comments.map((x, index) => {
                                                return (
                                                    <div style={{ minHeight: "50px", width: "100%" }}>
                                                        <List size="big" selection verticalAlign="middle" >

                                                            <ListExampleSelection index={index} x={x} like_comment={this.like_comment} delete_comment={this.delete_comment} />

                                                        </List>

                                                    </div>
                                                )

                                            })
                                        }

                                            

                                    </Grid.Column>



                    </Grid.Row>
                </Grid>
            </div>
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Comment));






