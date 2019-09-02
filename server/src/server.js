
//server.js
'use strict'




/*
*
*           INITIALIZATION
*
*/
var process = require('process');
var express = require('express')
//,router =express.Router()
,app = express()
,mongoose = require('mongoose')
,bodyParser = require('body-parser')

//and create our instances

,passport = require('passport')

,session = require('express-session')

,MongoStore = require('connect-mongo')(session)

// show that it  is a configuration file for passport
,cookieparser= require('cookie-parser');

var handleB =require('consolidate').handlebars;
var port = process.env.API_PORT || 5000;
require('../passport');
var route_config = require('../routes/route-config');


/*
*
*           APP.USE()
*
*/



app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Options');
   //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();//cause trouble
   }); 
    


//now we should configure the API to use bodyParser and look for 
//JSON data in the request body

var conn = mongoose.connect('mongodb://localhost:27017/penbox', { useNewUrlParser:true });
conn.then((suc)=>{

console.log('successful database connection!!');
}).catch((err)=>{

console.log('An error in connecting with the database', err);
})
//app.use(express.static('../public'));
app.engine('hbs', handleB );
app.set('view engine', 'hbs');

app.use(cookieparser('Hello'));
app.use(bodyParser.json({limit:'20mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
secret:'Hello',
resave: false,
saveUninitialized:false,
store: new MongoStore({url:'mongodb://127.0.0.1/penbox'}),

cookie:{
  maxAge:1000 *60 * 60 * 24 ,
  httpOnly:false,
  secure:false
}
}));

app.use(passport.initialize({userProperty:'users'}));
app.use(passport.session());





/*
*
*           ROUTE CONFIGURATION
*
*/



app.use('/',route_config);

app.use(function(req, res, next){
res.send('Error 404, Try Checking your link again');
next();
})

/*
*
*           LISTEN TO SERVER
*
*/

process.on("unhandledRejection", (reason, promise)=>{
  console.log(`Unhandled rejection at ${reason.stack}` || reason )
})

app.listen(port, console.log(`api running on port ${port}`));




