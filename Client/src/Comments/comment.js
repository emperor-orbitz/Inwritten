import React from 'react';
import '../../Resources/styles/comment.scss';
//import { Icon, Form, Divider, Button, Loader, ButtonGroup } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';





class Comment extends React.Component {

    constructor(props) {
        super(props);
        
     
    }



    connect = new Connection();
    componentDidMount() {
        console.log(this.props);
        let auth_token = localStorage.getItem("hs_token");

        this.connect.isLoggedin(auth_token)
            .then( user => {
                //Do something here

                //this.setState({...this.props.ProfileReducer});

            })
            .catch( _ => this.props.history.replace('/login'))


    }



   




 






    render() {
       
        return (

            <div className="profile-div" style={{marginTop:"0px !important"}}>

               

            </div>
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Comment));






