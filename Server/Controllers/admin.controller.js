
var path = require("path")
const mailgun = require("mailgun-js");




/*
*          API TESTING
*/
var secret_space = (req, res, next) => {
    //check for my email and password

        res.sendFile(path.resolve(__dirname, "../../Client/assets/secret_admin.html"))
}


var send_bulk_email = (req, res, next) => {
    //check for my email and password
    const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, 
        domain: "mg.inwritten.com",
        host: "api.mailgun.net"
        /* -> Add this line for EU region domains*/ });
      
      
      const data = {
      from: "Inwritten <support@inwritten.com>",
      to: req.body.alias,
      bcc:"9jaexclusive@gmail.com, malorbit360@gmail.com",
      subject: 'Daily Inwritten newsletter',
      text: 'Testing some Inwritten awesomness!',
      template: req.body.template, //template name
   
      
      };
      
      
      mg.messages().send(data)
      .then(sent =>{
        res.send("Successfuly sent tothem")  
        console.log("email sent successfully", sent)
    })
      .catch(err =>{ 
            res.send(err, "eror in sending")  
        console.log("email was not sent successfully", err)
    })


      }



var login_page = (req, res, next) => {
    //check for my email and password
        res.sendFile(path.resolve(__dirname, "../../Client/assets/admin_login.html"))
}


var login_page_submit = (req, res, next) => {
    //check for my email and password
        res.redirect("/admin/secret/one-way-road")
}


module.exports = {
   secret_space,
   login_page,
   login_page_submit,
   send_bulk_email
};