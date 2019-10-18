var nodeMail = require('nodemailer');

module.exports = class email{

 constructor(to){

  this.to =to;


 }
  //SET API KEY
 sendVerifyMail(data){

  const mailOptions= {
    from:"malorbit360@gmail.com",
    to:this.to,
    subject:"One last step to greatness",
    html:`<p>Hi ${data.username}, Click the link below to verify your account </p><br/>
    <a href="http://localhost:5000/auth/verify_mail/${data._id}>VERIFY YOUR ACCOUNT </a>`
        
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
    throw new Error(err)
  } 

  else console.log("THE EMAIL WAS SUCCESSFUL"+ info)
})


}


 }

 

 









