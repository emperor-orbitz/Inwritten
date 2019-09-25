var mongoose = require('mongoose');


var conn = mongoose.connect('mongodb://localhost:27017/penbox', { useNewUrlParser: true, useCreateIndex:true });
conn.then((message) => {
 
  console.log(`successful database connection!!`);

}).catch((err) => {

  console.log('An error in connecting with the database', err);
})

