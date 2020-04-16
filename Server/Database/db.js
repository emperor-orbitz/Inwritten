var mongoose = require('mongoose');
var process = require('process')

var conn = mongoose.connect('mongodb://localhost:27017/penbox',
//'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0-lhdgx.azure.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true 
})


conn.then( message => { console.log(`Database Connection Successful!!`)})
    .catch(err => { console.log('An error in connecting with the database', err)
})

