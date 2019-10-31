import React from 'react';
import { Signup, Account, Login, ArticlesCategory, Profile, Comments, Interests  } from './page_exports';
import '../Resources/styles/style.scss';
import { Switch, Route } from 'react-router';
import HeaderAccount from '../src/Dashboard/header_account';
import RichTextExample from '../src/NewPost/Components/test-editor';



function App() {
  
  return (
    

      <Switch>
        <Route exact path='/test'  component={RichTextExample} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />


        <HeaderAccount>

          <Switch>
            <Route path='/comments/:postID' component={Comments} />
            <Route path='/interests'  component={Interests} />
            <Route path='/edit-post/:postID' component={ArticlesCategory.EditPost} />
            <Route path='/dashboard' component={Account} />
            <Route path='/profile' component={Profile} />
            <Route path='/articles' component={ArticlesCategory.Articles} />
            <Route path='/drafts' component={ArticlesCategory.Drafts} />
            <Route path='/add-post' component={ArticlesCategory.AddPost} />
            <Route render={() => <h2 style={{color:"black"}}> Oops, it's a 404  </h2>} />
          </Switch>

        </HeaderAccount>
      </Switch>


    

  )

}



export default App;





