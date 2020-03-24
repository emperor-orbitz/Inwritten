
var signup = require('../Models/user.model');
var passport = require('passport');
var sgMail = require('@sendgrid/mail');
var http_status = require("../Utils/http_status");
var jwt = require("jsonwebtoken");
var validate = require("../Utils/validation");
var mail = require("../Utils/email");
var path = require("path")
var URL = require("url")


/*
*           SEND VERIFICATION EMAIL
*              send_mail
#           NOT YET TESTED 
*/


var send_mail = async (req, res) => {

    let userid = req.params.userid;
    var finduser = new signup;
    try {

        var user = await finduser.findUserById(userid);

        if (user === null) console.log('LINK IS BROKEN', res);
        else if (user !== null) {
            if (user.verified === true) console.log('LINK IS BROKEN -1');

            else if (user.verified != true) {

                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: "malorbit360@gmail.com",
                    //cc:"malorbit365@yahoo.com",
                    from: 'contact@penbox.com',
                    templateId: 'd-c0dbe040a46b4cc0b2131cb82c58d1ce',
                    dynamic_template_data: {
                        name: user.username,
                        confirm_link: `api/mailconfirm/${user._id}`
                    }
                };
                finduser.updatelastVerified(res._id, async (not_updated, updated) => {
                    if (not_updated) {
                        res.status(http_status.INTERNAL_SERVER_ERROR.code)
                            .send({ data: [] });

                    }
                    else {
                        try {
                            var send = await sgMail.send(msg);
                            console.log('SENT THE MESSAGE');
                            res.status(http_status.OK.code)
                                .send({ data: send });
                        }
                        catch (err) {
                            console.log(err)
                        }


                    }

                })
            }
        }


    }
    catch (error) {
        res.status(http_status.INTERNAL_SERVER_ERROR.code)
            .send({ data: [] });
    }



}




/*

           SEND VERIFICATION EMAIL
              verify_mail
*/




var verify_mail = async (req, res) => {
    //check if user with ID

    let userid = req.params.userid;
    var finduser = new signup;
    try {
        var result = await finduser.findUserById(userid);

        if (result === null) {
                            res.sendFile(path.resolve(__dirname, "../../Client/assets/broken_email.html"))

        }
        else if (result != null) {
            //IS IT VERIFIED?
            var date = new Date();
            if ((date.getTime() - result.lastVerified) > (1 * 24 * 60 * 60 * 1000)) {
          res.sendFile(path.resolve(__dirname, "../../Client/assets/broken_email.html"))

            }
            else if (result.verified === true) {

          res.sendFile(path.resolve(__dirname, "../../Client/assets/broken_email.html"))
            }

            else {
                finduser.verifyUser(userid, function (err, success) {
                    if (err) {
                         res.sendFile(path.resolve(__dirname, "../../Client/assets/broken_email.html"))
                    }
                    else {
                        res.sendFile(path.resolve(__dirname, "../../Client/assets/confirm_email.html"))
                    }

                })

            }
        }

    }
    catch (error) {

  res.sendFile(path.resolve(__dirname, "../../Client/assets/broken_email.html"))

    }



}










/*           SIGNUP ACTION
*           Signup user /PASSPORT
*/


var register = (req, res) => {
    var valid = new validate();

    valid.validate(req.body).then(good => {
        var saves = new signup();

        saves.findByEmail(req.body.email, async (err, success) => {
            if (err)
                res.json({ message: 'Error already occured' });

            else if (success != null) {
                //console.log(success);
                res.status(400)
                    .json({ message: 'Account already exists' });

            }
            else {

                try {
                    const { username, email, password } = req.body;  
                    let check_username = await saves.findByUsername(username);
                    //console.log(check_username)
                    if( check_username == null ){
                        var result = await saves.createUser(username, email, password);
                        var send = new mail("malorbit360@gmail.com");
                        send.sendVerifyMail({ username: result.username, _id: result._id });
                     
                       
                        res.status(200)
                          .send({ message: "Account successfully created" });
    
                    }
                    else  
                        res.status(400)
                        .send({ message: "This username has been taken. Try something else" });

                }

                catch (error) {
                    res.status(500)
                        .send({ message: 'Failed! An error is here' + error });
                }

            }


        })


    })
        .catch(err =>{

            res.status(400)
            .send({
                message: `Invalid Parameters: ${err}` ,
            })
        } )


}



/*          LOCAL LOGIN ACTION
*/



var login = (req, res, next) => {


    passport.authenticate('login', function (err, user) {

        if (err) {
            res.status(500)
                .send({ message: `Sorry Something went wrong! we would fix it`, user: null })

        }

        if (!user) {
            res.status(401)
                .send({ message: `Invalid username or password`, user: null });

        }

        else {

            var signature = jwt.sign({ user: user }, process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                });

            res.status(200)
                .cookie("hs_token", `${signature}`, {maxAge:1080000})
                .send({ token: `bearer ${signature}`, user: user });

        }
    })(req, res, next);

}



/*
         CHECK ISLOGGEDIN
*/
var isloggedin = (req, res, next) => {

    res.status(200)
        .send({ data: req.user });
}


var testemail = (req, res, next) => {
    res.send('What API are you looking for?');

}





/*           RESET PASSWORD
*           RESET USER PASSWORD
*/


var reset_password = (req, res) => {
    var valid = new validate();

    
    var email_test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email_test.test(req.body.email)){
    var saves = new signup();

        saves.findByEmail(req.body.email, async (err, success) => {
     
           if (success != null) {
                //console.log(success);
                //send a reset link here/ HASH
                try{
                    var signature = jwt.sign({ email: success.email, id:success._id }, process.env.PASSWORD_RESET_SECRET,
                        {
                            expiresIn: "5m"
                        });
                    //send JWT

                    var send = new mail(success.email)
                    send.send_password_reset({ username:success.username, email:success.email, hash:signature })
                    res.json({ status:200, message: 'Sent! Check your email to continue' });

                }
                catch(err){
                    res.json({ message: 'Oops, something went wrong. We\'ll fix it soon' });

                }
               


            }
            else{
                //no matvh
                res.json({ status:401, message: 'Oops, we don\'t know about this email. Signup for free' });


            }
            
            


        })

    }
    else{
        console.log("err", err)
        res.status(400)
        .send({
            message: "Invalid Parameters",
        })
    }
        



}

//REDIRECT TO PASSWORD CHANGE PAGE
var change_password_page =(req,res, next) =>{

    var token = req.query.token;
    //verify token & go to page
    try{
        let verify = jwt.verify(token, process.env.PASSWORD_RESET_SECRET);
        if (verify != null){
            res.sendFile(path.resolve(__dirname, "../../Client/assets/change_password_page.html"))
    
        }
    }
    catch(JWTError){

        res.sendFile(path.resolve(__dirname, "../../Client/assets/broken_email.html"))

        //res.send("JWT ERROR"+ JWTError)
    }
    
}






//SUBMIT PASSWORD CHANGE FORM
var change_password_page_submit = (req,res, next) =>{

    //verify token & go to page
    try{
        if(req.body.new_password == req.body.confirm_password){
            var token = URL.parse(req.headers.referer,/** parse query string too */true).query.token;
            var data = jwt.verify(token, process.env.PASSWORD_RESET_SECRET)
            let password_change = new signup;
            password_change.updateProfile_password(data.id, {new_password: req.body.confirm_password}, (err, ok)=>{
                if(err){
                    res.send("there was an error"+ err)
                }
                else{
                    res.json({message:"Password Changed successfully", type:"success"})
                }
            })
            //change password
        }
        else{
            res.json({message:"confirm password properly", type:"error"})
        }
        
    }
    catch(JWTError){

        res.sendFile(path.resolve(__dirname, "../../Client/assets/broken_email.html"))

        //res.send("JWT ERROR"+ JWTError)
    }
    
}






/*
*          API TESTING
*/
var api = (req, res, next) => {
    res.render('Utility/broken_email');

}


module.exports = {
    login: login,
    register: register,
    verify_mail: verify_mail,
    send_mail: send_mail,
    api: api,
    isloggedin: isloggedin,
    testemail:testemail,
    reset_password: reset_password,
    change_password_page:change_password_page,
    change_password_page_submit: change_password_page_submit

};