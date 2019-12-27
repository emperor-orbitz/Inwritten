import React from 'react';
import Link from 'react-router-dom/Link';
import '../../Resources/styles/comment.scss';
import '../../Resources/styles/template.scss';
import { Icon, Button, Modal, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
//import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import '../../Resources/styles/react-carousel.scss';
import TemplateController from "../../Controllers/templates.controller";





class Templates extends React.Component {

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


    showModal = (event, a) => {
        console.log(a)
        this.setState({ open_options: true, selected: a.data })

    }

    close = () => {
        this.setState({ open_options: false })
    }


    async componentDidMount() {
        var templ = new TemplateController()
        try {
          let mine = templ.my_template(this.props.ProfileReducer.template_id) 


        } catch (error) {
            
        }

        templ.get_templates()
            .then(result => {
                console.log(result.data)
                let templates = result.data.filter((v,i,a)=>{
                    return v._id !== this.props.ProfileReducer.template_id
                })
                this.setState({ templates })

            })
            .catch(err => {

                console.log("Something wrong has happened")
            })


    }


    save_template = (ev, data) => {

        this.setState({ save_disabled:true })
        var id = this.state.selected._id
        let tempControl = new TemplateController()

        tempControl.save_template(id)
            .then(_ => this.setState({ save_text: 'Templates successfully saved!',
                                      open_options: false,
                                      save_disabled: false,

                                    }))

            .catch(__ => this.setState({ save_text: 'Unable to save template' }))



    }



    render() {
        var { templates } = this.state;

        if (templates.length == 0) {
            return (
                <div className="comment-div" style={{ marginTop: "0px !important" }}>
                    <h3 style={{ color: "black" }}>Templates</h3>
                    <p>Oops, there seem to be no templates for now. Check back later.</p>
                </div>
            )
        }
        else
            return (

                <div className="comment-div" style={{ marginTop: "0px !important" }}>
                    <h3 style={{ color: "black" }}>Templates</h3>

                    <div className="template-container"> 
                    <img src ='/8d7be38b85f237d90b6fb6bb583c0af2.jpg' className="template-image" />
                    <div className="template-cover">
                    <h3> Cover on hover  </h3>
                    
                    </div>

                     </div>
                    <Divider />

                    <p>Select one. Templates are the different designs in which your articles can be rendered.</p>
                   
                    <span style={{ color:"green" }}>{this.state.save_text}</span>
                    <br></br>



                    <Modal size="small" open={this.state.open_options} onClose={this.close} closeOnDimmerClick closeOnDocumentClick >
                        <Modal.Header>
                            {this.state.selected.template_name}
                        </Modal.Header>

                        <Modal.Content image scrolling className='modal-content' style={{ display: "flow-root" }} >
                            <div className="featured-pix-block">
                                <img src={this.state.selected.featured_image} className="featured-image" />
                                <input className="featured-pix-cover" type='file' id='photo' style={{ visibility: 'hidden' }} />
                            </div>

                            <Modal.Description >
                                <div style={{ marginLeft: "10px" }}>
                                    <h4 style={{ marginBottom: "3px" }}>Description</h4>
                                    <p >{this.state.selected.template_description}</p>

                                    <h4 style={{ marginBottom: "3px" }}>Category</h4>
                                    <span >{this.state.selected.category}</span>

                                    <h4 style={{ marginBottom: "3px" }}>Created on:</h4>
                                    <span >{this.state.selected.createdAt}</span>
                                    <br></br>


                                </div>

                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button size="small" as={Link} as={Link} target="__blank" to={`/template/template_sample/${this.state.selected._id}`}>Preview</Button>
                        <Button primary size="small" disabled={this.state.save_disabled} onClick={this.save_template}>Save</Button>
                        </Modal.Actions>


                    </Modal>





                    {templates.map((e, i, a) => {
                        return (
                            <div key={e._id} className='image-thumbnail-template-cover-big'>

                                <div style={{ margin: '10px 3px' }}>

                                    <div className={'customCard-' + e.category} style={{ backgroundImage: `url('${e.featured_image}')`, backgroundSize: "cover", backgroundPosition: "bottom right" }}>

                                    </div>
                                </div>


                                <div className='template-thumbnail-hover-big'>

                                    <div className="category">
                                        <span><b>{e.category}</b> </span>
                                        <h5>{e.template_name} </h5>
                                        <Button primary size='mini' className="button-hover" onClick={() => { this.setState({ open_options: true, selected: e }) }} > Select</Button>

                                    </div>
                                </div>

                            </div>


                        )




                    })}



                </div>


            )


    }






}

const mapStateToProps = (state) => {
    return state;
}
/*
 <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={3}
                >
                    <Slider style={{ height: "400px", width:'700px', color: 'black !important', boxShadow: '2px 1px 17px 2px rgba(82, 82, 82, 0.4)' }}>
                        <Slide index={0} > <h2>TEMPLATE-DEFAULT-01</h2></Slide>
                        <Slide index={1}> <h2>TEMPLATE-STARTER-02</h2></Slide>
                        <Slide index={2}> <h2>TEMPLATE-NOVA-03</h2></Slide>
                    </Slider>
                    <ButtonBack style={{ background: 'black', color: 'white', marginRight: '10px', border: 'none', padding: "8px 15px" }}><Icon name='arrow left'/></ButtonBack>
                    <ButtonNext style={{ background: 'black', color: 'white', border: 'none', padding: "8px 15px" }}><Icon name='arrow right'/></ButtonNext>
                </CarouselProvider>
*/





export default withRouter(connect(mapStateToProps)(Templates));






