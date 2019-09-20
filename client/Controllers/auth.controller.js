

/*
*
*          CLASS FOR API CONNECTION
*
*/


class Connection{
    
/*
*
*           LOGIN  API
*
*/

LOGIN = function (DATA){


 var GET_OPTIONS={
        URL:'http://localhost:5000/login',
         OPTIONS:{
        method:'POST',
         headers:{
             'Content-Type':'application/json',
             'Accept':'application/json'
        },
         body:JSON.stringify(DATA),
         credentials:'include',
         withCredentials: true,
         mode:'cors'
         
//withCredentials:true        

     
         }
       }
return new Promise((resolve, reject)=>{
 fetch(GET_OPTIONS.URL, GET_OPTIONS.OPTIONS)
 .then((user)=> user.json())
 .then((success)=>{
     if(success.ID == null){
         console.log(success.message);
         reject(success);
     }
     else{
         resolve(success);  
     }
 })
})

}






/*
*
*           ISLOGGEDIN? API
*
*/

isLoggedin = function (){


    var GET_OPTIONS={
        URL:'http://localhost:5000/isloggedin',
         OPTIONS:{
        method:'POST',
         headers:{'Content-Type':'application/json'},
         //body:JSON.stringify(DATA),
         credentials:'include',
         withCredentials: true,
         mode:'cors'
     
         }
       }
return new Promise((resolve, reject)=>{
 fetch(GET_OPTIONS.URL, GET_OPTIONS.OPTIONS)
 .then((user)=> user.json())
 .then((success)=>{
     if(success.isAuth === false){
         reject(success);
     }
     else{
         resolve(success);  
     }
 })
 .catch(()=>{
console.log('SERVER IS NOT AVAILABLE')
reject('SERVER DOWN');
 })
})

}








/*
*
*           LOGOUT API
*
*/


logout= function(){

  
    var GET_OPTIONS = {
        URL:'http://localhost:5000/logout',
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






