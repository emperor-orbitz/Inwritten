
var model = require('../Models/notifications.model');
var notify = require("../Utils/notifications")
var io = require("socket.io")



/*
*         GET 
        New notifications
*/


var get = async (req, res) => {

model.find({ receiver: req.query.user_id })
.then( docs=>{

    docs.length !== 0 ? 
    res.send({ data:docs, message:"Data available", status:200 }): 
    res.send({ data:null, message:"No notifications for now", status:200 })
}) 
.catch(err =>{
    res.status(500)
        .send({message:"Something went wrong"})
})


}





/*           CREATE NEW NOTIFICATION
                  new notif
*/


var create = async (req, res) => {
    //req.io =io;
    var { sender, receiver, type, message } = req.body;
    console.log(req.body)
    try{

    var new_model = await model.create({
        sender,
        receiver,
        type,
        message,
    })
    if (new_model !== null) {
        res.send({ message: "Notification Sent succcessfull", status: 200 })
        //lauch notify
      
        req.app.locals.users_socket[receiver].emit('new_notification', "YOU HAVE NEW NOTIFICATIONS OGA")
           

    }
    else 
      res.status(500).send({ message: "Notification unsuccessful", status: 500 })

}
catch (err){
    //res.status(500).send({ message: "Notification unsuccessful", status: 500 })
     console.log(err, "erorrrr ooo")
}
}



/*          DELETE
    remve notification
*/



var remove = (req, res, next) => {
 



}




module.exports = {
    get: get,
    create: create,
    remove: remove,


};