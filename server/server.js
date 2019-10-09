
//server.js
// Abdulmalik 02-12-18

var process = require('process');
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var handleBar = require('consolidate').ejs;
var passport = require("passport");

require("dotenv").config({path:__dirname +"/.env"});
require('./Utils/passport');
require("./Database/db");

var port = process.env.API_PORT;

var route_config = require('./Utils/route_config');


app.use(bodyParser.urlencoded({ extended: false, limit: '20mb'}));
app.use(bodyParser.json({limit:'50mb'}))



app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Options');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(passport.initialize());


app.use(express.static('./public'));
app.engine('handlebars', handleBar);
app.set('view engine', 'handlebars');
app.set("views", __dirname+"/public/views");



//ROUTE CONFIGURATION




app.use('/', route_config);


//         LISTEN TO SERVER

process.on("unhandledRejection", (reason, promise) => {
  console.log(`Unhandled rejection at ${reason.stack}` || reason)
})

app.listen(port, console.log(`api running on port ${port}`));




