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
        var templ = new TemplateController();
        let { template_id } = this.props.ProfileReducer;
        try {
            let mine = await templ.my_template(template_id)
            var result = await templ.get_templates(template_id)

            if (mine.message !== null) {
                let templates = result.data.filter((v, i, a) => v._id !== this.props.ProfileReducer.template_id)
                this.setState({ templates, my_template: mine.message })
            }

        } catch (error) {
            console.log("Something wrong has happened", error)

        }



    }


    save_template = async (ev, data) => {

        this.setState({ save_disabled: true })
        var { templates } = this.state;
        let tempControl = new TemplateController()
        try {

            await tempControl.save_template(this.state.selected._id);
            let updated = await tempControl.get_templates(this.state.selected._id);


            this.setState({
                save_text: 'Templates successfully saved!',
                open_options: false,
                save_disabled: false,
                templates: updated.data,
                my_template: this.state.selected


            })

        }
        catch (err) {
            this.setState({ save_text: 'Unable to save template' })
            console.log(err)


        }



    }



    render() {
        var { templates, selected, my_template } = this.state;

        if (templates.length == 0) {
            return (
                <div className="comment-div" style={{ marginTop: "0px !important" }}>
                    <h3 style={{ color: "black" }}>Templates</h3>
                    <p>Loading...</p>
                </div>
            )
        }
        else
            return (

                <div className="comment-div" style={{ marginTop: "0px !important" }}>
                    <h3 style={{ color: "black" }}>Templates</h3>
                    <p>Preset templates help define structures to publish your stories. Worry less of design, promote a good content</p>

                    <div className="template-container" style={{ backgroundImage: `url('${my_template.featured_image}')` }}>
                        <div className="template-cover">
                            <h1>  {my_template.template_name} </h1>
                            <p>  {my_template.template_description} <u>(you are currently using this)</u> </p>


                        </div>

                    </div>

                    <Divider />
                    <h3>Blogs | Free</h3>

                    {this.state.save_text == "Templates successfully saved!" ? <p><Icon name="check circle outline" color="green" size="big" /> {this.state.save_text}</p> : ""}
                    {this.state.save_text == 'Unable to save template' ? <p><Icon name="cross" color="red" size="big" /> {this.state.save_text}</p> : ""}

                    <Modal size="small" open={this.state.open_options} onClose={this.close} closeOnDimmerClick closeOnDocumentClick >
                        <Modal.Header>
                            {selected.template_name}
                        </Modal.Header>

                        <Modal.Content image scrolling className='modal-content' style={{ display: "flow-root" }} >
                            <div className="featured-pix-block">
                                <img src={selected.featured_image} className="featured-image" />
                                <input className="featured-pix-cover" type='file' id='photo' style={{ visibility: 'hidden' }} />
                            </div>

                            <Modal.Description >
                                <div style={{ marginLeft: "10px" }}>
                                    <h4 style={{ marginBottom: "3px" }}>Description</h4>
                                    <p >{selected.template_description}</p>

                                    <h4 style={{ marginBottom: "3px" }}>Category</h4>
                                    <span >{selected.category}</span>

                                    <h4 style={{ marginBottom: "3px" }}>Created on:</h4>
                                    <span >{selected.createdAt}</span>
                                    <br></br>


                                </div>

                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button size='tiny' as={Link} as={Link} target="__blank" to={`/template/template_sample/${selected._id}`}>Preview</Button>
                            <Button primary size="tiny" disabled={this.state.save_disabled} onClick={this.save_template} icon='angle right' >Save <Icon name="angle right" /></Button>
                        </Modal.Actions>


                    </Modal>


                    <div style={{ width: "90%", position: "relative", minHeight: "250px" }}>
                        {templates.map((e, i, a) => {
                            return (
                                <div key={e._id} className='image-thumbnail-template-cover-big-template'>

                                    <div style={{ margin: '10px 3px' }}>
                                        <div className={'customCard-' + e.category} style={{ backgroundImage: `url('${e.featured_image}')`, backgroundSize: "cover", backgroundPosition: "bottom right" }}>
                                        </div>
                                    </div>


                                    <div className='template-thumbnail-hover-big-black-template' style={{ marginTop: "-110%" }}>
                                        <div className="category" style={{ color: "white" }}>
                                            <h5>{e.template_name} </h5>
                                            <Button primary size='mini' className="button-hover" onClick={() => { this.setState({ open_options: true, selected: e }) }} > View</Button>

                                        </div>
                                    </div>

                                </div>


                            )




                        })}

                    </div>


                    <br />
               {  /*   <div style={{ position: "relative" }}><h3>Blogs | Paid</h3>
                        <p> Your favorite Templates are coming soon...</p>

                        <div className='image-thumbnail-template-cover-big-template'>

                            <div style={{ margin: '10px 3px' }}>
                                <div className={'customCard-all'} style={{ backgroundImage: `url("/views/template-default-01/images/featured_image.jpg")`, backgroundSize: "cover", backgroundPosition: "bottom right" }}>
                                </div>
                            </div>


                             <div className='template-thumbnail-hover-big-black-template' style={{ marginTop: "-110%" }}>
                                <div className="category" style={{ color: "white" }}>
                                    <h5>Premium Designs </h5>
                                    <Button primary size='mini' className="button-hover"  disabled={true}> View</Button>

                                </div>
                            </div>

                        </div>
                    </div> */}

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






