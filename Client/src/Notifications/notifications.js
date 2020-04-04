import React from 'react';
import '../../Resources/styles/comment.scss';
import { Table } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import '../../Resources/styles/react-carousel.scss';
import FetchNotifications from "../../Controllers/notifications.controller"
import ListExampleSelection from "./table"




class Notifications extends React.Component {

    constructor(props) {
        super(props);
        // this.socket = socketIOClient("http://localhost:5000", {query:`userid=${this.props.ProfileReducer._id}`})

        this.state = {
            new_notification: "",
            notifications: [],
            loading: true
        }

    }



delete_notification = async (id) =>{
    let notifications = new FetchNotifications();
    let notif = await notifications.delete_notification(id)

    if (notif.message == "Delete Successful!"){
        //clear from board

        var deleted = this.state.notifications.filter( v => v._id != id );
        this.setState({ notifications: deleted })


    }
    else{
        // alert("unable to clear notification")
}

}

read_notification = () =>{
    //alert("notification read")
}






    async componentDidMount() {
        //fetch notifications
        try {
            let notifications = new FetchNotifications();
            console.log(this.props.ProfileReducer)
            let notif = await notifications.get_notifications(this.props.ProfileReducer._id)
            if (notif == null) {

            }
            else {
                console.log(notif);
                this.setState({ notifications: notif.data })
            }
        } catch (err) {
            //catch uncaught server error
            //alert('error')
            console.log(err, "error")
        }


    }




    render() {

        if (this.state.notifications == null) {
            return (
                <div className="comment-div" style={{ marginTop: "0px !important" }}>
                   
                   <img src="/images/no-notif.png" className='empty-png'/>
                   <br/>
                   <h4 style={{textAlign:"center"}}>You don't have any unread notifications</h4>

       
                  </div>
            )
        }
        else
            return (
                <div className="comment-div" style={{ marginTop: "0px !important" }}>
                    <h3 style={{ color: "black" }}>Notifications</h3>

                    <Table>
                        <Table.Header>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Notification</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>

                        </Table.Header>
                        <Table.Body>
                            {this.state.notifications.map((x, index) => {
                                return (

                                    <ListExampleSelection index={index} x={x} read_notification={this.read_notification} delete_notification={this.delete_notification} />

                                )

                            })

                            }

                        </Table.Body>
                    </Table>
                </div>


            )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Notifications));






