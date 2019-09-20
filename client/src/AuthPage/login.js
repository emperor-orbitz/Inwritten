import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.scss';
import {Button, Form, Grid,Icon, Dimmer,Loader,  } from 'semantic-ui-react';
import { withRouter} from 'react-router';
import Connection from '../../controllers/auth';
import { connect} from 'react-redux';
import Header from '../header';
import Validator from '../../validators/login_validator';

function DimmerLoad(props){
  return  <Loader active ={props.active} size={props.size} inline />
  
}

function Error(props){

var {loginError} = props;
console.log(loginError);
if((loginError.length <= 0)){
  return (<div></div>)
}
else
{
return (<div style={{}}> 
{ loginError.map((val)=>{
 return <div className="error-li" key ={loginError.indexOf(val)}>
 {val.message} 
 </div>
}) }
</div>//single line would not need parenthesis 
//closing
)
}


}

  


     

class Login extends React.Component{

constructor(props){

super(props)
this.submit= this.submit.bind(this);

this.pChange=this.pChange.bind(this);
this.eChange=this.eChange.bind(this);
this.state ={
button:{
  dimmerLoad:false,
  disabled:false
},
emailValue:'',
passwordValue:'',
loginError:[],
isLoggedin:false

}


}




componentWillMount(){

var connect =new Connection();
console.log(this.props) ;
connect.isLoggedin()
.then((( success )=>{ 

  /*  this.props.dispatch({type:'INJECT_PROFILE', payload:{
      key:"LOGIN_ID",
      value:success.ID
    }});
    this.props.dispatch({type:'INJECT_PROFILE', payload:{
      key:"isLoggedin",
      value:true
    }});
    //this.setState({isLoggedin:true});
*/
this.props.history.replace('/dashboard');

}))
.catch(( err )=>{
  
//DO NOTHING
console.log(err);
  //this.setState({isLoggedin:false});
  


})

}





submit (e){
var connect =new Connection();

var DATA = {
  email:this.state.emailValue,
  password:this.state.passwordValue,
}

let button= Object.assign({}, this.state.button);

var validate= new Validator({email:this.state.emailValue, password:this.state.passwordValue});



validate.emailPromise().then((succ)=>{
//console.log(success);


connect.LOGIN(DATA)
.then((success)=>{

  button.dimmerLoad =button.disabled= true;

  this.setState({ button });

  
  this.props.history.replace('/dashboard');

}).catch((err)=>{
//console.log(err);
this.state.loginError= [];
var { loginError } = this.state;

button.disabled = button.dimmerLoad= false;

loginError.push(err);
this.setState({ loginError, button });

})

})
.catch((err)=>{

//console.log(err);
var { loginError } = this.state;
button.dimmerLoad = button.disabled= false;
this.state.loginError= err.forEach((line)=>{

  this.state.loginError.push(line);
})



//console.log('Console thinks the login error is this',this.state.loginError);

this.setState({ loginError, button});
//console.log(this.state);
this.state.loginError =[];

})
  
}



eChange= (email)=>{
email.preventDefault();

this.setState({emailValue:email.target.value});
}
pChange= (password)=>{
  password.preventDefault();

  this.setState({passwordValue:password.target.value}); 
}


render(){


 
return (

<div className="bodyLogin">

<Header active="login" />

<div className="login">
<Grid columns={2} divided stackable>
<Grid.Column>
<div className="note">
<h2>CREATE RICH ARTICLES</h2>
<p>Create contents that matter to what you do. Let the world know your true potentials
</p>
<Icon name="js" color="teal" size="big"/>
<Icon name="edit outline" size="big"/>
<Icon name="database" color="teal" size="big"/>
<Icon name="html5" size="big"/>
</div>


</Grid.Column>

<Grid.Column >
<Error loginError ={this.state.loginError}/>

<Form >

    <Form.Field width={8}>
      <label style={{'color':'white'}} color="white">Email</label>
      <input placeholder='Email' type="text"  value={this.state.emailValue} onChange={this.eChange} />
    </Form.Field>
    <Form.Field width={8}>
      <label style={{'color':'white'}}>Password</label>
      <input placeholder='Password' type="password" value={this.state.passwordValue} onChange={this.pChange} />
    </Form.Field>

    
    <Button size="large" color="teal" disabled ={this.state.button.disabled} type='submit' onClick={this.submit}>Submit<DimmerLoad size="small" active= {this.state.button.dimmerLoad}/></Button>
  </Form>
  </Grid.Column>

</Grid>
  </div>
</div>







)
}
}

const mapStateToProps =(state)=>{
  return state;
  }
  
  
  Login.T={
      state:Object
  };
  export default withRouter(connect(mapStateToProps)(Login));








