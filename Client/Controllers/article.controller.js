
class FetchArticles {

    constructor(){}


/*               CONSTANTS
*/


const_url= '/articles';
const_options ={
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem("hs_token")  
                         },
                //body:JSON.stringify(DATA),
                credentials: 'include',
                withCredentials: true,
               // mode: 'cors'


}




/*
*           UPDATE ARTICLE
*/

 update_article (post) {

        var get_options = {
            url:  this.const_url +'/update',
            options: this.const_options
        }

    let send = Object.assign({ } ,get_options.OPTIONS, {body: JSON.stringify(post)} );

    return new Promise((resolve, reject) => {
            fetch(get_options.url, send)
                .then((user) => user.json())
                .then((result) => {
                    if (result.MESSAGE === "OK") {
                        resolve(result);
                    }
                    else {
                        reject("An error!")
                     }

                })
                .catch((err) => { reject(err) });
        })

    }



/*          FETCH ALL POSTS
*/

 fetch_articles_list() {

          var get_options = {
            url:  this.const_url +'/loadAllList',
            options: Object.assign( {}, this.const_options, { method:'GET' }),
            
        }

        return new Promise((resolve, reject) => {
            fetch(get_options.url, get_options.options)
                .then((user) => user.json())
                .then((success) => {
                    if (success.data.length != 0){

                        resolve(success.data)
                    }
                    else {
                        resolve(success.data);
                    }
                })
                .catch( e=> reject(e))
        })

    }




/*
*           DELETE SELECTED POST
*/

    delete_article(id) {
        var const_options = Object.assign(this.const_options, { body:JSON.stringify({ id:id } ) })
        var get_options = {
            url:  this.const_url +'/delete',
            options: this.const_options
        }


        return new Promise((resolve, reject) => {

            fetch(get_options.url, get_options.options)
                .then((user) => user.json())
                .then((result) => {
                    if ( result.CODE == 104 ) {
                        reject(result);
                    }
                    else {
                        resolve(result);
                    }
                })
        })

    }
    


  create_article(data) {

    var const_options = Object.assign(this.const_options, { body: JSON.stringify(data) } )
    var get_options = {
            url:  this.const_url +'/create',
            options: const_options     
    }

        return new Promise((resolve, reject) => {
            fetch(get_options.url, get_options.options)
                .then( user => user.json())
                .then( result => { resolve(result) })
                .catch( _ => {
                   
                    reject(result)

                })
        }) 

    }






}
export default FetchArticles;