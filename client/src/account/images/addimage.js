
/*
*
*           IMPORTS
*
*/

import React, { /*Component*/ } from 'react';
import {Button, Divider, Input,  Loader,   Icon, Grid } from 'semantic-ui-react';
import './images.scss';
import { withRouter } from 'react-router';
import Connection from '../../../controllers/auth';

import { connect } from 'react-redux';
import HeaderAccount from '../header_account';
import FetchArticles from '../../../controllers/articleController' 

/*
function DimmerLoad(props){
  return  <Loader active ={props.active} size={props.size} inline />
  
}

function HoverableDiv (props){
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

class AddImage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      buttonDisabled:false,
      dimmerLoad:false,
      ERROR_MESSAGE: '',
      SUCCESS_MESSAGE: '',
      privacy_value: false,
      enable_comments: true,
      post_title: '',
      featured_image:'src/img/image12.jpg',
      createdAt: Date.now(),

      post_category: 'all',
      post_description: '',
      time_to_read: 5 ,
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
handleInputs(e, prop= prop || '' ){
  e.preventDefault();
var {name, value} =e.target;

if (prop ==""){
  switch (name){

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
else{

  switch (prop.name){

    case 'category':
    let category =prop.value;
   
   this.setState({ post_category:category });
   break; 

  }

}

 return null;


}


 
  handlePostprivacy = (e, { value }) => this.setState({ privacy_value: !this.state.privacy_value });
  handleEnableComments = (e, { value }) => this.setState({ enable_comments: !this.state.enable_comments })




  postValidation(title = this.state.post_title, description = this.state.post_description, duration= this.state.time_to_read) {
if(window.editor.length <8) return 'editor-error'
else if (title.length == 0) return 'title-error';
 
else if(duration.length !== 0){
  if( duration >30 ) return "time-error";
  else if( duration < 0 ) return "time-error";
}


else{

  return true;

}

return true;
  }





  addPost() {
    var add = new FetchArticles()
    var body = panel.exposedEditorValue;
this.setState({buttonDisabled:true, dimmerLoad:true});

    var post = {
      title: this.state.post_title.trim(),
      createdAt: Date.now(),
      category: this.state.post_category,
      description: this.state.post_description.trim(),
      time_to_read: this.state.time_to_read,
      comments_enabled: this.state.enable_comments,
      public: this.state.privacy_value,
      body: body,
     
    }

    let val = this.postValidation(this.state.post_title, this.state.post_decription);
//alert val
    if (val=== true) {

      add.create_article(post).then(
        (okay) => {
          this.props.dispatch({type:'INSERT_ARTICLE', payload:post });

        this.setState({ SUCCESS_MESSAGE: 'YOUR ARTICLE HAS BEEN CREATED',
        ERROR_MESSAGE:'',
        buttonDisabled:false, dimmerLoad:false
        }); 
       

        var note =document.getElementsByClassName('notification-background');
        note[0].classList.remove('reverse-anime');

        }


      ).catch(
        (err) => {
          this.setState({buttonDisabled:false, dimmerLoad:false});
          this.setState({ NETWORK_ERROR: `Sorry, there was an error with your article! We would fix this soon` });
        }
        );
    }
    else if(val !== true ) {
      this.setState({buttonDisabled:false, dimmerLoad:false});
    
      this.setState({ ERROR_MESSAGE: val });

    }


  }









  /*
  *
  *           REACTJS LIFECYCLE HOOKS
  *
  */
  connect= new Connection();
  fetchArticle =new FetchArticles();
  
  componentDidMount() {

    if( Object.keys(this.props.ProfileReducer).length ==0 ){
      console.log('empty',  this.props.ArticleReducer);
      
     
   //
      
   
      
      
      }
      
      else{
    console.log('full', this.props.ArticleReducer);
   
    
    

            }



  }


  toggleDialogFeatured(){
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

handle_profile_photo(ev){
  var src;
  var file = document.getElementById('photo');
  this.readFile(ev.target.files[0]).then((result)=>{
  
      //LOL
      this.setState({featured_image:result});
  })
}
  /*
  *
  *          RENDER FILE
  *
  */

  render() {

    //INITIAL ARRAY VALUE ==>0 [EMPTY] , THEN LATER POPULATED 
   


   

  
      return (

      
          <div className='big-container'>
            <Grid stackable>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={16} style={{ padding: '0px 10px' }} >
              <span> <Icon name="add" size='big' color='blue' /> Add an image </span>
              <li>You might want to add images with good quality!</li>
              <li>And a good name is advisable, too</li>

              <Divider />

<div className="image-scanner">
<div className="profile-pix-block">
                    <img src={this.state.featured_image} className="featured-image"/>
                    <input  onChange={this.handle_profile_photo.bind(this)}
                      type='file' placeholder='Mobile Number' id='photo' style={{visibility:'hidden'}} />
  
                    <div className="profile-pix-covers" onClick={this.toggleDialogFeatured.bind(this) }>
                    <Icon color="white" size="massive" name='image' /> </div>
    </div>
</div>

  <div className="image-name">
  <form>
  <input type='text' required pattern ='^[0-9a-zA-Z]+$' placeholder='Image name' />
  <br/>
  <Button  icon='chevron right' labelPosition='right' content="Let's go" size='tiny' className='letsgo-button' />

  

  </form>
</div>


            
  






  
  
  
  
  
  
  
              </Grid.Column>
  
             
              
  </Grid.Row>
  
  
  
            </Grid>
  
  { /*EDITOR PANEL INITIAL */ }
  
  
          </div>
  

  
  
  
      )
   
      
    
   


  }
}

var mapStatetoProps = (state) => {
  return state;
}
export default withRouter(connect(mapStatetoProps)(AddImage));