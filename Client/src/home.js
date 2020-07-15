import React from 'react';
import { Signup, Account, Login, ForgotPassword, ArticlesCategory, Profile, Comments, Interests, Bookmark, Templates, Notifications, Preferences, QuillTest } from './page_exports';
import '../Resources/styles/style.scss';
import { Switch, Route } from 'react-router';
import HeaderAccount from '../src/Dashboard/header_account';
//import RichTextExample from '../src/NewPost/Components/test-editor';
import {CSSTransition, TransitionGroup } from "react-transition-group"
import {  useLocation } from 'react-router-dom';


function App() {
  let location = useLocation();
  return (


    <Switch>
      <Route exact path='/signup' component={Signup} />
      <Route path='/forgot_password' component={ForgotPassword} />


      <Route exact path='/login' component={Login} />


      <HeaderAccount>
{/* 
<TransitionGroup>
<CSSTransition
key={location.key}
classNames="fade"
timeout={300}
> */}
        <Switch location={location}>
          <Route path='/app/comments/:postID' component={Comments}  />
          <Route path='/app/interests' component={Interests} />
          <Route path='/app/edit/:postID' component={ArticlesCategory.EditPost} />
          <Route path='/app/read' component={Account} />
          <Route path='/app/settings/profile' component={Profile} />
          <Route path='/app/posts' component={ArticlesCategory.Articles}  />
          <Route path='/app/drafts' component={ArticlesCategory.Drafts} />
          <Route path='/app/create' component={ArticlesCategory.AddPost} />
          <Route path='/app/bookmark' component={Bookmark} />
          <Route path='/app/settings/templates' component={Templates} />
          <Route path='/app/settings/preferences' component={Preferences} />

          <Route path='/app/notification' component={Notifications} /> 



          <Route render={() => (
            <div className="comment-div" style={{ marginTop: "10px !important" }}>
            <h2 style={{ color: "black", padding: "5px 10px" }}>Oops, It's a 404. </h2>
              <p>One of our engineers must be responsible for this. </p>
              <p>Let's tell momma at <a href="/">home</a> first</p>

            </div>
          )} />
        </Switch>
        {/* </CSSTransition>

</TransitionGroup> */}
      </HeaderAccount>
          
    </Switch>




  )

}



export default App;





