
import React from 'react';
import '../../Resources/styles/article.scss';
import { Button, Icon, Form, Modal, Grid, Select, Item, Input, Dropdown } from 'semantic-ui-react';
import Connection from '../../Controllers/auth.controller';

import { withRouter } from 'react-router';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FetchDrafts from '../../Controllers/draft.controller';
import 'moment-timezone';
import Moment from "react-moment";






function image_transform(url, width, height){
    //Add height and width to image
     return url.replace("/upload/", `/upload/h_${height},w_${width},c_crop/`)
    }





class PostArchive extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeBar: this.props.active,
            visible: false,
            activeAccordion: 0,
            open: false,
            deleteArticleId: null,
            deleteArticleName: null,
            deleteStatus: 'Delete',
            deleteColor: 'red',
            messageDismiss: false,
            username: '',
            email: '',
            search_criteria: 'title',
            arrange_criteria: 'date-asc',
            search: '',
            filter_privacy: [],
            filter_privacy_const: [],
            not_found: false,
            open_deleteall: false
        }
        this.search_with_criteria = this.search_with_criteria.bind(this);

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.handleSearchCriteria = this.handleSearchCriteria.bind(this);
        this.showModal = this.showModal.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.handleMessageDismiss = this.handleMessageDismiss.bind(this);
    }


    showModal = (e, p) => {


        var { title, id } = p;

        console.log(title, id)
        this.setState(
            {
                open: true,
                deleteArticleName: title.toLowerCase(),
                deleteArticleId: id,
            }

        );

    }


    // deleteAll = () => {

    //     //delete all posts
    //     var del = new FetchArticles;
    //     del.delete_all({ public: false })
    //         .then(suc => {
    //             this.props.dispatch({ type: 'DELETE_ALL_DRAFT', payload: { public: false } })
    //             var filter_privacy = this.props.ArticleReducer.filter(nor => nor.public == false);
    //             this.setState({ deleteArticleId: null, open: false, messageDismiss: true, filter_privacy: filter_privacy, open_deleteall: false });

    //         })
    //         .catch(err => console.log(err))

    // }






    handleSearchCriteria(e, p) {

        this.setState({ not_found: false, search_criteria: p.value })
    }


    handleEnter = (e) => {

        if (e.key === "Enter") {
            this.search_with_criteria()
        }
    }


    deletePost = () => {
        var id = this.state.deleteArticleId;
        var __delete = new FetchDrafts;
        __delete.delete_draft(id)
            .then(fulfilled => {
                if (fulfilled) {

                    this.props.dispatch({type: 'DELETE_DRAFT', payload: { _id: this.state.deleteArticleId }})

                    var filter_privacy = this.props.DraftReducer.filter(nor => nor.type == "DRAFT" && nor.published == false);

                    this.setState({ deleteArticleId: null, open: false, messageDismiss: true, filter_privacy: filter_privacy });


                }
                else {
                    this.setState({ deleteArticleId: null });
                }
            })

    }
    focusOnId = (elem) => { document.getElementById(elem).focus() }

    dontDeletePost = () => {

        this.setState({ open: !this.state.open, deleteArticleId: null });
    }


    handleMessageDismiss() {
        this.setState({ messageDismiss: false });
    }

    close = () => this.setState({ open: false })


    connect = new Connection();
    FetchDraft = new FetchDrafts();

    onChangeSearch = (e) => { this.setState({ search: e.target.value, not_found: false }) }

    search_with_criteria = (/*scope*/) => {

        var SC = this.state.search_criteria;
        this.setState({ not_found: false });
        var search = this.state.search;

        var ask = this.state.filter_privacy.filter(function (portion, index) {
            return portion[SC].toLowerCase().indexOf(search.toLowerCase()) != -1;
        })

        if (ask.length == 0) this.setState({ not_found: true }, () => { this.focusOnId('search') })
        else if (search.length == 0) {
            this.setState({ filter_privacy: this.state.filter_privacy_const }, () => { this.focusOnId('search') })

        }
        else {

            this.setState({ filter_privacy: ask }, () => { this.focusOnId('search') })


        }



    }


    shouldComponentUpdate(nextProps, nextState) {

        /*FUTURE UPDATES
        */
        return true;


        //return true;
    }

    componentDidMount() {

        var filter_privacy = this.props.DraftReducer.filter((nor) => nor.type == "DRAFT" && nor.published == false); //Dont tamper with immutability
        this.setState({ filter_privacy });
        this.state.filter_privacy_const = filter_privacy;

    }


    categoryOptions = [
        {
            key: 1,
            value: 'title',
            text: 'By Title',

        },
        {
            key: 2,
            value: 'category',
            text: 'By Category'
        },

    ]

    arrangeOptions = [
        {
            key: 3,
            value: 'date-asc',
            text: 'By Date (old to new)'
        },
        {
            key: 4,
            value: 'date-desc',
            text: 'By Date (new to old)'
        }
        ,
        {
            key: 5,
            value: 'box',
            text: 'By boxes (highest to lowest )'
        },
        {
            key: 6,
            value: 'box',
            text: 'By box (lowest to highest)'
        },
        {
            key: 7,
            value: 'alphabets',
            text: 'By Alphabets'
        }

    ]

    
    render() {

        var { filter_privacy } = this.state;


        if (filter_privacy.length == 0) {
            return (<div>


                <div className='bodyArticle'>

                    <img src="/images/empty.png" className='empty-png' />
                    <br />
                    <h4 style={{ textAlign: "center", color:"black !important" }}>Its been a while you've written. Start off with a short <Button style={{ color: 'black', background: "white" }} as={Link} to="/app/add-post">DRAFT</Button></h4>


                </div>

            </div>

            )

        }


        else {
            return (

                <div>

                    <Modal dimmer={true} size='mini' open={this.state.open} closeOnDimmerClick={true} onClose={() => { this.setState({ open: false }) }}>

                        <Modal.Content style={{ height: '200px', background: "", color: 'black', padding: '10%' }}  >
                            <p style={{ textAlign: 'center' }}> <Icon size='big' name='trash' />
                                <h3 >{`Delete "${this.state.deleteArticleName}" ?`}  </h3>
                                <br />
                                <Button size="small" color='red' icon='trash alternate outline' labelPosition='right' content='Delete' size='tiny' onClick={this.deletePost.bind(this, [this.state.deleteArticleId])} />
                            </p>

                        </Modal.Content>
                    </Modal>

                    <Modal dimmer={true} size='mini' open={this.state.open_deleteall} closeOnDimmerClick={true} onClose={() => { this.setState({ open_deleteall: false }) }}>

                        <Modal.Content style={{ height: '400px', background: "", color: 'black', padding: '10%' }}  >
                            <p style={{ textAlign: 'center' }}> <Icon size='big' name='trash' />
                                <h3 >Delete All your drafts? </h3>
                                <p>You will lose all your drafts by clicking delete, are you sure?</p>
                                <br />
                                <Button size="small" color='red' icon='trash alternate outline' labelPosition='right' content='Delete All' size='tiny' onClick={this.deleteAll} />
                            </p>


                        </Modal.Content>

                    </Modal>

                    <div className='bodyArticle'>

                        <Grid >
                            <Grid.Row >
                                <Grid.Column floated="right" computer={16} mobile={16} tablet={15}   >


                                    <div style={{ borderBottom: "3px solid navyblue", marginBottom: "5px", padding: "0px", width: "100%" }} >
                                        <h4> Search Drafts</h4>
                                        <Form size="small"   >

                                            <Input id='search' fluid icon={<Icon name="chevron left" />} className='custom-input' maxLength='50' value={this.state.search} onChange={this.onChangeSearch} onKeyDown={this.handleEnter} placeholder='Search by title and hit enter. e.g The angry bird fight/category' />
                                            {/* <Select name='category' style={{ border: "none" }} value={this.state.search_criteria} onChange={this.handleSearchCriteria} options={this.categoryOptions}  />*/}
                                            {/* <Button primary icon="search" onClick={this.search_with_criteria} />*/}
                                            {/*<Button color="red" icon="trash alternate outline" onClick={() => { this.setState({ open_deleteall: true }) }} />*/}

                                        </Form>

                                    </div>
                                    {this.state.not_found == true ? <div className='error-notification'> <Icon name="unlink" size='mini' color="black" /> No result for <b> {this.state.search}</b> was not found</div> : ''}

                                </Grid.Column>

                            </Grid.Row>
                            <Grid.Row stretched >

                                {filter_privacy.map((e) => {

                                    return (



                                        <Grid.Column computer={5} mobile={16} tablet={4} >
                                            <Item style={{ marginBottom: '12px' }} key={e._id} >
                                                <Item.Image floated="right" size="small" src={image_transform(e.featured_image, 200, 92)} />

                                                <Item.Content verticalAlign="middle" >
                                                    <Item.Header as={Link} to={{ pathname: '/app/edit/' + e._id + '/'+ e.type }}><h4 style={{ color: "black" }}>{e.title}</h4></Item.Header>
                                                    <Item.Description>Draft</Item.Description>
                                                    <Item.Meta> <span style={{color:"silver"}}>
                                                       Updated <Moment fromNow>{e.updatedAt}</Moment>
                                                        
                                                        </span> </Item.Meta>


                                                    <Item.Extra >
                                                        <Dropdown text="More... ">
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item text='Continue editing' icon='eye' as={Link} to={{  pathname: '/app/edit/' + e._id  }} />
                                                                <Dropdown.Item text='Delete' icon='trash alternate outline' title={e.title} id={e._id} onClick={this.showModal} />
                                                                {/* <Dropdown.Item icon="comment" text="Comments" as={Link} to={{ pathname: '/app/comments/' + e._id }} /> */}

                                                            </Dropdown.Menu>
                                                        </Dropdown>


                                                    </Item.Extra>

                                                </Item.Content>
                                            </Item>
                                        </Grid.Column>





                                    )



                                })}


                            </Grid.Row>
                        </Grid>
                    </div>




                </div>

            )



        }

    }









}

const mapStateToProps = (state) => {
    return state;
}





export default withRouter(connect(mapStateToProps)(PostArchive));
