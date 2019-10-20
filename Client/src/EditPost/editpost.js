
import React from 'react';
import { Button, Form, Checkbox, Header, Loader, Icon, Select, Grid } from 'semantic-ui-react';
import '../../Resources/styles/article.scss';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller'
import EditorPanel from './Components/editor-panel';



function DimmerLoad(props) {
  return <Loader active={props.active} size={props.size} inline />

}
/*
function HoverableDiv(props) {
  return (
    <div className='image-thumbnail-template-cover'>

      {props.children}

      <div className='template-thumbnail-hover'> <h5>{props.name} </h5>
        <h6>{props.type}</h6>
      </div>

    </div>
  )
}

*/

class EditPost extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tag_value: '',
      tagMax: '',

      buttonDisabled: false,
      dimmerLoad: false,
      error_message: '',
      success_message: '',
      privacy_value: false,
      enable_comments: true,
      post_title: '',
      featured_image: '',
      createdAt: Date.now(),

      post_category: 'all',
      post_description: '',
      time_to_read: 5,
      body_schema: ''

    }


    this.handlePostprivacy = this.handlePostprivacy.bind(this);

    //this.postValidation =this.postValidation.bind(this);
  }




  handleTags = (e) => {
    this.setState({ tag_value: e.target.value });

  }


  /*          HANDLE CHANGE EVENTS ON INPUT
  */

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




  postValidation(title = this.state.post_title, description = this.state.post_description, duration = this.state.time_to_read) {
    if (window.editor.length < 8) return 'editor-error'
    else if (title.length == 0) return 'title-error';

    else if (duration.length !== 0) {
      if (duration > 30) return "time-error";
      else if (duration < 0) return "time-error";
    }


    else {

      return true;

    }

    return true;
  }





  updatePost = () => {
    var add = new FetchArticles()
    var panel = new EditorPanel();
    this.setState({ buttonDisabled: true, dimmerLoad: true });

    const post = {
      _id: this.state.post_id,
      title: this.state.post_title.trim(),
      createdAt: Date.now(),
      category: this.state.post_category,
      description: this.state.post_description.trim(),
      time_to_read: this.state.time_to_read,
      comments_enabled: this.state.enable_comments,
      public: this.state.privacy_value,
      body_html: panel.exposeHTMLEditorValue,
      body_schema: panel.exposeEditorValue,
      featured_image: this.state.featured_image

    }
    console.log(post.category, post.createdAt, "this is null")

    let val = this.postValidation();
    if (val === true) {

      add.update_article(post).then(
        (okay) => {
          this.props.dispatch({ type: 'UPDATE_ARTICLE', payload: post });

          this.setState({
            success_message: 'Great! That\'s a little better. Click ',
            error_message: '',
            buttonDisabled: false, dimmerLoad: false
          });


          var note = document.getElementsByClassName('notification-background');
          note[0].classList.remove('reverse-anime');

        }


      ).catch(
        (err) => {
          this.setState({ buttonDisabled: false, dimmerLoad: false });
          this.setState({ network_error: `Sorry, there was an error with your article! We would fix this soon ${err}` });
        }
      );
    }
    else if (val !== true) {
      this.setState({ buttonDisabled: false, dimmerLoad: false });

      this.setState({ error_message: val });

    }


  }


  /*
  
    componentWillReceiveProps(nextProps, nextState){
  
      //INCASE OF RELOAD. props Is LOST
      console.log('component will receivveprops', nextProps, nextState)
      var arrs=[];
      for (var x of nextProps.ArticleReducer) {
        if (x._id == this.props.match.params.postID) {
      
  
     arrs.push(x);
  
  
        }
       
      }
      
      if(arrs.length ==0 ) nextProps.history.replace('/dashboard');
      else{
      let x =arrs[0];
        this.setState({
          post_title: x.title, post_description: x.description,
          post_category: x.category,
          privacy_value: x.public,
          enable_comments: x.comments_enabled,
          time_to_read: x.time_to_read,
          body: x.body
        });
      }
      
      }
  
  */



  /*
  *           REACTJS LIFECYCLE HOOKS
  */

  componentDidMount() {



    for (var x of this.props.ArticleReducer) {
      if (x._id == this.props.match.params.postID) {
        console.log(x._id, this.props.match.params.postID, x.body_schema, 'X.BODY IS HERE')

        this.setState({
          post_id: x._id,
          post_title: x.title,
          post_description: x.description,
          post_category: x.category,
          privacy_value: x.public,
          enable_comments: x.comments_enabled,
          time_to_read: x.time_to_read,
          body_schema: x.body_schema,
          featured_image: x.featured_image
        });



      }

    }



  }


  toggleDialogFeatured() {
    var photo = document.getElementById('photo');
    photo.click();
    console.log(photo)
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

    var privacy_value = (this.state.privacy_value == true) ? 'Publish to the World' : 'Save Save to draft';
    var comment_value = (this.state.enable_comments == true) ? 'Commenting is enabled' : 'Commenting is disabled';
    var template_sample = [
      {
        _name: 'Diana \'s Rose ',
        _category: 'Red',
        _id: 12
      },
      {
        _name: 'Diana \'s Rose ',
        _category: 'Blue',
        _id: 23
      }
      ,
      {
        _name: 'Diana \'s Rose ',
        _category: 'Golden Eaglet',
        _id: 234
      }
    ]

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
      let id = side.target.id;

      if (id == 'side1') {
        if (document.getElementById('editor-side1').style.display == 'block') {

          document.getElementById('editor-side2').style.display = 'none';
          document.getElementById('editor-side1').style.display = 'block';



          //do nothing

        }
        else {
          document.getElementById('editor-side2').style.display = 'none';

          document.getElementById('editor-side1').style.display = 'block'
        }


      }
      else if (id === 'side2') {

        if (document.getElementById('editor-side2').style.display == 'block') {

          document.getElementById('editor-side2').style.display = 'block';

          document.getElementById('editor-side1').style.display = 'none'

        }
        //do nothing;
        else {
          document.getElementById('editor-side2').style.display = 'block';
          document.getElementById('editor-side1').style.display = 'none';


        }
      }



    }









    return (



      <div className='add-post'>

        <Grid stackable>
          <Grid.Row>

            <Grid.Column mobile={16} tablet={12} computer={12} style={{ padding: '0px 5px' }}  >

              {this.state.success_message === '' ?
                ""

                :
                <div className='notification-background'>
                  <div style={{ width: '90%', color: 'green', background: '', padding: '1px 5%' }} ><div>
                    <span style={{ float: 'right', cursor: 'pointer' }} onClick={function () {
                      var note = document.getElementsByClassName('notification-background');
                      note[0].style.display = 'none';
                    }} ><Icon name='close' onClick={() => { this.state.success_message = "" }} /> </span>
                    <Icon name='check circle outline' color="green" size='big' />
                    {this.state.success_message} <a href={'http://localhost:5000/' + this.state.post_title} target='_blank' style={{ color: 'black' }} ><u>here</u> </a>
                  </div>

                  </div>
                </div>
              }

              {
                this.state.network_error !== '' ?
                  <p style={{ padding: '5px', color: 'red', width: '90%', borderRadius: '0px' }}>  {this.state.network_error} </p>
                  : ''
              }
              {
                this.state.error_message == 'editor-error' ?
                  <p style={{ padding: '5px', color: 'red', width: '90%', borderRadius: '0px' }}>  You've not written anything yet! </p>
                  : ''
              }


              <EditorPanel initialValue={this.state.body_schema} />


            </Grid.Column>

            <Grid.Column mobile={16} tablet={4} computer={4}>
              &nbsp;&nbsp; &nbsp;
  
                <Icon name='configure' onClick={changeOptions} id='side1' title='Settings' bordered color='black' />
              <Icon name='ellipsis horizontal' onClick={changeOptions} id='side2' title='More options' bordered color='black' />
              <Button disabled={this.state.buttonDisabled} type='submit' size='mini' color="green" title='save' onClick={this.updatePost} >
                <DimmerLoad size='mini' active={this.state.dimmerLoad} />
                UPDATE
                </Button>


              <div className='editor-side1' id='editor-side1'>
                <h5>POST SETTINGS</h5>
                <Form size="mini">

                  <Form.Field name='title' maxLength='50' label='Title' value={this.state.post_title} onChange={this.handleInputs.bind(this)} control='input' placeholder='Title' required />
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
                  <Form.Field name='description' maxLength={70} control='textarea' placeholder='Post Slug' value={this.state.post_description} onChange={this.handleInputs.bind(this)} />

                  {
                    this.state.error_message == 'description-error' ?
                      <p style={{ color: 'red', width: '90%', borderRadius: '0px' }}>  Description length is small</p>
                      : ''
                  }
                  <Form.Field name='tags' maxLength={this.state.tagMax} label='Tags (good to have!)' value={this.state.tag_value} onChange={this.handleTags} control='input' placeholder='e.g sport, gym, race. Separate with( , )' />
                  {
                    this.state.error_message == 'tag-error' ?
                      <p style={{ color: 'red', width: '90%', borderRadius: '0px' }}>  Sorry, u've got max of 5 tags</p>
                      : ''
                  }
                </Form>
                <br />
              </div>

              <div className='editor-side2' id='editor-side2'>
                <b ><Icon name='options' /> Additionals</b><span style={{ float: 'right' }} ></span>
                <p>  </p>
                <Form size="mini">

                  <Select name='category' className="custom-label"
                    value={this.state.post_category} onChange={this.handleInputs.bind(this)}
                    options={categoryOptions} />
                  <br /><br /><br />

                  <Form.Field>


                    <Checkbox
                      toggle
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
                      toggle
                      name='radioGroup2'
                      checked={this.state.enable_comments === true}
                      onChange={this.handleEnableComments}
                      //label ={ comment_value}
                      label={comment_value}

                    />
                  </Form.Field>




                </Form>
                <h5> Featured Image</h5>
                <div className="featured-pix-block">
                  <img src={this.state.featured_image} className="featured-image" />
                  <input className="featured-pix-cover" onChange={this.handle_profile_photo.bind(this)}
                    type='file' id='photo' style={{ visibility: 'hidden' }} />

                  <div className="featured-pix-cover" onClick={this.toggleDialogFeatured.bind(this)}>
                    <Icon color="teal" size="small" name='image' /> Upload Featured Image </div>
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
export default withRouter(connect(mapStatetoProps)(EditPost));