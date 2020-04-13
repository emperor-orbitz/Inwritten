import React from 'react';
import { Signup, Account, Login, ForgotPassword, ArticlesCategory, Profile, Comments, Interests, Bookmark, Templates, Notifications, Preferences, QuillTest } from './page_exports';
import '../Resources/styles/style.scss';
import { Switch, Route } from 'react-router';
import HeaderAccount from '../src/Dashboard/header_account';
//import RichTextExample from '../src/NewPost/Components/test-editor';



function App() {

  return (


    <Switch>
      <Route exact path='/app/signup' component={Signup} />
      <Route path='/app/forgot_password' component={ForgotPassword} />
      <Route exact path='/app/test' component={QuillTest} />

      <Route exact path='/app/login' component={Login} />


      <HeaderAccount>

        <Switch>
          <Route path='/app/comments/:postID' component={Comments} />
          <Route path='/app/interests' component={Interests} />
          <Route path='/app/edit-post/:postID' component={ArticlesCategory.EditPost} />
          <Route path='/app/dashboard' component={Account} />
          <Route path='/app/settings/profile' component={Profile} />
          <Route path='/app/articles' component={ArticlesCategory.Articles} />
          <Route path='/app/drafts' component={ArticlesCategory.Drafts} />
          <Route path='/app/add-post' component={ArticlesCategory.AddPost} />
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

      </HeaderAccount>
          
    </Switch>




  )

}



export default App;





