import React from 'react';
import '../../Resources/styles/comment.scss';
import { Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import '../../Resources/styles/react-carousel.scss';






class Notifications extends React.Component {

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
                <h3 style={{ color: "black" }}>Notifications</h3>
                <p>To be present in future release</p>
            </div>
        
            
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Notifications));






