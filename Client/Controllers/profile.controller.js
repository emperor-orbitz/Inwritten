

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::   /PROFILE CONTROLLER  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


export default class ProfileUpdate {



    update_password = function (updateDetails) {
        const get_options = {
            url: '/profile',
            options: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem("hs_token")
                         },
                body: JSON.stringify(updateDetails),
                credentials: 'include',
                withCredentials: true,
                //mode: 'cors'

            }
        }
        alert("swdsdsdsdsdsd");

        return new Promise((resolved, rejected) => {
            fetch(`${get_options.url}/update_password`,
                get_options.options)
                .then((res) => res.json())
                .then((updated) => {
                    if (updated.code == 200) {
                        console.log(updated);
                        resolved({ message:"Nice, you have successfully updated your account password", code:200 })
                    }
                    else if (updated.code == 500) {
                        console.log(updated);

                        rejected({ message:"Please correct your details to the acceptable format", code: 500 });
                    }
                    else {
                        console.log(updated);

                        rejected(updated);
                    }
                })


        })

    }





    updateProfile = (updateDetails) => {
        const get_options = {
            url: '/profile',
            options: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem("hs_token")       
                         },
                body: JSON.stringify(updateDetails),
                credentials: 'include',
                withCredentials: true,
                //mode: 'cors'

            }
        }

        return new Promise((resolved, rejected) => {
            fetch(`${get_options.url}/update_profile`,
                get_options.options)
                .then((res) => res.json())
                .then( updated => {
                    if (updated.code == 200) {

                        resolved({ message:"Nice, you have successfully updated your profile", code:200 })
                    }
                    else if (updated.code == 400||500 ) {

                        rejected({ message:"Please correct your details to the acceptable format", code: updated.code });
                    }
                    else {
                        //rejected(updated);
                    }
                })
                .catch( e =>{
                    rejected({message:"Something just happened. We'll fix it soon", code:500 })
                } )


        })






    }


    updateSocials = (updateDetails) => {
        const get_options = {
            url: '/profile',
            options: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem("hs_token")       
                         },
                body: JSON.stringify(updateDetails),
                credentials: 'include',
                withCredentials: true,
                //mode: 'cors'

            }
        }

        return new Promise((resolved, rejected) => {
            fetch(`${get_options.url}/update_social`,
                get_options.options)
                .then(res => res.json())
                .then( updated => {
                    if (updated.code == 200) {

                        resolved({ message:"Nice, you have successfully updated your profile", code:200 })
                    }
                    else if (updated.code == 400||500 ) {

                        rejected({ message:"Please correct your details to the acceptable format", code: updated.code });
                    }
                    else {
                        //rejected(updated);
                    }
                })
                .catch( e =>{
                    rejected({message:"Something just happened. We'll fix it soon", code:500 })
                } )


        })



    }





//fetch social links
    fetchSocials = () => {
        const get_options = {
            url: '/profile',
            options: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem("hs_token")       
                         },
                credentials: 'include',
                withCredentials: true,

            }
        }

        return new Promise((resolved, rejected) => {
            fetch(`${get_options.url}/fetch_social`,
                get_options.options)
                .then( res => res.json())
                .then( updated => {
                    if (updated.code == 200) {

                        resolved({ data:updated.data, code:200 })
                    }
                    else if (updated.code == 500 ) {

                        rejected({ message:"Server error", code: 500 });
                    }
                    else {
                        //rejected(updated);
                    }
                })
                .catch( e =>{
                    rejected({message:"Something just happened. We'll fix it soon", code:500 })
                } )


        })






    }



    //fetch stats counts
    fetchStats = () => {
        const get_options = {
            url: '/profile',
            options: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': localStorage.getItem("hs_token")       
                         },
                credentials: 'include',
                withCredentials: true,

            }
        }

        return new Promise((resolved, rejected) => {
            fetch(`${get_options.url}/fetch_stats`,
                get_options.options)
                .then( res => res.json())
                .then( updated => {
                    if (updated.code == 200) {

                        resolved({ data:updated, code:200 })
                        console.log("data is herer pooooo", updated)
                    }
                    else if (updated.code == 500 ) {

                        rejected({ message:"Server error", code: 500 });
                    }
                    else {
                        //rejected(updated);
                    }
                })
                .catch( e =>{
                    rejected({message:"Something just happened. We'll fix it soon", code:500 })
                } )


        })






    }
}