var nodeMail = require('nodemailer');
const mailgun = require("mailgun-js");

module.exports = class email{

 constructor(to){

  this.to =to;
  this.verify_email_template = (data)=>{
    return `
   
    <style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i&display=swap');
    *{
      font-family: 'Montserrat', Calibri;
      }

      .body{
        background-image: linear-gradient(115deg,  rgb(4, 82, 112), rgb(44, 43, 43) );
        height:100%;
        width:100%;
      }
      .btn{
        background-image: linear-gradient(115deg,  rgb(4, 82, 112), rgb(44, 43, 43) );

      }

      .grad-bg{
        color: linear-gradient(115deg,  rgb(4, 82, 112), rgb(44, 43, 43) );

      }

      .part-1, .part-2{
        width:80%;
        left: auto;
        right:auto;
        margin:5% 10%;
      }
    
    </style>

    <div style="font-family:Calibri;background-image: linear-gradient(115deg,  rgb(4, 82, 112), rgb(44, 43, 43) );
    height:100%;
    width:100%;
    text-align:center;
    padding-top:10%;
    padding-bottom:10%">
    <div style="color:white; width:80%; left: auto; right:auto; margin:10%; margin-bottom:5%;"> 
        <img style="width:60%;margin-left:5%" src="penbox.herokuapp.com/logo.png" />
        <h1 >Welcome from us</h1>
    </div>

    <div style="width:80%;
    left: auto;
    right:auto;
    margin:5%;
    margin-top:0px;
    background:white;
    color:black;
    padding:5%"> 

    <p>Hey <b>${data.username}</b>, verify your email by clicking the button below, gracias. </p><br/>   
    <a href="https://penbox.herokuapp.com/auth/verify_mail/${data._id}"><button style="background-image: linear-gradient(115deg,  rgb(4, 82, 112), rgb(44, 43, 43));color:white;border:none; padding:20px;margin-left:5%; border-radius:3px; width:50%">VERIFY</button> </a>

    </div>

    </div>

  
    
    
    `
  }


  this.reset_password_template = (data)=>{
    return `
   
    <style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i&display=swap');
    *{
      font-family: 'Montserrat', Calibri;
      }

      .body{
        background-image: linear-gradient(115deg,  rgb(4, 82, 112), rgb(44, 43, 43) );
        height:100%;
        width:100%;
      }
      .btn{
        background-image: linear-gradient(115deg,  rgb(4, 82, 112), rgb(44, 43, 43) );

      }

      .grad-bg{
        color: linear-gradient(115deg,  rgb(4, 82, 112), rgb(44, 43, 43) );

      }

      .part-1, .part-2{
        width:80%;
        left: auto;
        right:auto;
        margin:5% 10%;
      }
    
    </style>

    <div style="font-family:Calibri;background-image: linear-gradient(115deg,  rgb(4, 82, 112), rgb(44, 43, 43) );
    height:100%;
    width:100%;
    text-align:center;
    padding-top:10%;
    padding-bottom:10%">
    <div style="color:white; width:80%; left: auto; right:auto; margin:10%; margin-bottom:5%;"> 
        <img style="width:60%;margin-left:5%" src="penbox.herokuapp.com/logo.png" />
        <h1> Reset your password </h1>
    </div>

    <div style="width:80%;
    left: auto;
    right:auto;
    margin:5%;
    margin-top:0px;
    background:white;
    color:black;
    padding:5%"> 

    <p>Hey <b>${data.username}</b>, Reset your password by clicking the link below, gracias. If you didn't perform this action, please ignore this message </p><br/>   
    <a href="https://penbox.herokuapp.com/auth/change_password_page/${data.hash}"><button style="background-image: linear-gradient(115deg,  rgb(4, 82, 112), rgb(44, 43, 43));color:white;border:none; padding:20px;margin-left:5%; border-radius:3px; width:50%">Change Password</button> </a>

    </div>

    </div>

  
    
    
    `
  }


 }



  //SET API KEY
 sendVerifyMail(result){

//USING @MAILGUN
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, 
  domain: "mg.inwritten.com",
  host: "api.mailgun.net"
  /* -> Add this line for EU region domains*/ });


const data = {
from: "Inwritten <support@inwritten.com>",
to: this.to,
bcc:"9jaexclusive@gmail.com, malorbit360@gmail.com",
subject: 'Verify your email',
text: 'Testing some Inwritten awesomness!',
template: "verify_email", //template name
'v:username': result.username,
'v:_id': result._id   
};


mg.messages().send(data)
.then(sent =>{console.log("email sent successfully", sent)})
.catch(err =>{ console.log("email was not sent successfully", err)})



}






  //SEND PASSWORD RESET
  send_password_reset(result){

    //USING @MAILGUN

const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, 
  domain: "mg.inwritten.com",
  host: "api.mailgun.net"
  /* -> Add this line for EU region domains*/ });


const data = {
from: "Inwritten <support@inwritten.com>",
to: this.to,
subject: 'Verify your email',
text: 'Testing some Inwritten awesomness!',
template: "reset_password", //template name
'v:username': result.username,
'v:hash': result.hash   
};


mg.messages().send(data)
.then(sent =>{console.log("email sent successfully", sent)},
err=>{
  console.log("bad bad", err)
}
)
.catch(err =>{ console.log("email was not sent successfully", err)})


  
  }


    //SEND PASSWORD RESET
  subscribe(result){

      //USING @MAILGUN
  
  const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, 
    domain: process.env.MAILGUN_DOMAIN, 
    host: "api.mailgun.net",  /* -> Add this line for EU region domains*/ });

    const data = {
      from: "Inwritten <support@inwritten.com>",
      to: this.to,
      subject: 'Verify your email',
      text: 'Testing some Inwritten awesomness!',
      template: "reset_password", //template name
      'v:username': result.username,
      'v:hash': result.hash   
      };
      

 mg.messages().send(data)
  .then(sent =>{console.log("email sent shhhhhhhhhhhhhh vvsuccessfully", sent)})
  .catch(err =>{ console.log("email was not sent successfully", err)})
  
  
    
    }

 }

 

 









