//var http_status = require("../Utils/http_status");
var path =  require('path');
var geoip = require("geoip-lite")
var schema = require("../Models/subscribers.model")







var index = (req, res) => {

    res.render("index")
}


//*T & C page
var terms_and_conditions =(req, res) =>{
    res.sendFile(path.resolve(__dirname, "../../Client/assets/terms-and-conditions.html"))
    
}


//SUBSCRIBE TO PRE-LAUNCH UPDATES
var subscribe =(req, res) =>{
    //search for IP Location
    var ip= req.header["x-forwarded-for"] || req.connection.remoteAddress;
    var geo = geoip.lookup(ip);
    if (geo == null){
      geo ={
          country:"",
          city:""
      }  
    }

    schema.create({
        email: req.body.email,
        ip_address: ip || "",
        country: geo.country || "",
        city: geo.city || ""

    })
    .then(ok =>{
        res.send({ message:" Subscriber added successfully", status:"success" })
        console.log("ok sucessfull", ok)
    },
    err=>{
        //User has subscribed before err
        res.send({ message:" Subscriber not added", status:"error" })

    })

//SEND EMAIL

    
}






  

//EXPORTS
module.exports = {
    index:index,
    terms_and_conditions: terms_and_conditions,
    subscribe:subscribe
};