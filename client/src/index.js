import React, {} from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router } from 'react-router-dom';
import App from  './home';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ProfileReducer, ArticleReducer } from '../Store/reducers';


const app = document.getElementById('app');
const AllReducers = combineReducers({ ProfileReducer, ArticleReducer });
const store = createStore(AllReducers);



class Index extends React.Component {
  constructor(props) {
    super(props)

  }

  

render() {
 
return (

<div style={{height:'100%'}}>
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






