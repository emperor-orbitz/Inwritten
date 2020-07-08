import React from "react";
import {
  Button,
  Form,
  Checkbox,
  Loader,
  Icon,
  Select,
  Grid,
  Modal,
  Divider
} from "semantic-ui-react";
import "../../Resources/styles/article.scss";
import { withRouter } from "react-router";

import { connect } from "react-redux";
import FetchArticles from "../../Controllers/article.controller";
import cat from "../Dashboard/categories";
import QuillTestEdit from "./Components/QuillTestEdit";
import FetchDrafts from "../../Controllers/draft.controller";

class EditPost extends React.Component {
  constructor(props) {
    super(props);

    //COMPONENT STATE
    this.state = {
      tag_value: "",
      tagMax: "",
      body_html: "",
      buttonDisabled: false,
      dimmerLoad: false,
      error_message: "",
      success_message: "",
      privacy_value: false,
      enable_comments: true,
      post_title: "",
      featured_image: "/images/preview_featured2.jpg",
      createdAt: Date.now(),
      comments: [],
      post_category: "UNC",
      post_description: "",
      time_to_read: 5,
      body_schema: "",
      open_options: false,
      likes: 0,
      post_link: "",

      copyToClipboard: "Copy to clipboard",
      open_share: false,
      share_data: {},
      dynamicSave: " ",
      post_id: "",
    };

    this.handlePostprivacy = this.handlePostprivacy.bind(this);
  }

  /*          HANDLE CHANGE EVENTS ON INPUTS (handle*)
   */

  handlePostprivacy = (e, { value }) =>
    this.setState({ privacy_value: !this.state.privacy_value }); //Handle post Privacy
  handleEnableComments = (e, { value }) =>
    this.setState({ enable_comments: !this.state.enable_comments }); //Toggle Comments
  close = () => {
    this.setState({ open_options: false });
  }; //Toggle Options Modal
  handleTags = (e) => this.setState({ tag_value: e.target.value }); //handle Tags input

  //handle other input items
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

  AddPostAsDraft(html, json) {
    console.log("Saving into DB CONTNET:..", html);
    this.setState({ dynamicSave: "Saving..." });

    let add = new FetchDrafts();
    var post = {
      _id: this.props.match.params.postID,
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
        console.log(okay, "okay_newa");
        

        console.log("I RAN UPDATE");
        this.props.dispatch({ type: "UPDATE_DRAFT", payload: okay });

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

  //validate story settings

  postValidation(
    title = this.state.post_title,
    description = this.state.post_description,
    duration = this.state.time_to_read
  ) {
    if (title.length == 0) return "title-error";
    else if (duration.length !== 0) {
      if (duration > 30) return "time-error";
      else if (duration < 0) return "time-error";
    } else {
      return true;
    }

    return true;
  }

  // SUBMIT updated Content to Database
  updatePost = () => {
    var add = new FetchArticles();
    var panel = new QuillTestEdit();
    this.setState({ buttonDisabled: true, dimmerLoad: true });

    const post = {
      _id: this.props.match.params.postID,
      title: this.state.post_title.trim(),
      category: this.state.post_category,
      description: this.state.post_description.trim(),
      time_to_read: this.state.time_to_read,
      comments_enabled: this.state.enable_comments,
      public: this.state.privacy_value,
      body_html: panel.exposedHTMLvalue,
      body_schema: panel.exposedEditorValue,
      featured_image: this.state.featured_image,
      post_link: this.state.post_link,
      tags: this.state.tag_value,
      published: true,
    };

    let val = this.postValidation();
    if (val === true) {
      add
        .update_article(post)
        .then((okay) => {
          console.log(post, okay, "POST AND OKAY");
          this.state.post_link = post.post_link;

          this.props.dispatch({ type: "UPDATE_ARTICLE", payload: post });

          this.setState({
            success_message: "",
            error_message: "",
            buttonDisabled: false,
            dimmerLoad: false,
            open_options: false,
          });

          this.openShare(post);
        })
        .catch((err) => {
          this.setState({
            buttonDisabled: false,
            dimmerLoad: false,
            open_options: false,
            network_error: `Sorry, there was an error with your article! We would fix this soon ${err}`,
          });
        });
    } else if (val !== true) {
      this.setState({
        buttonDisabled: false,
        dimmerLoad: false,
        error_message: val,
      });
    }
  };

  //componentwillMount
  componentWillMount() {
    document.title = "Editing Draft - Inwritten";
  }

  /*
   *           REACTJS LIFECYCLE HOOKS
   */

  //UNSAFE //COMPONENT

  componentWillReceiveProps(nextProps) {
    if (nextProps.EditPage == true) {
      this.setState({ open_options: true }, () => {
        this.props.dispatch({ type: "WRITE A STORY2", payload: true });
      });
    }
  }

  fillDraft() {
    console.log(this.props);
    for (var x of this.props.DraftReducer) {
      if (x._id == this.props.match.params.postID) {
        console.log("SEEN THE XXX FOR DRAFTS:", x);
        //Retrieve data except from featured_image
        this.setState({
          post_id: x._id,
          post_title: x.title,
          post_description: x.description,
          post_category: x.category,
          privacy_value: x.public,
          enable_comments: x.comments_enabled,
          time_to_read: x.time_to_read,
          body_schema: x.body_schema,
          body_html: x.body_html,
          likes: x.likes,
          post_link: x.post_link,
          tag_value: x.tags,
          featured_image: x.featured_image,
        });
      }
    }
  }

  componentDidMount() {
    //Fetch featured_image
    let { postID } = this.props.match.params;
    var fetch_image = new FetchArticles();
    fetch_image.fetch_image(postID).then((data) => {
      this.setState({ featured_image: data });
    });
    this.fillDraft();
  }

  // SHARE TO WHATSAPP

  shareToWhatsApp = (e, data) => {
    e.preventDefault();
    let url = encodeURIComponent(
      `Hey, check out my new story on Inwritten. It's here: https://www.inwritten.com${data.post_link}`
    );
    window.location.href = `https://wa.me/?text=${url}`;
  };

  // SHARE TO FACEBOOK
  shareToFacebook = (e, data) => {
    e.preventDefault();
    let url = encodeURIComponent(
      `https://www.inwritten.com${this.state.post_link}`
    );
    window.open(
      "https://www.facebook.com/dialog/share?app_id=508448136537979&display=popup&href=" +
        url +
        "&redirect_uri=https%3A%2F%2Fwww.inwritten.com/stories",
      "facebook-share-dialog",
      "width=400,height=300",
      false
    );
  };

  //OPEN SHARE MODAL
  openShare = (share_data) => {
    console.log("open share", share_data);
    this.setState({
      share_data: share_data,
      open_share: true,
      copyToClipboard: "Copy to clipboard",
    });
  };

  //COPY TO CLIPBOARD FUNCTION
  copyToClipboard = () => {
    var dummy = document.createElement("textarea");
    // dummy.style.display="none";
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById(
      "dummy_id"
    ).value = `http://www.inwritten.com${this.state.post_link}`;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    this.setState({ copyToClipboard: "Copied!" });
  };

  //close SHARE Modal
  closeShare = () => {
    this.setState({ open_share: false });
  };

  //handle Featured Image click
  toggleDialogFeatured() {
    var photo = document.getElementById("photo");
    photo.click();
  }

  // Read Image binary
  readFile(doc) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.readAsDataURL(doc);

      reader.onloadend = function () {
        resolve(reader.result);
      };
    });
  }

  //Leave Page
  leavePage = ({ id, post_link }) => {
    this.setState({ open_share: false });
    window.history.pushState("", "", "/app/edit-post/" + id);
    window.location = post_link;
  };

  // handle Profile Photo
  handle_profile_photo(ev) {
    this.readFile(ev.target.files[0]).then((result) => {
      this.setState({ featured_image: result });
    });
  }

  // Render METHOD
  render() {
    var privacy_value =
      this.state.privacy_value == true
        ? "Publish to the World"
        : "Save Save to draft";
    var comment_value =
      this.state.enable_comments == true
        ? "Commenting is enabled"
        : "Commenting is disabled";
    var categoryOptions = cat.categories;

    return (
      <div className="add-post">
        <Grid stackable>
          <Grid.Row centered>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={11}
              style={{ margin: "5px 5px" }}
            >
              {this.state.success_message === "" ? (
                ""
              ) : (
                <div className="notification-background">
                  <div style={{ width: "90%", color: "green", background: "" }}>
                    <div>
                      <span
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={function () {
                          var note = document.getElementsByClassName(
                            "notification-background"
                          );
                          note[0].style.display = "none";
                        }}
                      >
                        <Icon
                          name="close"
                          onClick={() => {
                            this.state.success_message = "";
                          }}
                        />{" "}
                      </span>
                      <Icon
                        name="check circle outline"
                        color="green"
                        size="big"
                      />
                      {this.state.success_message}{" "}
                      {this.state.privacy_value == true ? (
                        <a
                          href={`${this.state.post_link}`}
                          target="_blank"
                          style={{ color: "black" }}
                        >
                          <u>here</u>{" "}
                        </a>
                      ) : (
                        "in drafts"
                      )}
                    </div>
                  </div>
                </div>
              )}

              {this.state.network_error !== "" ? (
                <p style={{ color: "red", width: "90%", borderRadius: "0px" }}>
                  {" "}
                  {this.state.network_error}{" "}
                </p>
              ) : (
                ""
              )}
              {this.state.error_message == "editor-error" ? (
                <p style={{ color: "red", width: "90%", borderRadius: "0px" }}>
                  <Icon name="close" color="yellow" size="big" /> You've not
                  written anything yet!{" "}
                </p>
              ) : (
                ""
              )}
            </Grid.Column>

            <Grid.Column
              mobile={16}
              tablet={16}
              computer={11}
              style={{ padding: "0px 5px" }}
            >
              <p style={{ color: "silver" }}>
                <i> {this.state.dynamicSave}</i>
              </p>
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
                      if (this.state.share_data.public == true)
                        this.leavePage({
                          id: this.state.share_data._id,
                          post_link: this.state.share_data.post_link,
                        });
                      else this.closeShare();
                    }}
                  />
                }
              >
                {this.state.share_data.public == true ? (
                  <Modal.Content
                    scrolling
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

                      <a href={this.state.share_data.post_link}>
                        <Button
                          icon="internet explorer"
                          labelPosition="left"
                          content="View your story live"
                          size="small"
                          fluid
                        />
                      </a>
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
                ) : (
                  <Modal.Content
                    scrolling
                    style={{
                      minHeight: "200px",
                      background: "",
                      color: "black",
                      padding: "5%",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Icon name="check circle" color="green" size="huge" />
                      <h4>Your update has successfully been published </h4>
                      <Button onClick={this.closeShare}>
                        Continue Editing
                      </Button>
                    </div>
                  </Modal.Content>
                )}
              </Modal>

              {/*EDITOR PANEL INITIALIZED HERE */}

              <QuillTestEdit
                state={this.manageEditorState}
                initialValue={this.state.body_schema}
              />

              <Modal
                size="small"
                dimmer="inverted"
                style={{ color: "white !important" }}
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

                      <Form size="mini">
                        <p>
                          <b
                            style={{ color: "teal", cursor: "pointer" }}
                            onClick={this.toggleDialogFeatured.bind(this)}
                          >
                            Change featured Image
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
                    onClick={this.updatePost}
                  >
                    Save and Publish
                  </Button>
                </Modal.Actions>
              </Modal>
            </Grid.Column>

            {/* <Grid.Column mobile={0} tablet={2} computer={2} style={{height:'0px', width:'0px'}}>

         
            </Grid.Column> */}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

//MAP Redux State
var mapStatetoProps = (state) => {
  return state;
};

export default withRouter(connect(mapStatetoProps)(EditPost));
