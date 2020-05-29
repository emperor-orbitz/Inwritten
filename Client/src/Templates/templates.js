import React from 'react';
import '../../Resources/styles/comment.scss';
import '../../Resources/styles/template.scss';
import { Icon, Button, Message, Divider, Container, Grid, Item, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import '../../Resources/styles/react-carousel.scss';
import TemplateController from "../../Controllers/templates.controller";





class Templates extends React.Component {

    constructor(props) {
        super(props);
        //State Object
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

    //Show Modal
    showModal = (event, a) => {
        console.log(a)
        this.setState({ open_options: true, selected: a.data })

    }

    //Close Modal
    close = () => {
        this.setState({ open_options: false })
    }


    //COMPONENT HOOK: ComponentDidMount
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



    // SAVE TEMPLATE TO DB
    save_template = async (ev, data) => {

        this.setState({ save_disabled: true })
        let tempControl = new TemplateController()
        try {

            await tempControl.save_template(data._id);
            let updated = await tempControl.get_templates(data._id);


            this.setState({
                save_text: 'Template activated successfully!',
                //open_options: false,
                save_disabled: false,
                templates: updated.data,
                my_template: data
            })

        }
        catch (err) {
            this.setState({ save_text: 'Unable to activate template' })


        }

    }


    // Component RENDER FUNCTION
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
                <Container fluid>

                    <div className="comment-div" style={{ marginTop: "0px !important" }}>

                        <Grid>
                            <Grid.Row >
                                <Grid.Column computer={16} mobile={16} tablet={15} >

                                    <h3 style={{ color: "black" }}>My Templates</h3>
                                    <p>Preset templates help define structures to publish your stories. Worry less of design, promote a good content</p>

                                    <div className="template-container" style={{ backgroundImage: `url('${my_template.featured_image}')` }}>
                                        <div className="template-cover">
                                            <h1>  {my_template.template_name} </h1>
                                            <p>  {my_template.template_description} <u>(you are currently using this)</u> </p>
                                        </div>
                                    </div>
                                </Grid.Column >
                            </Grid.Row >
                            <Grid.Row stretched >

                                <Grid.Column computer={16} mobile={16} tablet={15} >

                                    <Input type="text" size="small" placeholder="Search Store" />

                                </Grid.Column >
                                <Grid.Column computer={16} mobile={16} tablet={15} >

                                    {this.state.save_text == "Template activated successfully!" ?
                                        <Message size='small' positive>
                                            <p><Icon name="check circle outline" color="green" size="big" /> {this.state.save_text}</p></Message> : ""}

                                    {this.state.save_text == 'Unable to activate template' ?
                                        <Message negative>
                                            <p><Icon name="cross" color="red" size="big" /> {this.state.save_text}</p></Message> : ""}

                                </Grid.Column >

                            </Grid.Row>
                            <Grid.Row stretched >

                                <Divider />


                                {templates.map((e, i, a) => {
                                    return (
                                        <Grid.Column style={{ marginBottom: '10px' }} computer={5} mobile={16} tablet={5} >

                                            <Item style={{ marginBottom: '4px' }} key={e._id} >
                                                <Item.Image floated="right" size="tiny" src={e.featured_image} />

                                                <Item.Content >
                                                    <Item.Header as='h3'>{e.template_name}</Item.Header>
                                                    <Item.Meta as="b">Description</Item.Meta>
                                                    <Item.Description>
                                                        {e.template_description}
                                                    </Item.Description>
                                                    <Item.Extra style={{ marginTop: "10px" }}>

                                                        <Button size="tiny" disabled={this.state.save_disabled} onClick={(evt) => { this.save_template(evt, e) }} icon='angle right' >Activate <Icon name="angle right" /></Button>
                                                        <span>&nbsp;&nbsp;<a href="#">More Details</a></span>
                                                    </Item.Extra>
                                                </Item.Content>
                                            </Item>





                                        </Grid.Column >)

                                })}

                            </Grid.Row>


                        </Grid>
                    </div>

                </Container>
            )


    }


}


//Map Redux state to props
const mapStateToProps = (state) => {
    return state;
}


//Export
export default withRouter(connect(mapStateToProps)(Templates));






