import React from 'react';
import '../../Resources/styles/style.scss';
import { Button, Form, Grid, Icon, Loader, } from 'semantic-ui-react';
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
  
  else 
  console.log(props.loginError+"jkjj")
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






class Login extends React.Component {

  constructor(props) {

    super(props)
    this.submit = this.submit.bind(this);

    this.pChange = this.pChange.bind(this);
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

    var data = {
      email: this.state.emailValue,
      password: this.state.passwordValue,
    }

    let button = Object.assign({}, this.state.button);
    var validate = new Validator({ email: this.state.emailValue, password: this.state.passwordValue });



    validate.emailPromise().then(_ => {

      connect.login(data)
        .then( _ => {
          
          button.dimmerLoad = button.disabled = true
          this.setState({ button })
          this.props.history.replace('/dashboard')

        }).catch(_ => {
          this.state.loginError = [];
          var { loginError } = this.state;

          button.disabled = button.dimmerLoad = false;

          loginError.push(_);
          this.setState({ loginError, button });

        })

    })
      .catch( err => {

        var { loginError } = this.state;
        button.dimmerLoad = button.disabled = false;

        this.setState({ loginError:err,
          button: button
        })
        this.state.loginError = [];

      })

  }



  eChange = (email) => {
    email.preventDefault();

    this.setState({ emailValue: email.target.value });
  }

  pChange = (password) => {
    password.preventDefault();
    this.setState({ passwordValue: password.target.value });
  }


  render() {



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
                <Icon name="js" color="teal" size="big" />
                <Icon name="edit outline" size="big" />
                <Icon name="database" color="teal" size="big" />
                <Icon name="html5" size="big" />
              </div>


            </Grid.Column>

            <Grid.Column >
              <Error loginError={this.state.loginError} />

              <Form >

                <Form.Field width={8}>
                  <label style={{ 'color': 'white' }} color="white">Email</label>
                  <input placeholder='Email' type="text" value={this.state.emailValue} onChange={this.eChange} />
                </Form.Field>
                <Form.Field width={8}>
                  <label style={{ 'color': 'white' }}>Password</label>
                  <input placeholder='Password' type="password" value={this.state.passwordValue} onChange={this.pChange} />
                </Form.Field>


                <Button size="large" color="teal" disabled={this.state.button.disabled} type='submit' onClick={this.submit}>Submit<DimmerLoad size="small" active={this.state.button.dimmerLoad} /></Button>
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


Login.T = {
  state: Object
};
export default withRouter(connect(mapStateToProps)(Login));








