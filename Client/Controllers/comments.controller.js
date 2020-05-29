
class Comments {

    constructor(){}


/*               CONSTANTS
*/


const_url= '/comment';
const_options ={
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem("hs_token")  
                         },
                credentials: 'include',
                withCredentials: true,


}




/*
*           Delete Comment
*/

 delete_comment (comment_id) {
        this.const_options.method = "DELETE";
        var get_options = {
            url:  this.const_url +'/delete',
            options: this.const_options
        }

    let send = Object.assign({ } ,get_options.options, {body: JSON.stringify({id:comment_id})} );

    return new Promise((resolve, reject) => {
            fetch(get_options.url, send)
                .then((user) => user.json())
                .then((result) => {
                    if (result.status == 200) {
                        resolve(result);
                    }
                    else {
                        //console.log(result +"UNCATWSA")
                        reject(result)
                     }

                })
                .catch(err => { 
                   //console.log(err +"UNCATWSA")
                    reject(err) 
                })
        })

    }


    like_comment (comment_id) {
        this.const_options.method = "PATCH";
        var get_options = {
            url:  this.const_url +'/like',
            options: this.const_options
        }

    let send = Object.assign({ } ,get_options.options, {body: JSON.stringify({id:comment_id})} );

    return new Promise((resolve, reject) => {
            fetch(get_options.url, send)
                .then((user) => user.json())
                .then((result) => {
                    if (result.status == 200) {
                        resolve(result);
                    }
                    else {
                        console.log(result +"UNCATWSA")
                        reject(result)
                     }

                })
                .catch(err => { 
                    console.log(err +"UNCATWSA")
                    reject(err) 
                })
        })

    }







}
export default Comments;