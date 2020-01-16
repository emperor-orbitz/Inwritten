import React from 'react';
import '../../Resources/styles/profile.scss';
import { Icon, Form, Divider, Button, Loader, ButtonGroup } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import Connection from '../../Controllers/auth.controller';
import { connect } from 'react-redux';
import ProfileUpdate from '../../Controllers/profile.controller';
import Countries from './country';




function DimmerLoad(props) {
    return <Loader active={props.active} size={props.size} inline />

}




class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            mobile_number: '',
            first_name: '',
            last_name: '',
            profile_photo: "src\img\background.jpg",
            update_success: '',
            update_header: '',
            update_content: '',
            update_color: '',
            old_password: '',
            new_password: '',
            confirm_password: '',
            bio: '',
            validationMessage: '',
            buttonDisabled: false,
            dimmerLoad: false,
            validationClass: '',
            //passwordDisabled: true,
            dispPass: "none",
            dispProf: "block",
            country:"",
            gender:""



        }
     
    }



    connect = new Connection();
    componentDidMount() {

        let auth_token = localStorage.getItem("hs_token");

        this.connect.isLoggedin(auth_token)
            .then( user => {
                this.setState({
                    isLoggedin: true,
                    username: user.username,
                    email: user.email,
                    profile_photo: user.display_picture,
                    mobile_number: user.telephone == null? " ": user.telephone,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    bio: user.bio,
                    gender:user.gender,
                    country: user.country
                })

                //this.setState({...this.props.ProfileReducer});

            })
            .catch( _ => this.props.history.replace('/login'))


    }



    handle_bio = (ev) => this.setState({ bio: ev.target.value }) 

    handle_old_password= (ev) => this.setState({ old_password: ev.target.value });

    handle_new_password= (ev) => this.setState({ new_password: ev.target.value });

    handle_confirm_password = (ev) => this.setState({ confirm_password: ev.target.value });

    
    readFile(doc) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();

            reader.readAsDataURL(doc);

            reader.onloadend = function () {
                resolve(reader.result);
            }
        })

    }


    handle_profile_photo =(ev) => {
        this.readFile(ev.target.files[0]).then( result => {
            this.setState({ profile_photo: result })
        })



    }

    handle_email = (ev)=> this.setState({ email: ev.target.value })

    handle_first_name= (ev)=> this.setState({ first_name: ev.target.value });
    

    handle_last_name= (ev) => this.setState({ last_name: ev.target.value });

    handle_username = (ev) => this.setState({ username: ev.target.value });
    
    handle_mobile_number=(ev) => this.setState({ mobile_number: ev.target.value });
    handle_gender =(ev) => this.setState({gender: ev.target.value})
    handle_country = (ev) => this.setState({country: ev.target.value})







    toggleDialog() {
        var photo = document.getElementById('photo');
        photo.click();
    }

    check_number(form_no) {

        if ((form_no.length < 11) || (form_no.length > 14)) {

            return false;
        }

        else {
            return true;
        }
    }




    //update profile
    updateProfileButton(e) {
        e.preventDefault();

        this.setState({ dimmerLoad: true, buttonDisabled: true })

        var update_profile = new ProfileUpdate()


        if (this.state.username == '') {

            this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: 'Please fill compulsory fields', validationClass: 'error-bar' });
            this.state.validationClass = this.state.validationMessage = '';
        }

        else if ((this.state.last_name.length > 0) && (this.state.last_name.length < 4)) {
            //form.number.setCustomValidity('The Mobile Number is invalid');
            this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: 'Sorry, too small for a lastname', validationClass: 'error-bar' });
            this.state.validationClass = this.state.validationMessage = '';
        }

        else if (this.state.mobile_number.length > 0 && this.check_number(this.state.mobile_number) === false) {
            //form.number.setCustomValidity('The Mobile Number is invalid');
            this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: 'Please enter a valid mobile number', validationClass: 'error-bar' });
            this.state.validationClass = this.state.validationMessage = '';
        }
       
        else if (this.state.bio.length > 0 && this.state.bio.length < 20) {
            this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: 'Please make bio lenghtier', validationClass: 'error-bar' });
            this.state.validationClass = this.state.validationMessage = '';
        }

        else {

            this.state.validationClass = this.state.validationMessage = '';
            var updateItems = {
                firstName: this.state.first_name,
                lastName: this.state.last_name,
                telephone: this.state.mobile_number,
                email: this.state.email,
                bio: this.state.bio,
                profile_photo: this.state.profile_photo,
                username: this.state.username,
                gender: this.state.gender,
                country: this.state.country
            }


            update_profile.updateProfile(updateItems)
                .then( data => {
                    //update store also

                    this.props.dispatch({ type: 'INJECT_PROFILE', payload:{
                        username: this.state.username,
                        email: this.state.email,
                        display_picture : this.state.profile_photo,
                        telephone: this.state.mobile_number,
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        bio: this.state.bio,
                        gender:this.state.gender,
                        country: this.state.country

                    }  })

                    this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage:  data.message, validationClass: 'success-bar' });
                })
                .catch( err => {

                    if (err.code == 400 ||500) {
                        this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: err.message, validationClass: 'error-bar' });

                    }
                 

                });



        }



    }



    //update password 
    updatePasswordButton(e) {
        e.preventDefault();

        this.setState({ dimmerLoad: true, buttonDisabled: true });


        var controller = new ProfileUpdate();


        if (this.state.new_password.length == 0 || this.state.old_password.length == 0 || this.state.confirm_password.length == 0) {
            this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: 'None of the password field should be left empty', validationClass: 'error-bar' });

            this.state.validationClass = this.state.validationMessage = '';
        }
        else if ((this.state.new_password.length < 6) || (this.state.old_password.length < 6)) {
            this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: 'Password length is too short minimum of 6 characters', validationClass: 'error-bar' });

            this.state.validationClass = this.state.validationMessage = '';
        }
        else if (this.state.new_password !== this.state.confirm_password) {
            this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: 'Sorry, you have a password mismatch', validationClass: 'error-bar' });

            this.state.validationClass = this.state.validationMessage = '';
        }

        else {

            this.state.validationClass = this.state.validationMessage = '';
            var updateItems = {

                username: this.state.username,
                old_password: this.state.old_password,
                new_password: this.state.new_password,
                confirm_password: this.state.confirm_password
            }


            controller.update_password(updateItems)
                .then( success=> {
                    this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: success.message, validationClass: 'success-bar' });
                })
                .catch( err => {
                    if (err.status == "false") {
                        this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: err.message, validationClass: 'error-bar' });

                    }
                    else {
                        this.setState({ dimmerLoad: false, buttonDisabled: false, validationMessage: err.message, validationClass: 'error-bar' });
                    }

                });

        }



    }
    swapSettings(e) {

        if (e.target.id == "password") {
            if (this.state.dispPass == "block");
            else if (this.state.dispPass == "none") { this.setState({ dispPass: "block", dispProf: "none" }) }

        }
        else if (e.target.id == "profile") {
            if (this.state.dispProf == "block");
            else if (this.state.dispProf == "none") { this.setState({ dispProf: "block", dispPass: "none" }) }


        }


    }
   


    render() {

        var { email, username, bio, mobile_number, first_name, last_name } = this.state;
        let fullname = first_name !="" ? `${first_name} ${last_name}`: "Update your Names"
        var bio = bio !="" ? bio :` - `
        var username = username !="" ? username :` - `
        var mobile_number = mobile_number !="" ? mobile_number :` - `
        return (

            <div className="profile-div" style={{marginTop:"0px !important"}}>

                <div className='profile-header'>
                    <div className="profile-pix-block">
                        <img src={this.state.profile_photo} className="profile-pix" id='profile_photo' />
                        <input className="profile-pix-cover" onChange={this.handle_profile_photo} type='file' placeholder='Mobile Number' id='photo' style={{ visibility: 'hidden' }} />
                        <div className="profile-pix-cover" onClick={this.toggleDialog.bind(this)}></div>
                    </div>

                    <div className="profile-primary-info">
                        <h2 style={{ color: 'black' }}> {fullname} </h2>
                        <div className='span-details'>Username</div> <span> @{username} </span><br></br>
                        <div className='span-details'>Email</div><span> {email}</span><br></br>

                    </div>
                </div>



                <div className="profile-body">
                    <div className="data-info-profile" style={{ display: this.state.dispProf }}>
                        <h3 style={{ padding: '5px', color:"black" }}> Edit Profile</h3>
                    
                        <ButtonGroup size="small"  >
                            <Button id="profile" onClick={(e) => this.swapSettings(e)} active= {this.state.dispProf=='block' ? true:false}>Profile </Button>
                            <Button id="password" onClick={(e) => this.swapSettings(e)} active ={this.state.dispPass=='block' ? true:false} >Password</Button>

                        </ButtonGroup>


                        <div className={this.state.validationClass} style={{ marginBottom: '5px' }} > {this.state.validationMessage}</div>

                        <Form size="small" style={{ width: '70%' }} id='formUpdate'>
                        <Divider />

                            <Form.Group widths='equal'>
                                <Form.Field label='Email' value={this.state.email} control='input' placeholder='Email' onChange={this.handle_email} disabled required type='email' pattern={/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/} />
                                <Form.Field label='Username' control='input' placeholder='Username' value={this.state.username} onChange={this.handle_username} name='username' id='username' type='text' required />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field label='Firstname' value={this.state.first_name} control='input' placeholder='Firstname' onChange={this.handle_first_name} />
                                <Form.Field label='Lastname' control='input' placeholder='Lastname' value={this.state.last_name} onChange={this.handle_last_name} />
                            </Form.Group>

                            <span style={{color:"black"}}>Country</span>

                            <Countries handleChange={this.handle_country} value={this.state.country} />
                            <br></br>
                            
                            <span style={{color:"black"}}>Gender</span>
                            <select onChange={  this.handle_gender } value={this.state.gender} >
                                <option value="none">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <br></br>

                            <Form.Field id='bio' label='Bio (Write something...)' control='textarea' value={this.state.bio} onChange={this.handle_bio} minLength='20' maxLength='150' name='bio' />

                            <Form.Field id='number' label='Mobile Number' control='input' type='tel' value={this.state.mobile_number} onChange={this.handle_mobile_number} minLength='11' maxLength='14' name='number' />

                            <Button type='submit' secondary color='teal' disabled={this.state.buttonDisabled} size='small' floated='right' onClick={this.updateProfileButton.bind(this)}>
                                Update Profile <DimmerLoad size="small" active={this.state.dimmerLoad} />
                            </Button>
                        </Form>





                    </div>

                    <div className="data-info-password" style={{ display: this.state.dispPass }} >
                        <h3 style={{ padding: '5px', color:'black' }}> Account Info</h3>

                        <ButtonGroup size="small" >
                            <Button id="profile" onClick={(e) => this.swapSettings(e)} active= {this.state.dispProf=='block' ? true:false}>Profile </Button>
                            <Button id="password" onClick={(e) => this.swapSettings(e)} active ={this.state.dispPass=='block' ? true:false} >Password</Button>

                        </ButtonGroup>


                        <div className={this.state.validationClass} style={{ marginBottom: '5px' }} > {this.state.validationMessage}
                        </div>


                        <Form size="small" style={{ width: '70%' }} id='formUpdate'>

                            <Divider />
                            <Form.Field label='Old Password ' control='input' type='password' placeholder='Old password' minLength='6' value={this.state.old_password} onChange={this.handle_old_password} />

                            <Form.Field label='New Password' control='input' type='password' placeholder='New password' minLength='6' value={this.state.new_password} onChange={this.handle_new_password} />
                            <Form.Field label='Confirm New Password' control='input' type='password' placeholder='Confirm New password' value={this.state.confirm_password} onChange={this.handle_confirm_password} />


                            <Button type='submit' secondary color='teal'  disabled={this.state.buttonDisabled} size='small' floated='right' onClick={this.updatePasswordButton.bind(this)}>
                                Update Password <DimmerLoad size="small" active={this.state.dimmerLoad} />
                            </Button>
                        </Form>





                    </div> 

                </div>




            </div>
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Profile));






