
//          IMPORTS
import React from 'react';
import { Button, Form, Checkbox, Icon, Select, Grid, Modal } from 'semantic-ui-react';
import '../../Resources/styles/article.scss';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller'
import cat from '../Dashboard/categories';
import QuillTestNew from './Components/QuillTestNew';
import { Link } from "react-router-dom"





class AddPost extends React.Component {

  constructor(props) {
    super(props)

    // COMPNENENT STATE
    this.state = {
      open_share: false,
      copyToClipboard: "Copy to clipboard",
      share_data: {},

      buttonDisabled: false,
      dimmerLoad: false,
      error_message: '',
      success_message: '',
      privacy_value: true,
      enable_comments: true,
      post_title: '',
      featured_image: '/images/preview_featured2.jpg',
      createdAt: Date.now(),
      tag_value: '',
      post_category: 'all',
      post_description: '',
      time_to_read: 5,
      tagMax: '',
      open_options: false,
      post_link: "",
      network_error: ""
    }

    this.handleTags = this.handleTags.bind(this);
    this.handlePostprivacy = this.handlePostprivacy.bind(this);
    this.addPost = this.addPost.bind(this);

  }




  /*
  *           HANDLE CHANGE EVENTS ON INPUTS
  */
  handleTags(e) {
    this.setState({ tag_value: e.target.value });

  }




  //Handle other Input fields
  handleInputs(e, prop = prop || '') {
    e.preventDefault();
    var { name, value } = e.target;

    if (prop == "") {
      switch (name) {

        case 'title':
          this.setState({ post_title: value });
          break;

        case 'time':
          this.setState({ time_to_read: value });
          break;

        case 'description':
          this.setState({ post_description: value });
          break;
        case 'tags':
          this.handleTags();

      }
    }
    else {

      switch (prop.name) {

        case 'category':
          let category = prop.value;
          this.setState({ post_category: category });
          break;

      }

    }

    return null;


  }



  handlePostprivacy = (e, { value }) => this.setState({ privacy_value: !this.state.privacy_value }); //Privacy Input handler
  handleEnableComments = (e, { value }) => this.setState({ enable_comments: !this.state.enable_comments })// Toggle Comments handler



  // Validate Input fields
  postValidation(title = this.state.post_title, duration = this.state.time_to_read, tags = this.state.tag_value) {

    if (title.length == 0) {
      return 'title-error';
    }

    if (duration.length != 0) {
      if (duration > 30) { return "time-error" }
      else if (duration < 1) { return "time-error" }
    }


    if (tags.split(',').length > 5) {
      return "tag-error";

    }

    else {

      return true;

    }

    //return true;
  }



  //UNSAFE ComponentWillReceiveProps
  componentWillReceiveProps(nextProps) {

    if (nextProps.StoryPage == true) {
      this.setState({ open_options: true }, () => {
        this.props.dispatch({ type: 'WRITE A STORY', payload: true })
      })
    }
  }



  // Share to Whatsapp Button
  shareToWhatsApp = (e, data) => {

    e.preventDefault()
    let url = encodeURIComponent(`Hey, check out my new story on Inwritten. It's here: https://www.inwritten.com${data.post_link}`)
    window.location.href = `https://wa.me/?text=${url}`
  }


  // Share to Facebook Button
  shareToFacebook = (e, data) => {

    e.preventDefault()
    let url = encodeURIComponent(`https://www.inwritten.com${data.post_link}`)
    window.open(
      'https://www.facebook.com/dialog/share?app_id=508448136537979&display=popup&href=' + url + '&redirect_uri=https%3A%2F%2Fwww.inwritten.com/stories',
      'facebook-share-dialog',
      'width=400,height=300', false);

  }



  // Open Share Modal
  openShare = (share_data) => {

    this.setState({ open_share: true, share_data: share_data, copyToClipboard: "Copy to clipboard" })
  }


  //CopyTocLipboard Button
  copyToClipboard = () => {
    var dummy = document.createElement("textarea")
    document.body.appendChild(dummy)
    dummy.setAttribute("id", 'dummy_id');
    document.getElementById("dummy_id").value = `http://www.inwritten.com${this.state.share_data.post_link}`;
    dummy.select()
    document.execCommand("copy");
    document.body.removeChild(dummy);
    this.setState({ copyToClipboard: "Copied!" })
  }


  //Close Share Modal
  closeShare = () => {
    this.setState({ open_share: false })
  }







  //SUBMIT New Story to Database
  addPost() {
    var add = new FetchArticles()
    var panel = new QuillTestNew();

    this.setState({ buttonDisabled: true, dimmerLoad: true, network_error: `` });

    var post = {
      title: this.state.post_title.trim(),
      category: this.state.post_category,
      description: this.state.post_description.trim(),
      time_to_read: this.state.time_to_read,
      comments_enabled: this.state.enable_comments,
      public: this.state.privacy_value,
      body_html: panel.exposedHTMLvalue,
      body_schema: panel.exposedEditorValue,
      featured_image: this.state.featured_image,
      comments: [],
      tags: this.state.tag_value

    }

    let val = this.postValidation();
    if (val === true) {

      add.create_article(post).then(
        (okay) => {

          this.state.post_link = okay.post_link;
          let with_id = Object.assign({}, post, { _id: okay._id, post_link: okay.post_link });
          this.props.dispatch({ type: 'INSERT_ARTICLE', payload: with_id });

          this.setState({
            success_message: ' ',
            error_message: '',
            buttonDisabled: false,
            dimmerLoad: false,
            open_options: false
          })

          this.openShare(with_id)

        })
        .catch(err => {
          this.setState({
            buttonDisabled: false,
            dimmerLoad: false,
            open_options: false,
            network_error: `Hey, It seems you are offline. Try again`
          })
        })
    }
    else if (val !== true) {
      this.setState({
        buttonDisabled: false,
        dimmerLoad: false,
        error_message: val,

      })

    }


  }


  //Close Modal
  close = () => {
    this.setState({ open_options: false })
  }


  //Toggle Featyure Image
  toggleDialogFeatured() {
    var photo = document.getElementById('photo');
    photo.click();
  }

  //Reaad Image Stream
  readFile(doc) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.readAsDataURL(doc);
      reader.onloadend = function () {
        resolve(reader.result);
      }
    })

  }


  //handle IMAGE File
  handle_profile_photo(ev) {

    this.readFile(ev.target.files[0]).then(result => {

      this.setState({ featured_image: result });
    })
  }


  //LEAVE PAGE
  leavePage = ({ id, post_link }) => {
    this.setState({ open_share: false })

    window.history.replaceState("", "", "/app/edit-post/" + id);
    window.location = post_link
  }



  //RENDER METHOD
  render() {

    var privacy_value = (this.state.privacy_value == true) ? 'Publish to the World' : ' Save to draft';
    var comment_value = (this.state.enable_comments == true) ? 'Commenting is enabled' : 'Commenting is disabled';

    var categoryOptions = cat.categories;



    return (


      <div className='add-post'>

        <Grid stackable>
          <Grid.Row  >

            <Grid.Column mobile={16} tablet={16} computer={16} style={{ padding: '0px 5px' }}  >

              {this.state.network_error === '' ?
                ""
                :
                <div className='notification-background'>
                  <div style={{ width: '90%', color: 'red', background: '', padding: '3px 5%' }} ><div>
                    <span style={{ float: 'right', cursor: 'pointer' }} onClick={function () {
                      var note = document.getElementsByClassName('notification-background');
                      note[0].style.display = 'none';
                    }} ><Icon name='close' onClick={() => { this.state.success_message = "" }} /> </span>
                    <Icon name='unlink' size='big' />
                    <p style={{ padding: '5px', color: 'red', width: '90%', borderRadius: '0px' }}>  {this.state.network_error} </p>
                  </div>

                  </div>
                </div>
              }


              {
                this.state.error_message == 'editor-error' ?
                  <p style={{ padding: '5px 5%', color: 'red', width: '90%', borderRadius: '0px' }}><Icon name="close" color="yellow" size='big' /> You've not written anything yet! </p>
                  : ''
              }

              { /*EDITOR PANEL INITIAL */}

              <QuillTestNew />

            </Grid.Column>

            <Grid.Column mobile={16} tablet={2} computer={2}>

              <Modal size='mini' open={this.state.open_share} onClose={this.closeShare} closeOnDimmerClick={false} closeIcon={<Icon name="times" size="small" color="black" onClick={() => {
                if (this.state.share_data.public == true) {
                  this.leavePage({ id: this.state.share_data._id, post_link: this.state.share_data.post_link })

                }
                else {
                  this.closeShare()
                }


              }} />} >

                {this.state.share_data.public == true ?
                  <Modal.Content style={{ minHeight: '200px', background: "", color: 'black', padding: '5%' }}  >
                    <div style={{ textAlign: 'center' }}>
                      <Icon name="check circle" color="green" size="huge" />
                      <h4 >Your story has been published  </h4>
                      <p style={{ fontSize: "10px" }}> Preview and Share your story with your friends and other connections </p>

                      <Button icon="internet explorer" labelPosition='left' content="View your story live" size='small' fluid onClick={() => {
                        this.leavePage({ id: this.state.share_data._id, post_link: this.state.share_data.post_link })
                      }
                      } />
                      <br />
                      <Button icon="copy outline" labelPosition='left' content={this.state.copyToClipboard} size='small' onClick={this.copyToClipboard} fluid disabled={this.state.copyToClipboard == "Copied!"} />
                      <br />
                      <Button onClick={(e) => this.shareToFacebook(e, this.state.share_data)}
                        color="facebook" icon="facebook" labelPosition='left' content='Share to facebook' fluid size='small' />
                      <br />
                      <Button onClick={(e) => this.shareToWhatsApp(e, this.state.share_data)} color="green" fluid icon="whatsapp" labelPosition='left' content='Share to WhatsApp' size='small' />
                    </div>
                  </Modal.Content>
                  :
                  <Modal.Content style={{ minHeight: '200px', background: "", color: 'black', padding: '5%' }}  >
                    <div style={{ textAlign: 'center' }}>
                      <Icon name="check circle" color="green" size="huge" />
                      <h4 >Your Draft has been Saved  </h4>
                      <Button as={Link} to={{ pathname: "/app/edit-post/" + this.state.share_data._id }} size="small">Continue Editing</Button>

                    </div>
                  </Modal.Content>

                }
              </Modal>


              <Modal size="small" basic style={{ color: "white !important" }} open={this.state.open_options} onClose={this.close}  >
                <h3 style={{ margin: '1px 2%', color: "white" }}>Story Settings</h3>
                <Modal.Content image >

                  <div className="featured-pix-block">
                    <img src={this.state.featured_image} className="featured-image" />
                    <input className="featured-pix-cover" onChange={this.handle_profile_photo.bind(this)}
                      type='file' id='photo' style={{ visibility: 'hidden' }} />

                    <div className="featured-pix-cover" onClick={this.toggleDialogFeatured.bind(this)}>
                      Set Preview Featured Image
                    </div>
                  </div>

                  <Modal.Description>

                    <div className='editor-side1' id='editor-side1'>
                      <Form size="mini">

                        <Form.Field name='title' maxLength='50' value={this.state.post_title} onChange={this.handleInputs.bind(this)} control='input' placeholder='Story Title' required />
                        {
                          this.state.error_message == 'title-error' ?
                            <p style={{ color: 'red', width: '90%', borderRadius: '0px' }}> Title is required</p>
                            : ''
                        }

                        <Form.Field name='time' maxLength='2' min='0' type="number" value={this.state.time_to_read} control='input' placeholder="How many minutes read?" onChange={this.handleInputs.bind(this)} />
                        {
                          this.state.error_message == 'time-error' ?
                            <p style={{ color: 'red', width: '90%', borderRadius: '0px' }}> The duration should not be less than 0 and not greater than 30 </p>
                            : ''
                        }
                        <Form.Field name='description' maxLength={70} control='textarea' placeholder='Meta Description for your story' value={this.state.post_description} onChange={this.handleInputs.bind(this)} />

                        {
                          this.state.error_message == 'description-error' ?
                            <p style={{ color: 'red', width: '90%', borderRadius: '0px' }}>  Description length is small</p>
                            : ''
                        }
                        <Form.Field name='tags' value={this.state.tag_value} onChange={this.handleTags} control='input' placeholder='Featured tags e.g sport, gym, race. Separate with( , )' />
                        {
                          this.state.error_message == 'tag-error' ?
                            <p style={{ color: 'red', width: '90%', borderRadius: '0px' }}>  Maximum of 5 tags</p>
                            : ''
                        }

                        <Select name='category' className="custom-label"
                          value={this.state.post_category} onChange={this.handleInputs.bind(this)}
                          options={categoryOptions} />
                        <br /><br /><br />

                        <Form.Field>

                          <Checkbox
                            slider
                            name='radioGroup1'
                            checked={this.state.privacy_value === true}
                            onChange={this.handlePostprivacy}
                            label={privacy_value}
                            className='small-fonts' />
                        </Form.Field>


                        <Form.Field>

                          <Checkbox
                            slider
                            name='radioGroup2'
                            checked={this.state.enable_comments === true}
                            onChange={this.handleEnableComments}
                            label={comment_value}
                            className='small-fonts' />

                        </Form.Field>
                      </Form>
                      <br />
                    </div>




                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button disabled={this.state.buttonDisabled} type='submit' size='mini' title='back'
                    onClick={() => { this.setState({ open_options: false }) }} >
                    Back
                </Button>
                  <Button disabled={this.state.buttonDisabled} type='submit' size='mini' color="green" title='save'
                    onClick={this.addPost} >
                    Publish
                </Button>

                </Modal.Actions>
              </Modal>

            </Grid.Column>

          </Grid.Row>



        </Grid>



      </div> )


  }
}

//Map Redux State to Props
var mapStatetoProps = (state) => {
  return state;
}



export default withRouter(connect(mapStatetoProps)(AddPost));
