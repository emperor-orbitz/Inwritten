

const users= {}

module.exports = function(server){
    var io = require("socket.io")(server);

    /*on connect
    REQUIRED ONCE
    */
    io.on("connection", function(socket){
        users[socket.handshake.query.userid] = socket;



        //print to console
         socket.on("print_on_console", function(data){
           //5e2667852f19fd204c41ef6b -USER A
          users['5e2be5f74fbc8e2450df004b'].emit('new_notification', "YOU HAVE NEW NOTIFICATIONS OGA")

        })
      

       //new like
         socket.on("new_like", function(data){
           users['5e2be5f74fbc8e2450df004b'].emit('new_notification', "YOU HAVE NEW NOTIFICATIONS OGA")

           console.log(socket.handshake.query.userid)
          })


          //new comment
          socket.on("new_comment", function(data){
            
           users['5e2be5f74fbc8e2450df004b'].emit('new_notification', "YOU HAVE NEW NOTIFICATIONS OGA")

           console.log(socket.handshake.query.userid)
          })

          //new follower
          socket.on("new_follower", function(data){
            //5e2667852f19fd204c41ef6b -USER A
           users['5e2be5f74fbc8e2450df004b'].emit('new_notification', "YOU HAVE NEW NOTIFICATIONS OGA")

           console.log(socket.handshake.query.userid)
          })


       })




       

         /*on disconnect
            REQUIRED ONCE
            */
    io.on("disconnection", function(socket){
        console.log("a user socket has been disconnected!")
    })

}