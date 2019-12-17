import React from 'react';
import '../../Resources/styles/comment.scss';
import { Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller';





class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            posts: [],
            loading: true
        }

    }




    render() {

        return (

            <div className="comment-div" style={{ marginTop: "0px !important" }}>  
                <p>Statistics coming soon...</p>
            </div>
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Stats));






