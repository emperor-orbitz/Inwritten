
//server.js
// Abdulmalik 02-12-18

var process = require('process');
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var cookieparser = require("cookie-parser");
var server = require('http').Server(app)
var handleBar = require('consolidate').handlebars;
var passport = require("passport");
var path = require("path");
var io = require("socket.io")(server)
var sslRedirect = require("heroku-ssl-redirect")


//easily attach io to server

require("dotenv").config({ path: __dirname + "/.env" });
require('./Utils/passport');
require("./Database/db");
//require("./Utils/notifications")(server)
var users_socket={}


  io.on("connection", function(socket){
   users_socket[socket.handshake.query.userid] = socket;
   app.locals.users_socket = users_socket

   })



var port = process.env.PORT || 5000;
var route_config = require('./Utils/route_config');

app.use(cookieparser())
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
//app.use(bodyParser.urlencoded({ limit: '50mb' }));





app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Options');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});




app.use(passport.initialize());

  app.set('view engine', 'handlebars');
  app.engine('handlebars', handleBar );

app.set("views", path.resolve(__dirname, "../Client/assets/views"));






//ROUTE CONFIGURATION IN PRODUCTION

if (process.env.NODE_ENV == "production") {
  app.use(sslRedirect());
  app.get('/index_bundle.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  })

  app.use(express.static(path.resolve(__dirname, "../Client/assets/"), {index:"homepage.html"}))
  app.use("/", route_config);
  app.get("/subscribe", (req, res) => {

    res.sendFile(path.resolve(__dirname, "../Client/assets/launchpage.html"));
  });
  app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, "../Client/assets/index.html"));
  });

  ;

}


if (process.env.NODE_ENV == "test") {
  //app.use(sslRedirect());

  app.use(express.static(path.resolve(__dirname, "../Client/assets/"), {index:"launchpage.html"}))
  app.use("/", route_config);
  app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, "../Client/assets/index.html"));
  });

  
}


//         LISTEN TO SERVER

process.on("unhandledRejection", (reason, promise) => {
  console.log(`Unhandled rejection at ${reason.stack}` || reason)
})

server.listen(port, console.log(`api running on port ${port}`));




