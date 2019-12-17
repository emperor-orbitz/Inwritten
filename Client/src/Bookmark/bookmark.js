import React from 'react';
import '../../Resources/styles/profile.scss';
import { Icon, Form, Divider, Button, Loader, ButtonGroup } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import Connection from '../../Controllers/auth.controller';
import { connect } from 'react-redux';
import ProfileUpdate from '../../Controllers/profile.controller';




function DimmerLoad(props) {
    return <Loader active={props.active} size={props.size} inline />

}




class Bookmark extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            

        }
     
    }



    connect = new Connection();
    componentDidMount() {


    }




    render() {

        return (

            <div className="comment-div" style={{ marginTop: "10px !important" }}>
            <h3 style={{color:"black"}}>Bookmarks</h3>
            </div>
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Bookmark));






