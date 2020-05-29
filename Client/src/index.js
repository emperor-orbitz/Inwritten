import React, {} from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router } from 'react-router-dom';
import App from  './home';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ProfileReducer, ArticleReducer, StoryPage, EditPage } from '../Store/reducers';
import "babel-polyfill"



const app = document.getElementById('app');
const AllReducers = combineReducers({ ProfileReducer, ArticleReducer, StoryPage, EditPage });
const store = createStore(AllReducers);


class Index extends React.Component {
  constructor(props) {
    super(props)

  }

  

render() {
 
return (

<div>
<Provider store={store}>
<Router>

<App />

</Router>
</Provider>
</div>

    )
  }

}





ReactDOM.render(<Index/>, app);






