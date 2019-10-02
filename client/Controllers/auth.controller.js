

//CLASS FOR API CONNECTION


class Connection{
    
//  LOGIN  API


login = function (data){


 var GET_OPTIONS={
        URL:'http://localhost:5000/auth/login',
         OPTIONS:{
        method:'POST',
         headers:{
             'Content-Type':'application/json',
             'Accept':'application/json'
        },
         body:JSON.stringify(data),
         credentials:'include',
         withCredentials: true,
         mode:'cors'
         }
       }
       

return new Promise((resolve, reject)=>{
 fetch(GET_OPTIONS.URL, GET_OPTIONS.OPTIONS)
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

    var GET_OPTIONS={
        URL:'http://localhost:5000/auth/isloggedin',
        OPTIONS:{
        method:'POST',
         headers:{'Content-Type':'application/json',
                  'Accept':'application/json',
                  'Authorization': a_token  
                 },
         credentials:'include',
         withCredentials: true,
         mode:'cors'
     
         }
       }

return new Promise((resolve, reject)=>{

 fetch(GET_OPTIONS.URL, GET_OPTIONS.OPTIONS)
      .then(user =>user.json())
      .then((server)=>{

    if(server.status == 401){

        reject("Sorry, you are not logged in");
        
    }
    else 
        resolve(server.data)  
    
 })
     .catch((err)=>{

    reject('Oops, Something just happened. I\'ll fix soon'+err);

 })
})

}








/*           LOGOUT API
*/


logout= function(auth_token){

    var a_token = auth_token || localStorage.getItem("hs_token");
  
    var GET_OPTIONS = {
        URL:'http://localhost:5000/auth/logout',
        OPTIONS:{
        method:'POST',
        headers:{'Content-Type':'application/json',
        'Authorization':a_token
       },
        withCredentials:true,
        mode:'cors',
        credentials:'include'
     
         }
       }
return new Promise((resolve, reject)=>{
 fetch(GET_OPTIONS.URL, GET_OPTIONS.OPTIONS)
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






