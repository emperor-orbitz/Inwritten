var mongoose = require('mongoose');


var conn = mongoose.connect('mongodb+srv://malik:malik12345@cluster0-lhdgx.azure.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true 
})


conn.then( message => { console.log(`successful database connection!!`)})
    .catch(err => { console.log('An error in connecting with the database', err)
})

