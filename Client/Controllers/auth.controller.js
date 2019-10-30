

//CLASS FOR API CONNECTION


class Connection{
    

login = function (data){

var a_token = localStorage.getItem("hs_token");

 var get_options={
        url:'/auth/login',
         options:{
        method:'POST',
         headers:{
             'Content-Type':'application/json',
             'Accept':'application/json',
             'Authorization': a_token
        },
         body:JSON.stringify(data),
         credentials:'include',
         withCredentials: true,
         //mode:'cors'
         }
       }
       

return new Promise((resolve, reject)=>{
 fetch(get_options.url, get_options.options)
 .then( _ => _.json())
 .then((success)=>{
     if(success.user == null){

         reject(success);
     }
     else{

        localStorage.setItem("hs_token", success.token)
         resolve(success.user);  
     }
 })
})

}







/*         ISLOGGEDIN? API
*/

isLoggedin = function (auth_token){

    var a_token = auth_token || localStorage.getItem("hs_token");

    var get_options={
        url:'/auth/isloggedin',
        options:{
        method:'POST',
         headers:{'Content-Type':'application/json',
                  'Accept':'application/json',
                  'Authorization': a_token  
                 },
         credentials:'include',
         withCredentials: true,
         //mode:'cors'
     
         }
       }

return new Promise((resolve, reject)=>{

 fetch(get_options.url, get_options.options)
      .then(user =>user.json())
      .then( server =>{

        if( Object.keys(server.data).length == 0 ){

        reject("Sorry, you are not logged in");
        
    }
    else 
        resolve(server.data) ; 
    
 })
     .catch( _ =>{
         
     reject("Oops, You are not logged in");

 })
})

}








/*           LOGOUT API
*/


logout= function(auth_token){

    var a_token = auth_token || localStorage.getItem("hs_token");
  
    var get_options = {
        url:'/auth/logout',
        options:{
        method:'POST',
        headers:{'Content-Type':'application/json',
        'Authorization':a_token
       },
        withCredentials:true,
        //mode:'cors',
        credentials:'include'
     
         }
       }
return new Promise((resolve, reject)=>{
 fetch(get_options.url, get_options.options)
 .then((user)=> user.json())
 .then((success)=>{
     if(success.status == 'LOGOUT'){
         resolve(success.status);
     }
     else{
         reject(success);  
     }
 })
}) 
}






}



export default Connection;






