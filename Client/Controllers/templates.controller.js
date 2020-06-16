
class Templates {

    constructor(){}


/*               CONSTANTS
*/


const_url= '/template';
const_options ={
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                Authorization: localStorage.getItem("hs_token")
            },
                credentials: 'include',
                withCredentials: true,
            

}




/*
*   GET Templates
*
*/


 get_templates (current_template) {
        this.const_options.method = "GET";
        var get_options = {
            url:  this.const_url +'/get/'+ current_template,
            options: this.const_options
        }

    //let send = Object.assign({ } ,get_options.options, {body: JSON.stringify({id:comment_id})} );

    return new Promise((resolve, reject) => {
            fetch(get_options.url, get_options.options)
                .then(user => user.json())
                .then((result) => {

                    if (result.status == 200) {
                        resolve(result);
                    }
                    else {
                        reject(result)
                     }

                })
                .catch(err => { 
                    reject(err) 
                })
        })

    }


    
    my_template = (mytemplate_id) =>{

        this.const_options.method = "GET";
        var get_options = {
            url:  this.const_url +'/my_template/'+ mytemplate_id,
            options: this.const_options
        }

        return new Promise((resolve, reject) => {
            fetch(get_options.url, get_options.options)
                .then(user => user.json())
                .then((result) => {

                    if (result.status == 200) {
                        resolve(result);
                        console.log(result)
                    }
                    else {
                        console.log("errororr", result)
                        reject(result)
                     }

                })
                .catch(err => { 
                    reject(err) 
                })
        })



    }



 
    save_template (template_id) {
        this.const_options.method = "PATCH";
        var get_options = {
            url:  this.const_url +'/add/'+ template_id,
            options: this.const_options
        }

    //let send = Object.assign({ } ,get_options.options, {body: JSON.stringify({id:comment_id})} );

    return new Promise((resolve, reject) => {
            fetch(get_options.url, get_options.options)
                .then(user => user.json())
                .then((result) => {

                    if (result.status == 200) {
                        resolve(result);
                    }
                    else {
                        reject(result)
                     }

                })
                .catch(err => { 
                    reject(err) 
                })
        })

    }





}
export default Templates;