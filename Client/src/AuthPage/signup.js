import React from 'react';
import '../../Resources/styles/style.scss';
import { Button, Form, Message, Grid, Icon, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router';

import {  connect } from 'react-redux';
import Header from '../../src/AuthPage/header';
import validateSignup from '../../Controllers/validators/signup.validator'


function DimmerLoad(props) {
  return <Loader active={props.active} size={props.size} inline />
}

function Error(props) {

  var { loginError } = props;

  if (loginError.length <= 0) {
    return (<div></div>)
  }
  else {
    return <div style={{width:"90%"}} negative>
      {loginError.map( val => {
        return <p  className="error-li" key={loginError.indexOf(val)}>
          {val.message}
        </p>
      })}
    </div>

  }
}






class Signup extends React.Component {

  constructor(props) {

    super(props)


    this.state = {
      button: {
        dimmerLoad: false,
        disabled: false
      },
      usernameValue: '',
      emailValue: '',
      passwordValue: '',
      loginError: []

    }
  }




  submit = (e) => {

    this.state.loginError=[]
    let {usernameValue, emailValue, passwordValue} = this.state
    let button = Object.assign({}, this.state.button)
    var valid_class = new validateSignup();
    let { error } = valid_class.validate( usernameValue, emailValue,passwordValue )
    if ( error  ){
      error.details.forEach(err => this.state.loginError.push(err)) 
      this.setState({ loginError: this.state.loginError })
    }

    else {

      var data = {
        username: this.state.usernameValue,
        email: this.state.emailValue,
        password: this.state.passwordValue,
      }



      button.dimmerLoad = button.disabled = true;
      this.setState({ button, loginError: [] });

      fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(data),
        withCredentials: true,
        credentials: 'include',
      })
        .then(user => {
        if(user.status == 400 ) return user.json()
          else 
         return user.json()
      })
        .then( message => {
          button.dimmerLoad = button.disabled = false;
          this.setState({ button });

          if (message.message == 'Account already exists') {

            this.state.loginError.push(message);
            let { loginError } = this.state;
            this.setState({ loginError });
          }
          else if (message.message == 'This username has been taken. Try something else') {

            this.state.loginError.push(message);
            let { loginError } = this.state;
            this.setState({ loginError });
          }
          
          else if (message.message == 'Account successfully created') {

            alert('account created successfully. You can now login with Username')
            this.props.history.replace('/login');

          }

        })
        .catch(err => {

          console.log(`this ${err} occured`);

        })

    }









  }

  uChange = (e) => {
    this.setState({ usernameValue: e.target.value });
  }

  eChange = (e) => {
    this.setState({ emailValue: e.target.value });
  }
  pChange = (e) => {
    this.setState({ passwordValue: e.target.value });
  }

  render() {

    return (

      <div className="bodyLogin">


        <Header active="signup" />

        <div className="login">
          <Grid columns={2} divided stackable>
            <Grid.Column>
              <div className="note">
                <h2>CREATE RICH PERSPECTIVES</h2>
                <p>Create an account and write your own story
</p>
              </div>


            </Grid.Column>

            <Grid.Column >
              <Error loginError={this.state.loginError} />

              <Form >
                <Form.Field width={10}>
                  <label style={{ 'color': 'rgb(3, 68, 94)' }} color="white" htmlFor="username">Username</label>
                  <input placeholder='Username' type="text" value={this.state.usernameValue} onChange={this.uChange} id="username" />
                </Form.Field>
                <Form.Field width={10}>
                  <label style={{ 'color': 'rgb(3, 68, 94)' }}>Email</label>
                  <input placeholder='Email' type="text" value={this.state.emailValue} onChange={this.eChange} />
                </Form.Field>
                <Form.Field width={10}>
                  <label style={{ 'color': 'rgb(3, 68, 94)' }} >Password</label>
                  <input placeholder='Password' type="password" value={this.state.passwordValue} onChange={this.pChange} />
                </Form.Field>

                <span style={{ 'color': 'black' }}> By Creating an account you have agreed to the <br /><a href="/terms-and-conditions">terms and conditions</a>
                </span>
                <br /><br />
                <Button size="large" color="teal" disabled={this.state.button.disabled} type='submit' onClick={this.submit}>CREATE AN ACCOUNT<DimmerLoad size="small" active={this.state.button.dimmerLoad} /></Button>
              </Form>
            </Grid.Column>

          </Grid>
        </div>
      </div>







    )
  }
}


const mapStateToProps = (state) => {
  return state;
}


Signup.T = {
  state: Object
};
export default withRouter(connect(mapStateToProps)(Signup));








