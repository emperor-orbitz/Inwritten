
import React from 'react';
import '../../../Resources/styles/article.scss';
import { Button, Icon, Form, Modal, Grid, Select, Input } from 'semantic-ui-react';
import Connection from '../../../Controllers/auth.controller';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FetchArticles from '../../../Controllers/article.controller';






function date_to_string(date) {
    var fulldate = new Date(date);
    var month = getmonthName(fulldate.getMonth());
    var year = fulldate.getFullYear();
    var day = fulldate.getDate();
    var convert = `${day}- ${month}`;
    return convert;
}


/*       GET MONTH NAME
*/


function getmonthName(number) {
    var months = [
        '01', '02', '03', '04', '05', '06',
        '07',
        '08',
        '09', '10', '11', '12'
    ]
    return months[number];

}



class Articles extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeBar: this.props.active,
            visible: false,
            activeAccordion: 0,
            open: false,
            open_share: false,
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
            share_data: {},
            copyToClipboard: "Copy to clipboard",
            open_deleteall: false
        }


    }




    shareToWhatsApp = (e, data) => {

        e.preventDefault()
        let url = encodeURIComponent(`Hey, check out my new story on Inwritten. It's here: https://www.inwritten.com${data.post_link}`)
        console.log(url)
        window.location.href= `https://wa.me/?text="${url}"`
        
        


    }


    shareToFacebook = (e, data) => {

        e.preventDefault()
        let url = encodeURIComponent(`https://www.inwritten.com${data.post_link}`)

        window.open(
            'https://www.facebook.com/dialog/share?app_id=508448136537979&display=popup&href=' + url + '&redirect_uri=https%3A%2F%2Fwww.inwritten.com/stories',
            'facebook-share-dialog',
            'width=400,height=300', false);

    }





    showModal = (e, p) => {
        var { title, id } = p;
        this.setState(
            {
                open: true,
                deleteArticleName: title.toLowerCase(),
                deleteArticleId: id,
            }

        )
    }


    deleteAll = () => {

        //delete all posts
        var del = new FetchArticles;
        del.delete_all({ public: true })
            .then(suc => {

                this.props.dispatch({ type: 'DELETE_ALL_STORY', payload: { public: true } })
                var filter_privacy = this.props.ArticleReducer.filter(nor => nor.public == true);
                this.setState({ deleteArticleId: null, open: false, messageDismiss: true, filter_privacy: filter_privacy, open_deleteall: false });

            })
            .catch(err => console.log(err))

    }


    handleSearchCriteria = (e, p) => {

        this.setState({ not_found: false, search_criteria: p.value, open_share: false })
    }


    deletePost = () => {
        var id = this.state.deleteArticleId;

        var __delete = new FetchArticles;
        __delete.delete_article(id)
            .then((fulfilled, unfulfilled) => {
                if (fulfilled) {

                    this.props.dispatch(
                        {
                            type: 'DELETE', payload: { _id: this.state.deleteArticleId }
                        });

                    this.setState({ deleteArticleId: null, open: false, messageDismiss: true });
                    var filter_privacy = this.props.ArticleReducer.filter(nor => nor.public == true);
                    this.setState({ filter_privacy });

                }
                else {
                    this.setState({ deleteArticleId: null });
                }
            })

    }
    focusOnId = (elem) => {
        document.getElementById(elem).focus();

    }
    dontDeletePost = () => this.setState({ open: !this.state.open, deleteArticleId: null });


    handleMessageDismiss = () => this.setState({ messageDismiss: false });


    close = () => this.setState({ open: false })

    openShare = (share_data) => {
        this.setState({ open_share: true, share_data, copyToClipboard: "Copy to clipboard" })
    }

    copyToClipboard = () => {
        var dummy = document.createElement("textarea")
        // dummy.style.display="none";
        document.body.appendChild(dummy)
        dummy.setAttribute("id", 'dummy_id');
        document.getElementById("dummy_id").value = `http://www.inwritten.com${this.state.share_data.post_link}`;
        dummy.select()
        document.execCommand("copy");
        document.body.removeChild(dummy);
        this.setState({ copyToClipboard: "Copied!" })
    }

    closeShare = () => {
        this.setState({ open_share: false })
    }

    connect = new Connection();
    fetchArticle = new FetchArticles();

    onChangeSearch = (e, p) => {
        var search = e.target.value;
        this.setState({ search: search, not_found: false })
    }


    search_with_criteria = () => {

        var SC = this.state.search_criteria;
        this.setState({ not_found: false });
        var search = this.state.search;

        var ask = this.state.filter_privacy.filter((portion, index) => portion[SC].toLowerCase().indexOf(search.toLowerCase()) != -1);

        if (ask.length == 0) this.setState({ not_found: true }, () => { this.focusOnId('search') })
        else if (search.length == 0) {
            this.setState({ filter_privacy: this.state.filter_privacy_const }, () => { this.focusOnId('search') })

        }
        else {

            this.setState({ filter_privacy: ask }, () => { this.focusOnId('search') })


        }


    }



    componentDidMount() {

        var filter_privacy = this.props.ArticleReducer.filter(nor => nor.public == true);

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
        }

    ]


    render() {

        var { filter_privacy } = this.state;



        if (filter_privacy.length == 0) {
            return (<div>

                <div className='bodyArticle'>
                   
                            <img src="/images/empty.png" className='empty-png'/>
                            <br/>
                            <h4 style={{textAlign:"center"}}>You don't have any published story. You can create one <Button size="tiny" as={Link} to="/app/add-post">here</Button></h4>

                
                </div>

            </div>

            )

        }


        else {
            return (

                <div>

                    <Modal dimmer={true} size='mini' open={this.state.open} closeOnDimmerClick={true} onClose={() => { this.setState({ open: false }) }}>

                        <Modal.Content style={{ height: '200px', background: "", color: 'black', padding: '5%' }}  >
                            <div style={{ textAlign: 'center' }}> <Icon size='big' name='trash' />
                                <h3 >{`Delete "${this.state.deleteArticleName}" ?`}  </h3>

                                <Button size='small' color='red' icon='trash alternate outline' labelPosition='right' content='Delete' size='tiny' onClick={this.deletePost.bind(this, [this.state.deleteArticleId])} />
                            </div>

                        </Modal.Content>

                    </Modal>


                    <Modal dimmer={true} size='mini' open={this.state.open_deleteall} closeOnDimmerClick={true} onClose={() => { this.setState({ open_deleteall: false }) }}>

                        <Modal.Content style={{ height: '400px', background: "", color: 'black', padding: '10%' }}  >
                            <p style={{ textAlign: 'center' }}> <Icon size='big' name='trash' />
                                <h3 >Delete All your stories? </h3>
                                <p>You will lose all your stories by clicking delete, are you sure?</p>
                                <br />
                                <Button size="small" color='red' icon='trash alternate outline' labelPosition='right' content='Delete All' size='tiny' onClick={this.deleteAll} />
                            </p>


                        </Modal.Content>

                    </Modal>

                    <Modal size='mini' open={this.state.open_share} onClose={this.closeShare} closeOnDimmerClick >

                        <Modal.Content style={{ minHeight: '200px', background: "", color: 'black', padding: '5%' }}  >
                            <div style={{ textAlign: 'center' }}>
                                <h4 >Share {this.state.share_data.title} </h4>

                                <Button icon="copy outline" labelPosition='left' content={this.state.copyToClipboard} size='small' onClick={this.copyToClipboard} disabled={this.state.copyToClipboard == "Copied!"} />
                                <br /> <br />

                                <Button onClick={(e) => this.shareToFacebook(e, this.state.share_data)}
                                    color="facebook" icon="facebook" labelPosition='left' content='Share to facebook ' size='small' />
                                <br /> <br />
                                <Button onClick={(e) => this.shareToWhatsApp(e, this.state.share_data)} color="green" icon="whatsapp" labelPosition='left' content='Share to WhatsApp' size='small' />
                            </div>
                        </Modal.Content>
                    </Modal>
                    <div className='bodyArticle'>

                        <Grid>
                            <Grid.Row >
                                <Grid.Column computer={16} mobile={16} tablet={15}  >


                                    <div style={{ borderBottom: "3px solid navyblue", marginBottom: "20px", padding: "10px", width: "100%" }} >

                                        <Form size="small" >

                                            <Input id='search' className='custom-input' maxLength='50' value={this.state.search} onChange={this.onChangeSearch} placeholder='Search Interests' />
                                            <Select name='category' style={{ border: "none" }} value={this.state.search_criteria} onChange={this.handleSearchCriteria} options={this.categoryOptions} />
                                            <Button primary icon="search" onClick={this.search_with_criteria} />
                                            <Button color="red" icon="trash alternate outline" onClick={() => { this.setState({ open_deleteall: true }) }} />

                                        </Form>

                                    </div>

                                </Grid.Column>

                                <Grid.Column computer={16} mobile={16} tablet={15} >
                                    {this.state.not_found == true ? <div className='error-notification'> <Icon name="close" size="big" color="red" /> No result for <b> {this.state.search}</b> was not found</div> : ''}

                                    {filter_privacy.map((e) => {

                                        if (e.featured_image == undefined || e.featured_image == "") {
                                            return (
                                                <div key={e._id} className='image-thumbnail-template-cover-big'>

                                                    <div style={{ margin: '10px 3px' }}>

                                                        <div className='customCard-all' >

                                                            <h4 style={{ marginTop: '0px', padding: '0px', textOverflow: 'ellipsis' }}>
                                                                {e.title}
                                                            </h4>

                                                            <span><b>created on </b> </span>
                                                            <p>{date_to_string(e.createdAt)}</p>
                                                        </div>
                                                    </div>


                                                    <div className='template-thumbnail-hover-big'>

                                                        <div className="category">


                                                            <Button.Group className="button-hover" size='small' icon >
                                                                <Button icon='eye' as={Link} to={{ pathname: '/app/edit-post/' + e._id }} />
                                                                <Button icon='external alternate' target="__blank" as={Link} to={`${e.post_link}`} />
                                                                <Button icon='trash alternate outline' title={e.title} id={e._id} onClick={this.showModal} />
                                                                <Button icon="share alternate" onClick={() => { this.openShare(e) }} />

                                                            </Button.Group>
                                                        </div>

                                                    </div>

                                                </div>



                                            )

                                        }


                                    })}
                                </Grid.Column>


                            </Grid.Row>
                        </Grid>
                    </div>




                </div >

            )

        }

    }


}

const mapStateToProps = (state) => {
    return state;
}


Articles.T = {
    state: Object
};



export default withRouter(connect(mapStateToProps)(Articles));
