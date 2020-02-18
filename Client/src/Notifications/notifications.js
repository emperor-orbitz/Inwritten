import React from 'react';
import '../../Resources/styles/comment.scss';
import { List } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import '../../Resources/styles/react-carousel.scss';
import socketIOClient from 'socket.io-client';
import FetchNotifications from "../../Controllers/notifications.controller"
import ListExampleSelection from "./card"




class Notifications extends React.Component {

    constructor(props) {
        super(props);
       // this.socket = socketIOClient("http://localhost:5000", {query:`userid=${this.props.ProfileReducer._id}`})

        this.state = {
            new_notification:"",
            notifications: [],
            loading: true
        }

    }




/*
componentWillMount() {
    this.socket.on("new_notification", (data)=>{
        this.setState({ new_notification:data })
        
    })
    
}  
*/

async componentDidMount(){
//fetch notifications
try{
    let notifications = new FetchNotifications();
    let notif = await notifications.get_notifications(this.props.ProfileReducer._id)
    if (notif == null){

    }
    else{
        console.log(notif.data);
        this.setState({ notifications:notif.data })
    }
}catch(err){
    //catch uncaught server error
    alert('error')
    console.log(err, "error")
}


}

 


    render() {
      
            if(this.state.notifications == null){
                return (
                    <div className="comment-div" style={{ marginTop: "0px !important" }}>
                    There are no unread notifications now
                    </div>
                    )
            }
            else
        return (
            <div className="comment-div" style={{ marginTop: "0px !important" }}>
                <h3 style={{ color: "black" }}>Notifications</h3>

            <List selection verticalAlign="middle">

                    {this.state.notifications.map((x, index) => {
                        return (
                            <div style={{ minHeight: "50px", width: "100%" }}>
                                <List divided relaxed>

                                    <ListExampleSelection index={index} x={x} />

                                </List>

                            </div>
                        )

                    })


                    }
                </List>
            </div>
        
            
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Notifications));






