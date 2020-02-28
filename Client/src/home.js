import React from 'react';
import { Signup, Account, Login, ForgotPassword, ArticlesCategory, Profile, Comments, Interests, Bookmark, Templates, Notifications, Preferences } from './page_exports';
import '../Resources/styles/style.scss';
import { Switch, Route } from 'react-router';
import HeaderAccount from '../src/Dashboard/header_account';
//import RichTextExample from '../src/NewPost/Components/test-editor';



function App() {

  return (


    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route path='/forgot_password' component={ForgotPassword} />



      <HeaderAccount>

        <Switch>
          <Route path='/comments/:postID' component={Comments} />
          <Route path='/interests' component={Interests} />
          <Route path='/edit-post/:postID' component={ArticlesCategory.EditPost} />
          <Route path='/dashboard' component={Account} />
          <Route path='/settings/profile' component={Profile} />
          <Route path='/articles' component={ArticlesCategory.Articles} />
          <Route path='/drafts' component={ArticlesCategory.Drafts} />
          <Route path='/add-post' component={ArticlesCategory.AddPost} />
          <Route path='/bookmark' component={Bookmark} />
          <Route path='/settings/templates' component={Templates} />
          <Route path='/settings/preferences' component={Preferences} />

          <Route path='/notification' component={Notifications} /> 




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





