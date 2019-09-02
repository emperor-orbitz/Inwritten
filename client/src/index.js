import React, {} from 'react';
import ReactDOM from 'react-dom';


import {  withRouter, Switch, Route } from 'react-router';
import {  BrowserRouter as Router } from 'react-router-dom';

//import Sales from '../src/sales';
import App from  './home';


import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ProfileReducer, ArticleReducer } from '../reducers/reducers';
const app = document.getElementById('app');
const AllReducers = combineReducers({ ProfileReducer, ArticleReducer });
const store = createStore(AllReducers);

//import profileReducer from '../reducers/reducers';


class Index extends React.Component {
  constructor(props) {
    super(props);
  }




  render() {
 
    return (

    <div style={{height:'100%'}}>



<Provider store={store}>

<Router >





<App />





  

    

</Router>
</Provider>
</div>

    )
  }

}


const mapStateToProps = (state) => {
  return state;
}




ReactDOM.render(<Index/>, app);






