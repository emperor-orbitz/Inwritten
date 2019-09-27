

/*
*          CLASS FOR API CONNECTION
*/


class Connection{
    
/*
         LOGIN  API
*/

LOGIN = function (data){


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

    var GET_OPTIONS={
        URL:'http://localhost:5000/auth/isloggedin',
         OPTIONS:{
        method:'POST',
         headers:{'Content-Type':'application/json',
         'Authorization': auth_token  
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
    // console.log(server +"status of server")
    if(server.status == 401){
        reject("Sorry, you are not logged in");
        
    }
    else resolve(server)  
    
 })
 .catch((err)=>{

  reject('Oops, Something just happened. I\'ll fix soon');

 })
})

}








/*           LOGOUT API
*/


logout= function(){

  
    var GET_OPTIONS = {
        URL:'http://localhost:5000/auth/logout',
         OPTIONS:{
         method:'POST',
         headers:{'Content-Type':'application/json'},
         //body:JSON.stringify(DATA),
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






