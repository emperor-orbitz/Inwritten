//          IMPORTS
import React from "react";
import {
  Button,
  Form,
  Checkbox,
  Icon,
  Select,
  Grid,
  Modal,
  Divider,
} from "semantic-ui-react";
import "../../Resources/styles/article.scss";
import { withRouter } from "react-router";

import { connect } from "react-redux";
import FetchArticles from "../../Controllers/article.controller";
import FetchDrafts from "../../Controllers/draft.controller";
import cat from "../Dashboard/categories";
import QuillTestNew from "./Components/QuillTestNew";
import QuillTestNewDesktop from "./Components/QuillTestNewDesktop";



function readFile(doc) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();

    reader.readAsDataURL(doc);
    reader.onloadend = function () {
      resolve(reader.result);
    }
  })

}
  
const desktopmodules ={
  toolbar:[

    ['bold', 'italic', 'blockquote'],
    ['link', 'image'],
    [{ 'header': "1" }, { "header": "2" }],

],
   //theme:"snow",
  clipboard: {
      // matchVisual: false
  },
  imageUploader:{
      upload: async file =>{
          let blob_image = await readFile(file) 

          return await new Promise((resolve, reject)=>{

              fetch("/drafts/save_image",
              {
                  method:"POST",
                  body:JSON.stringify({ image: blob_image}),
              
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': localStorage.getItem("hs_token")
                  },
                      credentials: 'include',
                      withCredentials: true,
                   
              
              }
              )
              .then(response => response.json())
              .then(result=>{
                  console.log(result);
                  resolve(result.data.url)
              })
              .catch(error =>{
                  reject("Upload failed")
                  console.error("Error:", error)
              })
          })
      }
  }
}




const modules = {
  toolbar:"#toolbar-container",
  // theme:"snow",
  clipboard: {
      // matchVisual: false
  },
  imageUploader:{
      upload: async file =>{
          let blob_image = await readFile(file) 

          return await new Promise((resolve, reject)=>{

              fetch("/drafts/save_image",
              {
                  method:"POST",
                  body:JSON.stringify({ image: blob_image}),
              
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': localStorage.getItem("hs_token")
                  },
                      credentials: 'include',
                      withCredentials: true,
                   
              
              }
              )
              .then(response => response.json())
              .then(result=>{
                  console.log(result);
                  resolve(result.data.url)
              })
              .catch(error =>{
                  reject("Upload failed")
                  console.error("Error:", error)
              })
          })
      }
  }
}


class AddPost extends React.Component {
  constructor(props) {
    super(props);

    // COMPNENENT STATE
    this.state = {
      editorHTML: "",
      editorJSON: "",
      open_share: false,
      copyToClipboard: "Copy to clipboard",
      share_data: {},

      buttonDisabled: false,
      dimmerLoad: false,
      error_message: "",
      success_message: "",
      privacy_value: true,
      enable_comments: true,
      post_title: "Untitled",
      featured_image: "/images/preview_featured2.jpg",
      createdAt: Date.now(),
      tag_value: "",
      post_category: "UNC",
      post_description: "",
      time_to_read: 5,
      tagMax: "",
      open_options: false,
      post_link: "",
      network_error: "",
      dynamicSave: " ",
      post_id: undefined,
    };

    this.handleTags = this.handleTags.bind(this);
    this.handlePostprivacy = this.handlePostprivacy.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  //CopyTocLipboard Button
  copyToClipboard = () => {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById(
      "dummy_id"
    ).value = `http://www.inwritten.com${this.state.share_data.post_link}`;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    this.setState({ copyToClipboard: "Copied!" });
  };

  //Close Share Modal
  closeShare = () => {
    this.setState({ open_share: false });
  };
  // Share to Whatsapp Button
  shareToWhatsApp = (e, data) => {
    e.preventDefault();
    let url = encodeURIComponent(
      `Hey, check out my new story on Inwritten. It's here: https://www.inwritten.com${data.post_link}`
    );
    window.location.href = `https://wa.me/?text=${url}`;
  };

  // Share to Facebook Button
  shareToFacebook = (e, data) => {
    e.preventDefault();
    let url = encodeURIComponent(`https://www.inwritten.com${data.post_link}`);
    window.open(
      "https://www.facebook.com/dialog/share?app_id=508448136537979&display=popup&href=" +
        url +
        "&redirect_uri=https%3A%2F%2Fwww.inwritten.com/stories",
      "facebook-share-dialog",
      "width=400,height=300",
      false
    );
  };

  // Open Share Modal
  openShare = (share_data) => {
    this.setState({
      open_share: true,
      share_data: share_data,
      copyToClipboard: "Copy to clipboard",
    });
  };

  /*
   *           HANDLE CHANGE EVENTS ON INPUTS
   */
  handleTags(e) {
    this.setState({ tag_value: e.target.value });
  }

  //Handle other Input fields
  handleInputs(e, prop = prop || "") {
    e.preventDefault();
    var { name, value } = e.target;

    if (prop == "") {
      switch (name) {
        case "title":
          this.setState({ post_title: value });
          break;

        case "time":
          this.setState({ time_to_read: value });
          break;

        case "description":
          this.setState({ post_description: value });
          break;
        case "tags":
          this.handleTags();
      }
    } else {
      switch (prop.name) {
        case "category":
          let category = prop.value;
          this.setState({ post_category: category });
          break;
      }
    }

    return null;
  }

  manageEditorState = (html, json, plaintext) => {
    this.state.editorHTML = html;
    this.state.editorJSON = json;
    //manage update
    if (plaintext.length % 20 == 0) {
      this.AddPostAsDraft(html, json);
    }
  };

  handlePostprivacy = (e, { value }) =>
    this.setState({ privacy_value: !this.state.privacy_value }); //Privacy Input handler
  handleEnableComments = (e, { value }) =>
    this.setState({ enable_comments: !this.state.enable_comments }); // Toggle Comments handler

  // Validate Input fields
  postValidation(
    title = this.state.post_title,
    duration = this.state.time_to_read,
    tags = this.state.tag_value
  ) {
    if (title.length == 0) {
      return "title-error";
    }

    if (duration.length != 0) {
      if (duration > 30) {
        return "time-error";
      } else if (duration < 1) {
        return "time-error";
      }
    }

    if (tags.split(",").length > 5) {
      return "tag-error";
    } else {
      return true;
    }

    //return true;
  }

  componentWillMount() {
    document.title = "New Story - Inwritten";
  }

  //UNSAFE ComponentWillReceiveProps
  componentWillReceiveProps(nextProps) {
    if (nextProps.StoryPage == true) {
      this.setState({ open_options: true }, () => {
        this.props.dispatch({ type: "WRITE A STORY", payload: true });
      });
    }
  }

  AddPostAsDraft(html, json) {
    this.setState({ dynamicSave: "Saving..." });

    let add = new FetchDrafts();
    var post = {
      _id: this.state.post_id,
      title: this.state.post_title,
      category: this.state.post_category,
      description: this.state.post_description.trim(),
      time_to_read: this.state.time_to_read,
      comments_enabled: this.state.enable_comments,
      public: false,
      body_html: html,
      body_schema: json,
      featured_image: this.state.featured_image,
      comments: [],
      tags: this.state.tag_value,
    };

    add
      .create_draft(post)
      .then((okay) => {
        console.log(okay, "this WAS MOTOR JAM");
        this.state.post_id = okay._id;
        this.state.post_link = okay.post_link;

        let present = this.props.DraftReducer.filter((v) => v._id == okay._id);
        // this.props.DraftReducer.forEach(element => {
        //   if(element._id == okay._id){
        //     console.log("I RAN UPDATE")
        //     this.props.dispatch({ type: 'UPDATE_DRAFT', payload: okay });

        //   }
        //   else{
        //     console.log("I RAN INSERT")
        //     this.props.dispatch({ type: 'INSERT_DRAFT', payload: okay });

        //   }
        // });
        if (present.length == 0) {
          console.log("I RAN INSERT");
          this.props.dispatch({ type: "INSERT_DRAFT", payload: okay });
        } else {
          console.log("I RAN UPDATE");

          this.props.dispatch({ type: "UPDATE_DRAFT", payload: okay });
        }

        this.setState({
          dynamicSave: "Saved",
        });
      })
      .catch((err) => {
        this.setState({
          dynamicSave: "Unable to save at the moment.." + err,
        });
      });
  }

  //SUBMIT New Story to Database
  addPost() {
    var add = new FetchArticles();
    var panel = new QuillTestNew();

    this.setState({
      buttonDisabled: true,
      dimmerLoad: true,
      network_error: ``,
    });
    var post = {
      _id: this.state.post_id,
      title: this.state.post_title,
      category: this.state.post_category,
      description: this.state.post_description.trim(),
      time_to_read: this.state.time_to_read,
      comments_enabled: this.state.enable_comments,
      public: this.state.privacy_value,
      body_html: this.state.editorHTML, //panel.exposedHTMLvalue,
      body_schema: this.state.editorJSON, //panel.exposedEditorValue,
      featured_image: this.state.featured_image,
      comments: [],
      tags: this.state.tag_value,
      published: true,
    };

    let val = this.postValidation();
    if (val === true) {
      add
        .create_article(post)
        .then((okay) => {
          console.log("came back with this fromDB", okay);
          this.state.post_link = okay.post_link;
          //let with_status = Object.assign({}, post, { published:true });
          this.props.dispatch({ type: "INSERT_ARTICLE", payload: okay });

          this.setState({
            success_message: " ",
            error_message: "",
            buttonDisabled: false,
            dimmerLoad: false,
            open_options: false,
          });

          this.openShare(okay);
        })
        .catch((err) => {
          this.setState({
            buttonDisabled: false,
            dimmerLoad: false,
            open_options: false,
            network_error: `Hey, It seems you are offline. Try again${err}`,
          });
        });
    } else if (val !== true) {
      this.setState({
        buttonDisabled: false,
        dimmerLoad: false,
        error_message: val,
      });
    }
  }

  //Close Modal
  close = () => {
    this.setState({ open_options: false });
  };

  //Toggle Featyure Image
  toggleDialogFeatured() {
    var photo = document.getElementById("photo");
    photo.click();
  }

  //Reaad Image Stream
  readFile(doc) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.readAsDataURL(doc);
      reader.onloadend = function () {
        resolve(reader.result);
      };
    });
  }

  //handle IMAGE File
  handle_profile_photo(ev) {
    this.readFile(ev.target.files[0]).then((result) => {
      this.setState({ featured_image: result });
    });
  }

  //LEAVE PAGE
  leavePage = ({ id, post_link }) => {
    this.setState({ open_share: false });

    window.history.replaceState("", "", "/app/edit/" + id);
    window.location = post_link;
  };

  //RENDER METHOD
  render() {
    var privacy_value =
      this.state.privacy_value == true ? "Visible" : " Not Visible";
    var comment_value =
      this.state.enable_comments == true
        ? "Commenting is enabled"
        : "Commenting is disabled";

    var categoryOptions = cat.categories;

    return (
      <div className="add-post">
        {/* <Container > */}
        <Grid stackable style={{ marginTop: "10px", height:"100%" }}>
          <Grid.Row centered>
          {
                screen.width < 500 ?
                <div id="toolbar-container">
                 <button className="ql-header" data-toggle="tooltip" data-placement="bottom" title="Add italic text <cmd+i>">H1</button>

                <button className="ql-bold" data-toggle="tooltip" data-placement="bottom" title="Bold">BOLD</button>
                <button className="ql-italic" data-toggle="tooltip" data-placement="bottom" title="Add italic text <cmd+i>">ITALIC</button>
                <button className="ql-underline" data-toggle="tooltip" data-placement="bottom" title="Add italic text <cmd+i>">ITALIC</button>
                <button className="ql-image" data-toggle="tooltip" data-placement="bottom" title="Add italic text <cmd+i>">ITALIC</button>
                <button className="ql-link" data-toggle="tooltip" data-placement="bottom" title="Add italic text <cmd+i>">ITALIC</button>

              </div>:" "
              }
      
            {this.state.network_error === "" ? (
              ""
            ) : (
              <Message warning className="notification-background">
              <Message.Header>Oops! Something happened!</Message.Header>
              <p>Hold on a sec! We'll fix this.</p>
            </Message>
            )}

            {this.state.error_message == "editor-error" ? (
              <Message warning className="notification-background">
              <p>Please write something first.</p>
            </Message>
            ) : (
              ""
            )}

            <Grid.Column
              mobile={16}
              tablet={16}
              computer={11}
              style={{ padding: "0px 5px", overflowY:"auto" }}
            >
              <p style={{ color: "silver" }}>
              <i> {this.state.dynamicSave}</i>
            </p>
              {/*EDITOR PANEL INITIAL */}
              {
                screen.width < 500 ? <QuillTestNew state={this.manageEditorState} modules={modules}/>:
                <QuillTestNewDesktop state={this.manageEditorState} modules={desktopmodules}/>
              }
              

              <Modal
                size="mini"
                open={this.state.open_share}
                onClose={this.closeShare}
                closeOnDimmerClick={false}
                closeIcon={
                  <Icon
                    name="times"
                    size="small"
                    color="black"
                    onClick={() => {
                      if (this.state.share_data.public == false) {
                        this.leavePage({
                          id: this.state.share_data._id,
                          post_link: this.state.share_data.post_link,
                        });
                      } else {
                        this.closeShare();
                      }
                    }}
                  />
                }
              >
                {/* {this.state.share_data.public == true ? */}
                <Modal.Content
                  style={{
                    minHeight: "200px",
                    background: "",
                    color: "black",
                    padding: "5%",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <Icon name="check circle" color="green" size="huge" />
                    <h4>Your story has been published </h4>
                    <p style={{ fontSize: "10px" }}>
                      {" "}
                      Preview and Share your story with your friends and other
                      connections{" "}
                    </p>

                    <Button
                      icon="internet explorer"
                      labelPosition="left"
                      content="View your story live"
                      size="small"
                      fluid
                      onClick={() => {
                        this.leavePage({
                          id: this.state.share_data._id,
                          post_link: this.state.share_data.post_link,
                        });
                      }}
                    />
                    <br />
                    <Button
                      icon="copy outline"
                      labelPosition="left"
                      content={this.state.copyToClipboard}
                      size="small"
                      onClick={this.copyToClipboard}
                      fluid
                      disabled={this.state.copyToClipboard == "Copied!"}
                    />
                    <br />
                    <Button
                      onClick={(e) =>
                        this.shareToFacebook(e, this.state.share_data)
                      }
                      color="facebook"
                      icon="facebook"
                      labelPosition="left"
                      content="Share to facebook"
                      fluid
                      size="small"
                    />
                    <br />
                    <Button
                      onClick={(e) =>
                        this.shareToWhatsApp(e, this.state.share_data)
                      }
                      color="green"
                      fluid
                      icon="whatsapp"
                      labelPosition="left"
                      content="Share to WhatsApp"
                      size="small"
                    />
                  </div>
                </Modal.Content>
              </Modal>

              <Modal
                size="small"
                dimmer="inverted"
                style={{ color: "black !important" }}
                open={this.state.open_options}
                onClose={this.close}
              >
                <Modal.Header>
                  <h3 style={{ margin: "1px 2%", color: "black" }}>Settings</h3>
                </Modal.Header>

                <Modal.Content scrolling>
                  <Modal.Description>
                    <div className="editor-side1" id="editor-side1">
                      <p style={{ color: "silver" }}>
                        Preview story descriptions, tags and featured image
                        which makes your story unique.
                      </p>
                      <div className="featured-pix-block">
                        <img
                          src={this.state.featured_image}
                          className="featured-image"
                        />
                        <input
                          className="featured-pix-cover"
                          onChange={this.handle_profile_photo.bind(this)}
                          type="file"
                          id="photo"
                          style={{ visibility: "hidden" }}
                        />
                      </div>

                      <Form size="small">
                        <p>
                          <b
                            style={{ color: "#1c243c", cursor: "pointer" }}
                            onClick={this.toggleDialogFeatured.bind(this)}
                          >
                            Set featured Image
                          </b>
                        </p>
                        <Divider />
                        <Form.Field
                          name="title"
                          maxLength="50"
                          value={this.state.post_title}
                          onChange={this.handleInputs.bind(this)}
                          control="input"
                          placeholder="Story Title"
                          required
                        />
                        {this.state.error_message == "title-error" ? (
                          <p
                            style={{
                              color: "red",
                              width: "90%",
                              borderRadius: "0px",
                            }}
                          >
                            {" "}
                            Title is required
                          </p>
                        ) : (
                          ""
                        )}

                        <Form.Field
                          name="time"
                          maxLength="2"
                          min="0"
                          type="number"
                          value={this.state.time_to_read}
                          control="input"
                          placeholder="How many minutes read?"
                          onChange={this.handleInputs.bind(this)}
                        />
                        {this.state.error_message == "time-error" ? (
                          <p
                            style={{
                              color: "red",
                              width: "90%",
                              borderRadius: "0px",
                            }}
                          >
                            {" "}
                            The duration should not be less than 0 and not
                            greater than 30{" "}
                          </p>
                        ) : (
                          ""
                        )}
                        <Form.Field
                          name="description"
                          maxLength={70}
                          control="textarea"
                          placeholder="Meta Description for your story"
                          value={this.state.post_description}
                          onChange={this.handleInputs.bind(this)}
                        />

                        {this.state.error_message == "description-error" ? (
                          <p
                            style={{
                              color: "red",
                              width: "90%",
                              borderRadius: "0px",
                            }}
                          >
                            {" "}
                            Description length is small
                          </p>
                        ) : (
                          ""
                        )}
                        <Form.Field
                          name="tags"
                          value={this.state.tag_value}
                          onChange={this.handleTags}
                          control="input"
                          placeholder="Featured tags e.g sport, gym, race. Separate with( , )"
                        />
                        {this.state.error_message == "tag-error" ? (
                          <p
                            style={{
                              color: "red",
                              width: "90%",
                              borderRadius: "0px",
                            }}
                          >
                            {" "}
                            Maximum of 5 tags
                          </p>
                        ) : (
                          ""
                        )}

                        <Select
                          name="category"
                          className="custom-label"
                          value={this.state.post_category}
                          onChange={this.handleInputs.bind(this)}
                          options={categoryOptions}
                          style={{ width: "100%" }}
                        />
                        <br />
                        <br />
                        <br />

                        <Form.Field>
                          <Checkbox
                            slider
                            name="radioGroup1"
                            checked={this.state.privacy_value === true}
                            onChange={this.handlePostprivacy}
                            label={privacy_value}
                            className="small-fonts"
                          />
                        </Form.Field>

                        <Form.Field>
                          <Checkbox
                            slider
                            name="radioGroup2"
                            checked={this.state.enable_comments === true}
                            onChange={this.handleEnableComments}
                            label={comment_value}
                            className="small-fonts"
                          />
                        </Form.Field>
                      </Form>
                      <br />
                    </div>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    disabled={this.state.buttonDisabled}
                    type="submit"
                    size="mini"
                    title="back"
                    onClick={() => {
                      this.setState({ open_options: false });
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={this.state.buttonDisabled}
                    type="submit"
                    size="mini"
                    color="green"
                    title="save"
                    onClick={this.addPost}
                  >
                    Publish
                  </Button>
                </Modal.Actions>
              </Modal>

              {/* mODAL ENDS HERE */}
            </Grid.Column>
            {/* 
            <Grid.Column mobile={16} tablet={2} computer={2}>

             

            </Grid.Column> */}
          </Grid.Row>
        </Grid>

        {/* </Container> */}
      </div>
    );
  }
}

//Map Redux State to Props
var mapStatetoProps = (state) => {
  return state;
};

var mapDispatchtoProps = (dispatch) => {
  return {
    addPost: () => {
      return dispatch({ type: " " });
    },
  };
};

export default withRouter(connect(mapStatetoProps)(AddPost));
