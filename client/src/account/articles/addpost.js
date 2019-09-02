
/*
*
*           IMPORTS
*
*/


import React, { Component } from 'react';
import { Button, Form, Checkbox, Input,Header, Loader, Sticky, Icon, Message, Select, Grid } from 'semantic-ui-react';
import './article.scss';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import FetchArticles from '../../../controllers/articleController'
import EditorPanel from './editor-panel';

function DimmerLoad(props) {
  return <Loader active={props.active} size={props.size} inline />

}
/*
function HoverableDiv (props){
  return (
  <div className='image-thumbnail-template-cover'>

 {props.children}

 <div className='template-thumbnail-hover'> <h5>{props.name} </h5>
 <h6>{props.type}</h6>
 </div>
  
  </div>
  ) 
} */



class AddPost extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      buttonDisabled: false,
      dimmerLoad: false,
      ERROR_MESSAGE: '',
      SUCCESS_MESSAGE: '',
      privacy_value: false,
      enable_comments: true,
      post_title: '',
      featured_image: '',
      createdAt: Date.now(),
      tag_value:'',
      post_category: 'all',
      post_description: '',
      time_to_read: 5,
      tagMax:''
      //body: this.state.editorState
    }

  this.handleTags =this.handleTags.bind(this);
    this.handlePostprivacy = this.handlePostprivacy.bind(this);

  }

  /*
  *
  *           HANDLE CHANGE EVENTS ON INPUTS
  *
  */
handleTags(e){
//alert(e.target.value);
this.setState({tag_value:e.target.value});




}

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
        //this.setState({post_tags:value})
        alert('fu');

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



  handlePostprivacy = (e, { value }) => this.setState({ privacy_value: !this.state.privacy_value });
  handleEnableComments = (e, { value }) => this.setState({ enable_comments: !this.state.enable_comments })




  postValidation(title = this.state.post_title, duration = this.state.time_to_read, tags= this.state.tag_value) {
    //console.log(tags.length);

    if (window.editor.length < 8) {return 'editor-error'; }

    if (title.length == 0) {
      document.getElementById('editor-side2').style.display = 'none';
      document.getElementById('editor-side1').style.display = 'block';
      return 'title-error';
    }

   if (duration.length != 0) {
      if (duration > 30){ return "time-error" } 
      else if (duration < 1){ return "time-error"}
    }


    if( tags.split(',').length > 5 ){
  return "tag-error";

}

    else {

      return true;

    }

    //return true;
  }





  addPost() {
    var add = new FetchArticles()
    var panel = new EditorPanel();
    var body = panel.exposedEditorValue;
    this.setState({ buttonDisabled: true, dimmerLoad: true });

    this.setState({ NETWORK_ERROR: `` });

    var post = {
      title: this.state.post_title.trim(),
      createdAt: Date.now(),
      category: this.state.post_category,
      description: this.state.post_description.trim(),
      time_to_read: this.state.time_to_read,
      comments_enabled: this.state.enable_comments,
      public: this.state.privacy_value,
      body: body,
      featured_image:this.state.featured_image


    }

    let val = this.postValidation();
    //alert val
    if (val === true) {

      add.create_article(post).then(
        (okay) => {
          //return _ID

          let with_id = Object.assign({}, post, { _id: okay.RETURN });

          this.props.dispatch({ type: 'INSERT_ARTICLE', payload: with_id });

          this.setState({
            SUCCESS_MESSAGE: 'YOUR ARTICLE HAS BEEN CREATED',
            ERROR_MESSAGE: '',
            buttonDisabled: false, dimmerLoad: false
          });


          var note = document.getElementsByClassName('notification-background');
          note[0].classList.remove('reverse-anime');

        }


      ).catch(
        (err) => {
          this.setState({ buttonDisabled: false, dimmerLoad: false });

          this.setState({ NETWORK_ERROR: `Hey, It seems you are offline. Check your internet connection` });
        }
      );
    }
    else if (val !== true) {
      this.setState({ buttonDisabled: false, dimmerLoad: false });
   
      this.setState({ ERROR_MESSAGE: val });

    }


  }









  /*
  *
  *           REACTJS LIFECYCLE HOOKS
  *
  */

  componentDidMount() {


    
  }


  toggleDialogFeatured() {
    var photo = document.getElementById('photo');
    photo.click();
  }


  readFile(doc) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.readAsDataURL(doc);

      reader.onloadend = function () {
        resolve(reader.result);
      }
    })

  }

  handle_profile_photo(ev) {
    
    this.readFile(ev.target.files[0]).then((result) => {

      //LOL
      this.setState({ featured_image: result });
    })
  }





  /*
  *
  *          RENDER FILE
  *
  */

  render() {


    //console.log('From addpost page', this.props.ProfileReducer);
    var privacy_value = (this.state.privacy_value == true) ? 'Publish to the World' : ' Save to draft';
    var comment_value = (this.state.enable_comments == true) ? 'Commenting is enabled' : 'Commenting is disabled';

    var categoryOptions = [
      {
        key: 1,
        value: 'all',
        text: 'Select Category',

      },
      {
        key: 2,
        value: 'art',
        text: 'Art'
      },
      {
        key: 3,
        value: 'os',
        text: 'Operating Systems (OS)'
      },
      {
        key: 4,
        value: 'js',
        text: 'Javascript'
      },
      {
        key: 5,
        value: 'edu',
        text: 'Education'
      },
      {
        key: 6,
        value: 'tech',
        text: 'Technology'
      },
      {
        key: 7,
        value: 'sci',
        text: 'Science'
      }
      ,
      {
        key: 8,
        value: 'health',
        text: 'health'
      }
      ,
      {
        key: 9,
        value: 'rom',
        text: 'Romance'
      }
    ]


    function changeOptions(side) {
      console.log(side.target.classList[0]);
      let className = side.target.classList[0];

      if (className == 'configure') {
        if (document.getElementById('editor-side1').style.display == 'block')  ;

        
        else {
          document.getElementById('editor-side2').style.display = 'none';

          document.getElementById('editor-side1').style.display = 'block'
        }


      }
      else if (className === 'ellipsis') {

        if (document.getElementById('editor-side2').style.display == 'block') ; //do nothing
        

        else {
          document.getElementById('editor-side2').style.display = 'block';
          document.getElementById('editor-side1').style.display = 'none';

        }
      }



    }

    return (



      <div className='add-post'   >

        <Grid stackable>
          <Grid.Row   >
          
            <Grid.Column mobile={16} tablet={8} computer={12} style={{ padding: '0px 10px' }}  >
              <Header textAlign='left'> <h3>Start from scratch!</h3></Header>
              <div className='notification-background'>
                <div style={{ width: '60%', background: 'rgba(3, 68, 94,0.8)', color: 'white', padding: '10px 5%' }} >



                  { this.state.SUCCESS_MESSAGE === '' ?
                    <div>
                      <span style={{ float: 'right', cursor: 'pointer' }} onClick={function () {
                        var note = document.getElementsByClassName('notification-background');
                        note[0].classList.add('reverse-anime');

                      }}> <Icon name='close' /> </span>
                      <h3><Icon name='calendar check outline' />SOME HELPFUL TIPS</h3>
                      <ul style={{ listStyleType: 'square' }} >
                        <li>Try keeping your descriptions Simple and short. Maximum 57 characters</li>
                        <li>Make every article relevant. Relevancy helps!</li>
                        <li>You can also keep them short. Dont bore your readers</li>
                      </ul>

                    </div>

                    : <div>
                      <span style={{ float: 'right', cursor: 'pointer' }} onClick={function () {
                        var note = document.getElementsByClassName('notification-background');
                        note[0].style.display = 'none';
                      }} ><Icon name='close' /> </span>
                      <Icon name='check circle outline' color='white' size='big' />
                      {this.state.SUCCESS_MESSAGE}. YOU CAN CHECK THE ARTICLE <a href={'http://localhost:5000/' + this.state.post_title} target='_blank' style={{ color: 'black' }} ><u>HERE</u> </a>
                    </div>

                  }

                </div>
              </div>


              {
                this.state.NETWORK_ERROR !== '' ?
                  <p style={{ padding: '5px', color: 'red', width: '90%', borderRadius: '0px' }}>  {this.state.NETWORK_ERROR} </p>
                  : ''
              }
              {
                this.state.ERROR_MESSAGE == 'editor-error' ?
                  <p style={{ padding: '5px', color: 'red', width: '90%', borderRadius: '0px' }}>  You've not written anything yet! </p>
                  : ''
              }


              
                <EditorPanel />
              
         






            </Grid.Column>
            

            <Grid.Column mobile={16} tablet={8} computer={4}  >
            &nbsp;&nbsp; &nbsp;
              <Button.Group size='tiny'  >
                <Button icon='configure' onClick={changeOptions} id='side1' title='Settings' />
                <Button icon='ellipsis horizontal' onClick={changeOptions} id='side2' title='More options' />
                <Button disabled={this.state.buttonDisabled} type='submit' size='tiny' color="blue" title='save' onClick={this.addPost.bind(this)} >
                  <DimmerLoad size='tiny' active={this.state.dimmerLoad} />
                  SAVE &nbsp; &nbsp; &nbsp;  <Icon name='save' />
                </Button>

              </Button.Group>
              <div className='editor-side1' id='editor-side1'>
                <h5>POST SETTINGS</h5>
                <Form size="big">
                  <b > WHAT DESCRIBES YOUR ARTICLE? </b><span style={{ float: 'right' }} ></span>
                  <p> </p>


                <Form.Field name='title' maxLength='50' label='Title' value={this.state.post_title} onChange={this.handleInputs.bind(this)} control='input' placeholder='Title'  required />
                  {
                    this.state.ERROR_MESSAGE == 'title-error' ?
                      <p style={{ color: 'red', width: '90%', borderRadius: '0px' }}> Title is required</p>
                      : ''
                  }
       
                  <Form.Field name='time' maxLength='2' min='0' type="number" value={this.state.time_to_read} control='input' placeholder="How many minutes read?"   onChange={this.handleInputs.bind(this)} />
                  {
                    this.state.ERROR_MESSAGE == 'time-error' ?
                      <p style={{ color: 'red', width: '90%', borderRadius: '0px' }}> The duration should not be less than 0 and not greater than 30 </p>
                      : ''
                  }
                  <Form.Field name='description' maxLength={70}  control='textarea' placeholder='Post Slug' value={this.state.post_description} onChange={this.handleInputs.bind(this)} />

                  {
                    this.state.ERROR_MESSAGE == 'description-error' ?
                      <p style={{ color: 'red', width: '90%', borderRadius: '0px' }}>  Description length is small</p>
                      : ''
                  }
                  <Form.Field name='tags' maxLength={this.state.tagMax} label='Tags (good to have!)' value={this.state.tag_value} onChange={this.handleTags} control='input' placeholder='e.g sport, gym, race. Separate with( , )' />
{
  this.state.ERROR_MESSAGE == 'tag-error' ?
    <p style={{ color: 'red', width: '90%', borderRadius: '0px' }}>  Sorry, u've got max of 5 tags</p>
    : ''
}
                </Form>
                <br />
              </div>

              <div className='editor-side2' id='editor-side2'>
                <b ><Icon name='options' /> Additionals</b><span style={{ float: 'right' }} ></span>
                <p>  </p>
                <Form>


                  <Select name='category' className='custom-label' value={this.state.post_category} onChange={this.handleInputs.bind(this)} options={categoryOptions} />
                  <br /><br /><br />

                  <Form.Field>


                    <Checkbox
                      slider
                      name='radioGroup1'
                      checked={this.state.privacy_value === true}
                      onChange={this.handlePostprivacy}
                      label={privacy_value}
                      className='small-fonts'
                    />
                  </Form.Field>


                  <Form.Field>

                    <Checkbox
                      slider
                      name='radioGroup2'
                      checked={this.state.enable_comments === true}
                      onChange={this.handleEnableComments}
                      //label ={ comment_value}
                      label={comment_value}

                    />
                  </Form.Field>







                </Form>
                <h5> Featured Image</h5>
                  <div className="profile-pix-block">
                    <img src={this.state.featured_image} className="featured-image"/>
                    <input className="profile-pix-cover" onChange={this.handle_profile_photo.bind(this)}
                      type='file' placeholder='Mobile Number' id='photo' style={{visibility:'hidden'}} />
  
                    <div className="profile-pix-cover" onClick={this.toggleDialogFeatured.bind(this) }>
                    <Icon color="teal" size="big" name='image' /> Upload Featured Image </div>
                    </div>






              </div>










            </Grid.Column>

          </Grid.Row>



        </Grid>

        { /*EDITOR PANEL INITIAL */}


      </div>




    )






  }
}

var mapStatetoProps = (state) => {
  return state;
}
export default withRouter(connect(mapStatetoProps)(AddPost));