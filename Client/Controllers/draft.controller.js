
class FetchDrafts {

    constructor() { }


    /*               CONSTANTS
    */


    const_url = '/drafts';
    const_options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

    update_draft(post) {
        this.const_options.method = "PATCH";
        var get_options = {
            url: this.const_url + '/update',
            options: this.const_options
        }

        let send = Object.assign({}, get_options.options, { body: JSON.stringify(post) });

        return new Promise((resolve, reject) => {
            fetch(get_options.url, send)
                .then((user) => user.json())
                .then((result) => {
                    if (result.status == 200) {
                        resolve(result);
                    }
                    else {
                        console.log(result + "UNCATWSA")
                        reject(result)
                    }

                })
                .catch(err => {
                    console.log(err + "UNCATWSA")
                    reject(err)
                });
        })

    }



    //DELETE ALL POSTS
    delete_all(post) {
        this.const_options.method = "DELETE";
        var get_options = {
            url: this.const_url + '/delete_all',
            options: this.const_options
        }

        let send = Object.assign({}, get_options.options, { body: JSON.stringify(post) });

        return new Promise((resolve, reject) => {
            fetch(get_options.url, send)
                .then( user => user.json())
                .then( result => {
                    if (result.status == 200) {
                        resolve(result);
                    }
                    else {
                        console.log(result + "UNCATWSA")
                        reject(result)
                    }

                })
                .catch(err => {
                    console.log(err + "UNCATWSA")
                    reject(err)
                });
        })

    }




    /*          FETCH ALL POSTS
    */

    fetch_articles_list() {

        var get_options = {
            url: this.const_url + '/loadAllList',
            options: Object.assign({}, this.const_options, { method: 'GET' }),

        }

        return new Promise((resolve, reject) => {
            fetch(get_options.url, get_options.options)
                .then((user) => user.json())
                .then((success) => {
                    if (success.data.length != 0) {

                        resolve(success.data)
                    }
                    else {
                        resolve(success.data);
                    }
                })
                .catch(e => reject(e))
        })

    }




    /*
    *           DELETE SELECTED POST
    */

    delete_draft(id) {

        this.const_options.method = "DELETE";
        var get_options = {
            url: this.const_url + '/delete',
            options: this.const_options
        }
        var send = Object.assign({}, get_options.options, { body: JSON.stringify({ id: id }) })


        return new Promise((resolve, reject) => {

            fetch(get_options.url, send)
                .then((user) => user.json())
                .then((result) => {
                    if (result.status == 200 && result.data.deletedCount == 1) {
                        resolve(result);
                    }
                    else {
                        reject(result);
                    }
                })
                .catch(err => { reject(err) })
        })

    }



    create_draft(data) {

        var const_options = Object.assign(this.const_options, { body: JSON.stringify(data) })
        var get_options = {
            url: this.const_url + '/create',
            options: const_options
        }

        return new Promise((resolve, reject) => {
            fetch(get_options.url, get_options.options)
                .then(user => user.json())
                .then(result => { resolve(result.data) })
                .catch(_ => {

                    reject(_)

                })
        })

    }




  



    fetch_image(id) {

        this.const_options.method = "GET";


        var get_options = {
            url: this.const_url + '/fetchimage?id=' + id,
            options: this.const_options
        }

        return new Promise((resolve, reject) => {
            fetch(get_options.url, get_options.options)
                .then(user => user.json())
                .then(result => { resolve(result.data) })
                .catch(_ => {

                    reject(_)

                })
        })

    }



}
export default FetchDrafts;