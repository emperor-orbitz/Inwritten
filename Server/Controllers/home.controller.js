//var http_status = require("../Utils/http_status");
var path =  require('path');








var index = (req, res) => {

    res.render("index")
}


//*T & C page
var terms_and_conditions =(req, res) =>{
    res.sendFile(path.resolve(__dirname, "../../Client/assets/terms-and-conditions.html"))
    
}







  

//EXPORTS
module.exports = {
    index:index,
    terms_and_conditions: terms_and_conditions
};