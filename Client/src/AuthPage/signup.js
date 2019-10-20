import React from 'react';
import '../../Resources/styles/style.scss';
import {Button, Form, Checkbox, Grid, Icon,Loader} from 'semantic-ui-react';
import {  withRouter} from 'react-router';

import {Provider, connect} from 'react-redux';
import Header from '../../src/AuthPage/header';
import Validator from '../../Controllers/validators/signup.validator';

function DimmerLoad(props){
  return  <Loader active ={props.active} size={props.size} inline />
}

function Error(props){
  
var {loginError} = props;

if((loginError.length <= 0)){
  return (<div></div>)
}
else
{
return <div style={{}}> 
{ loginError.map((val)=>{
 return <div className="error-li" key ={loginError.indexOf(val)}>
 {val.message} 
 </div>
}) }
</div>

}
}

  


     

class Signup extends React.Component{

constructor(props){

super(props)
this.submit=this.submit.bind(this);
this.uChange=this.uChange.bind(this)
this.pChange=this.pChange.bind(this);
this.eChange=this.eChange.bind(this);
this.state ={
button:{
  dimmerLoad:false,
  disabled:false
},
usernameValue:'',
emailValue:'',
passwordValue:'',
loginError:[]
 
}
}



submit =(e)=>{
let button= Object.assign({}, this.state.button);
var validate= new Validator({username:this.state.usernameValue, email:this.state.emailValue, password:this.state.passwordValue});

var DATA ={
  username:this.state.usernameValue,
  email:this.state.emailValue,
  password:this.state.passwordValue,

}
var URL='http://localhost:5000/auth/register';

var GET_OPTIONS={
  method:'POST',
  headers:{
    'Content-Type':'application/json',
    //'Accept':'application/json'
},  body:JSON.stringify(DATA),
  withCredentials:true,
  credentials:'include',
  mode:'cors'
}


validate.emailPromise().then((success)=>{
//console.log(success);
button.dimmerLoad =button.disabled= true;
this.setState({button, loginError:[]});


fetch(URL, GET_OPTIONS)
.then((user)=> user.json())
.then((message)=>{
//console.log(message);
button.dimmerLoad =button.disabled= false;
this.setState({button});


if(message.message =='Account already exists'){
  //dont redirect(Account already exists)

  this.state.loginError.push(message);
  let {loginError} = this.state;
  this.setState({loginError}); 
}
else if(message.message== 'Account successfully created'){
//redirect(account just created);
console.log(this.props)
//this.props.history.replace('/profile');
alert('account created successfully. You can now login with Username')
this.props.history.replace('/login');

}



})
.catch(err=>{

console.log(`this ${err} occured`);


})

})
.catch((error)=>{
//console.log(error);  
button.dimmerLoad =button.disabled= false;

this.setState({button, loginError:error });

})
  




}

uChange= (username)=>{
  username.preventDefault();
  this.setState({usernameValue:username.target.value});
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


<Header active="signup" />

<div className="login">
<Grid columns={2} divided stackable>
<Grid.Column>
<div className="note">
<h2>CREATE RICH PERSPECTIVES</h2>
<p>Create an account let's knows what you do. Let the world know your true potentials
</p>

</div>


</Grid.Column>

<Grid.Column >
<Error loginError ={this.state.loginError}/>

<Form >
<Form.Field width={8}>
      <label style={{'color': 'rgb(3, 68, 94)'}} color="white" htmlFor="username">Username</label>
      <input placeholder='Username' type="text"  value={this.state.usernameValue} onChange={this.uChange} id="username"/>
    </Form.Field>
    <Form.Field width={8}>
      <label style={{'color': 'rgb(3, 68, 94)'}}>Email</label>
      <input placeholder='Email' type="text"  value={this.state.emailValue} onChange={this.eChange} />
    </Form.Field>
    <Form.Field width={8}>
      <label style={{'color': 'rgb(3, 68, 94)'}} >Password</label>
      <input placeholder='Password' type="password" value={this.state.passwordValue} onChange={this.pChange} />
    </Form.Field>

     <span style ={{'color': 'black'}}> By Creating an account you have agreed to the <br/><a href="/terms-and-conditions">terms and conditions</a> 
     </span>
    <br/><br/>
    <Button size="large" color="teal" disabled ={this.state.button.disabled} type='submit' onClick={this.submit}>CREATE AN ACCOUNT<DimmerLoad size="small" active= {this.state.button.dimmerLoad}/></Button>
  </Form>
  </Grid.Column>

</Grid>
  </div>
</div>







)}}


const mapStateToProps =(state)=>{
  return state;
  }
  
  
  Signup.T={
      state:Object
  };
  export default withRouter(connect(mapStateToProps)(Signup));








