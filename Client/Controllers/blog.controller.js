
class FetchBlog {

    constructor(){}


/*               CONSTANTS
*/


const_url= '/blog';
const_options ={
                method: '',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem("hs_token")  
                         },
                credentials: 'include',
                withCredentials: true,


}




/*
*           SHOW ALL NOTIFICATIONS
*/

 get_five_stories () {
        this.const_options.method = "POST";
        var get_options = {
            url:  `${this.const_url}/fivestories`,
            options: this.const_options,
            
        }

    let send = get_options.options;

    return new Promise((resolve, reject) => {
            fetch(get_options.url, send)
                .then( user => user.json())
                .then( result => {
                    if (result.status == 200) {
                        resolve(result);
                    }
                    else {
                        reject(result)
                     }

                }).catch(err => { 
                    reject(err)
                 })
        })

    }




/*
*           DELETE NOTIFICATION
*/

delete_notification (notification_id) {
    this.const_options.method = "DELETE";
    var get_options = {
        url:  `${this.const_url}/delete`,
        options: this.const_options
    }

let send = Object.assign({ }, get_options.options, { body: JSON.stringify({ _id:notification_id }) } );

return new Promise((resolve, reject) => {
        fetch(get_options.url, send)
            .then( user => user.json())
            .then( result => {
                if (result.status == 200) {
                    resolve(result);
                    console.log(result +"SUCCESS")

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




trending () {
    this.const_options.method = "POST";
    var get_options = {
        url:  `${this.const_url}/trending`,
        options: this.const_options,
        
    }

let send = get_options.options;

return new Promise((resolve, reject) => {
        fetch(get_options.url, send)
            .then( user => user.json())
            .then( result => {
                if (result.status == 200) {
                    resolve(result);
                }
                else {
                    reject(result)
                 }

            }).catch(err => { 
                reject(err)
             })
    })

}





}
export default FetchBlog;