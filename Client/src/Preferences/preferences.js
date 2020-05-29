import React from 'react';
import Link from 'react-router-dom/Link';
import '../../Resources/styles/comment.scss';
import '../../Resources/styles/template.scss';
//import { Icon, Button, Modal, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
//import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import '../../Resources/styles/react-carousel.scss';
import TemplateController from "../../Controllers/templates.controller";





class Preferences extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            templates: [],
            loading: true,
            open_options: false,
            selected: {},
            save_text: "",
            save_disabled: false,
            my_template: {}
        }

    }





    render() {
        return (
            <div className="comment-div" style={{ marginTop: "0px !important" }}>
                <h3 style={{ color: "black" }}>Preferences</h3>
                <p>To be present in future release</p>
            </div>
        
            
        )



    }






}

const mapStateToProps = (state) => {
    return state;
}



export default withRouter(connect(mapStateToProps)(Preferences));






