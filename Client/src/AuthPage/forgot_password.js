import React from 'react';
import '../../Resources/styles/style.scss';
import { Button, Form, Grid, Loader, Icon, } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import Connection from '../../Controllers/auth.controller';
import { connect } from 'react-redux';
import Header from '../AuthPage/header';
import Validator from '../../Controllers/validators/login.validator';


function DimmerLoad(props) {
  return <Loader active={props.active} size={props.size} inline />

}

function Error(props) {
  var { loginError } = props;
  if (loginError.length <= 0) return (<div></div>)
  else if(loginError[0].type == "success"){
    return (
      <div>
        {
          loginError.map( val => {
          return <div style={{color:"green"}} key={loginError.indexOf(val)}>
           <Icon name="checkmark"/> {val.message}
          </div>
        })
      }
  
      </div>
      )
  }
  else 
    return (
    <div>
      {
        loginError.map( val => {
        return <div className="error-li" key={loginError.indexOf(val)}>
          {val.message}
        </div>
      })
    }

    </div>
    )
  }






class ForgotPassword extends React.Component {

  constructor(props) {

    super(props)
    this.submit = this.submit.bind(this);

    this.eChange = this.eChange.bind(this);
    this.state = {
      button: {
        dimmerLoad: false,
        disabled: false
      },
      emailValue: '',
      passwordValue: '',
      loginError: [],
      isLoggedin: false

    
    }
  }


  componentDidMount() {
    let hs_token = localStorage.getItem("hs_token");
    var connect = new Connection();

    connect.isLoggedin(hs_token)
      .then( _ => {

        this.props.dispatch({ type: 'INJECT_PROFILE', payload: _ })
        this.props.history.replace('/dashboard');

      })
      .catch(_ => {

        console.log( _ + "I GOT THIS IN THIS PLACE");

      })

  }





  submit(_) {
    var connect = new Connection();

   

    let button = Object.assign({}, this.state.button);
    var email_test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var test = email_test.test(this.state.emailValue)
    button.dimmerLoad = button.disabled = true

    if(test == true){
      this.setState({button})
      connect.reset_password({email: this.state.emailValue})
      .then( _ => {
        
        button.dimmerLoad = button.disabled = false
        //this.setState({ button })
        this.props.history.replace('/dashboard')

      }).catch(_ => {
        this.state.loginError = [];
        var { loginError } = this.state;

        button.disabled = button.dimmerLoad = false;

        loginError.push(_);
        this.setState({ loginError, button });

      })

    }

   
else{
        var { loginError } = this.state;
        button.dimmerLoad = button.disabled = false;

        this.setState({ loginError:[{ id:1, message:"Please correct your email" }],
          button: button
        })
        this.state.loginError = [];
}
      

      

  }



  eChange = (email) => {
    email.preventDefault();

    this.setState({ emailValue: email.target.value });
  }

 


  render() {



    return (

      <div className="bodyLogin">

        <Header active="login" />

        <div className="login">
          <Grid columns={2} divided stackable>
            <Grid.Column>
              <div className="note">
                <h1>Forgot Password?</h1>
                <p>We'll get it back here</p>
       
              </div>


            </Grid.Column>

            <Grid.Column >
              <Error loginError={this.state.loginError} />

              <Form >

                <Form.Field width={10}>
                  <label style={{ 'color': 'rgb(3, 68, 94)' }}>Email</label>
                  <input placeholder='What is your email?' type="text" value={this.state.emailValue} onChange={this.eChange} />
                </Form.Field>
          
                <Button size="large" style={{'color': 'rgb(3, 68, 94)'}}  disabled={this.state.button.disabled} type='submit' onClick={this.submit}>SEND ME A LINK<DimmerLoad size="small" active={this.state.button.dimmerLoad} /></Button>
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


ForgotPassword.T = {
  state: Object
};
export default withRouter(connect(mapStateToProps)(ForgotPassword));








