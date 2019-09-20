
/*
*
*           IMPORTS
*
*/

import React, { /*Component*/ } from 'react';
import { Button, Divider, Form, Checkbox, Header, Loader, Dropdown, Icon, Select, Grid } from 'semantic-ui-react';
import './article.scss';
import { Route,  Switch, withRouter, IndexRoute } from 'react-router';
import { BrowserRouter as Router, Redirect , browserHistory} from 'react-router-dom';
import Connection from '../../../controllers/auth';

import { connect } from 'react-redux';
import HeaderAccount from '../header_account';
import FetchArticles from '../../../controllers/articleController'
import EditorPanel from './editor-panel';
import EditPost1 from './editpost_1';

/*

function DimmerLoad(props) {
  return <Loader active={props.active} size={props.size} inline />

}

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
      buttonDisabled: false,
      dimmerLoad: false,
      ERROR_MESSAGE: '',
      SUCCESS_MESSAGE: '',
      privacy_value: false,
      enable_comments: true,
      post_title: '',
      featured_image: '',
      createdAt: Date.now(),

      post_category: 'all',
      post_description: '',
      time_to_read: 5,
      body: ''

    }


    this.handlePostprivacy = this.handlePostprivacy.bind(this);

    //this.postValidation =this.postValidation.bind(this);
  }

  /*
  *
  *           HANDLE CHANGE EVENTS ON INPUTS
  *
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





  updatePost() {
    var add = new FetchArticles()
    var panel = new EditorPanel();
    var body = panel.exposedEditorValue;
    this.setState({ buttonDisabled: true, dimmerLoad: true });

    var post = {
      title: this.state.post_title.trim(),
      createdAt: Date.now(),
      category: this.state.post_category,
      description: this.state.post_description.trim(),
      time_to_read: this.state.time_to_read,
      comments_enabled: this.state.enable_comments,
      public: this.state.privacy_value,
      body: body

    }

    let val = this.postValidation(this.state.post_title, this.state.post_decription);
    //alert val
    if (val === true) {

      add.update_article(post).then(
        (okay) => {
          this.props.dispatch({ type: 'UPDATE_ARTICLE', payload: post });

          this.setState({
            SUCCESS_MESSAGE: 'Successfully Updated!',
            ERROR_MESSAGE: '',
            buttonDisabled: false, dimmerLoad: false
          });


          var note = document.getElementsByClassName('notification-background');
          note[0].classList.remove('reverse-anime');

        }


      ).catch(
        (err) => {
          this.setState({ buttonDisabled: false, dimmerLoad: false });
          this.setState({ NETWORK_ERROR: `Sorry, there was an error with your article! We would fix this soon` });
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
  connect = new Connection();
  fetchArticle = new FetchArticles();

  componentDidMount() {

    if (Object.keys(this.props.ProfileReducer).length == 0) {
      console.log('empty', this.props.ArticleReducer);

      this.connect.isLoggedin()
        .then(((success) => {

          this.props.dispatch({
            type: 'INJECT_PROFILE', payload: [{
              key: "isLoggedin",
              value: true
            }
              , {
              key: "username",
              value: success.ID.username
            }, {
              key: "email",
              value: success.ID.email
            }

            ]
          })

          this.fetchArticle.fetch_articles_list().then((articles, none) => {
            if (articles) {
              console.log(articles);
              this.props.dispatch({ type: 'OVERWRITE_ARTICLE', payload: articles.RESULT });


              //check if its in the array

           
            }
            else {
              //error
              this.props.history.replace('/login');

            }
          })


        }))
        .catch((err) => {
          this.props.history.replace('/login');

        })


    }

    else {
    

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
    var src;
    var file = document.getElementById('photo');
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
    var panel = new EditorPanel();
    //INITIAL ARRAY VALUE ==>0 [EMPTY] , THEN LATER POPULATED 



    //console.log('From addpost page', this.props.ProfileReducer);
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




console.log(this.props.match.url, this.props);


if(Object.keys(this.props.match.params ).length ==0 ){
  
return(

<div> BAD URL MAYBE </div>

)
}
else{

  return (


  
    <div>
    
    <EditPost1/> 
    
    
     </div>
  )



}










  }
}

var mapStatetoProps = (state) => {
  return state;
}
export default withRouter(connect(mapStatetoProps)(EditPost));