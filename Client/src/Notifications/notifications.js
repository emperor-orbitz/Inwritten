import React from 'react';
import '../../Resources/styles/comment.scss';
import { Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import '../../Resources/styles/react-carousel.scss';
import socketIOClient from 'socket.io-client';





class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.socket = socketIOClient("http://localhost:5000", {query:`userid=${this.props.ProfileReducer._id}`})

        this.state = {
            new_notification:"",
            posts: [],
            loading: true
        }

    }





componentWillMount() {
    this.socket.on("new_notification", (data)=>{
        this.setState({ new_notification:data })
        
    })
    
}  


loadSocket =(e)=>{

this.socket.emit("print_on_console", {to:"", message:"I AM NEW NNOTIFICATION", type:"comment"})
console.log("I emitted oo")

}


    render() {
      

        return (
            <div className="comment-div" style={{ marginTop: "0px !important" }}>
                <h3 style={{ color: "black" }}>Notifications</h3>
                <p>To be present in future release</p>


                {this.state.new_notification !== "" ? <p>{this.state.new_notification}</p>: ""}
                <Button primary onClick={this.loadSocket}>EMIT</Button>
            </div>
        
            
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Notifications));






