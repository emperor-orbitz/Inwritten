
class FetchArticles {
constructor(){

}

/*
*
*           CONSTANTSs
*
*/
CONSTURL= 'http://localhost:5000/articles';
CONSTOPTIONS ={
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                //body:JSON.stringify(DATA),
                credentials: 'include',
                withCredentials: true,
                mode: 'cors'


}


/*
*
*           UPDATE ARTICLE
*
*/


 update_article (post) {

        var GET_OPTIONS = {
            URL:  this.CONSTURL +'/update',
            OPTIONS: this.CONSTOPTIONS
        }

    let SEND = Object.assign ({ } ,GET_OPTIONS.OPTIONS, {body: JSON.stringify(post)} );
console.log(SEND);
        return new Promise((resolve, reject) => {
            fetch(GET_OPTIONS.URL, SEND)
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



/*
*
*           FETCH ALL POSTS
*
*/

 fetch_articles_list() {
          var GET_OPTIONS = {
            URL:  this.CONSTURL +'/loadAllList',
            OPTIONS: this.CONSTOPTIONS
        }

        return new Promise((resolve, reject) => {
            fetch(GET_OPTIONS.URL, GET_OPTIONS.OPTIONS)
                .then((user) => user.json())
                .then((success) => {
                    if ((success.CODE === 102)  && (success.MESSAGE ==='UNABLE TO FETCH ARTICLES'  )) {
                        console.log('Success A is the success',success)
                        //alert( success.CODE);
                        reject(success);
                    }
                    else {
                        console.log('Success B is the success',success)

                        //alert(success.CODE)
                        resolve(success);
                    }
                })
        })

    }




/*
*
*           DELETE SELECTED POST
*
*/



    delete_article(id) {
        var CONSTOPTIONS =Object.assign(this.CONSTOPTIONS, { body:JSON.stringify({ id:id } ) })
        var GET_OPTIONS = {
            URL:  this.CONSTURL +'/delete',
            OPTIONS: this.CONSTOPTIONS
        }


        return new Promise((resolve, reject) => {
            fetch(GET_OPTIONS.URL, GET_OPTIONS.OPTIONS)
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

    var CONSTOPTIONS = Object.assign(this.CONSTOPTIONS, { body: JSON.stringify(data) } )
    console.log(CONSTOPTIONS);
        var GET_OPTIONS = {
            URL:  this.CONSTURL +'/create',
            OPTIONS: CONSTOPTIONS
            
        }


        return new Promise((resolve, reject) => {
            fetch(GET_OPTIONS.URL, GET_OPTIONS.OPTIONS)
                .then((user) => user.json())
                .then((result) => {
                    if (result.CODE == 104 ) {
                        reject(result);
                    }
                    else {
                        resolve(result);

                    }
                }).catch(function(err){
// NETWORK ERROR CANNOT FETCH
let result ={
CODE:104,
MESSAGE:'ERROR'
}
reject(result)

                })
        }) 

    }






}
export default FetchArticles;