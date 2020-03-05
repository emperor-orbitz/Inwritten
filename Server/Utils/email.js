var nodeMail = require('nodemailer');

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
 sendVerifyMail(data){

  const mailOptions= {
    from:"malorbit360@gmail.com",
    to:this.to,
    subject:"Hashstack.io: Click the link to reset your password ",
    html:this.reset_password_template(data)
     }
     var transporter = nodeMail.createTransport({
      service:"gmail",
      auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
      }
    })

    transporter.sendMail(mailOptions, function(err, info){
  if(err){
    console.log("THERE WAS AN ERROR IN THE EMAIL"+err);

  } 

  else console.log("THE PASSWORD RESET MAIL WAS SUCCESSFUL"+ info)
})


}






  //SEND PASSWORD RESET
  send_password_reset(data){

    const mailOptions= {
      from:"malorbit360@gmail.com",
      to:this.to,
      subject:"Hashstack.io: Just one more step ",
      html:this.reset_password_template(data)
       }
       var transporter = nodeMail.createTransport({
        service:"gmail",
        auth:{
          user:process.env.SMTP_USER,
          pass:process.env.SMTP_PASS
        }
      })
      console.log(process.env.SMTP_USER, process.env.SMTP_PASS)
  
      transporter.sendMail(mailOptions, function(err, info){
    if(err){
      console.log("THERE WAS AN ERROR IN THE EMAIL"+err);
  
    } 
  
    else console.log("THE EMAIL WAS SUCCESSFUL"+ info)
  })
  
  
  }



 }

 

 









