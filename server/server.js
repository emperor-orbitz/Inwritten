
//server.js
// Abdulmalik 02-12-18

var process = require('process');
var express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')

  //and create our instances

  , passport = require('passport')

  , session = require('express-session')

  , MongoStore = require('connect-mongo')(session)

  // show that it  is a configuration file for passport
  , cookieparser = require('cookie-parser');

var handleB = require('consolidate').handlebars;
var port = process.env.API_PORT || 5000;
require('./passport');
var route_config = require('./');


//APP.USE



app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Options');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});




var conn = mongoose.connect('mongodb://localhost:27017/penbox', { useNewUrlParser: true });
conn.then((suc) => {

  console.log('successful database connection!!');
}).catch((err) => {

  console.log('An error in connecting with the database', err);
})
//app.use(express.static('../public'));
app.engine('hbs', handleB);
app.set('view engine', 'hbs');




//ROUTE CONFIGURATION




app.use('/', require('./controllers/controller'));


//         LISTEN TO SERVER

process.on("unhandledRejection", (reason, promise) => {
  console.log(`Unhandled rejection at ${reason.stack}` || reason)
})

app.listen(port, console.log(`api running on port ${port}`));




