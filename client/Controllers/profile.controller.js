

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::   /FETCH USER DETAILS  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


export default class ProfileUpdate {



    update_password = function (updateDetails) {
        const GET_OPTIONS = {
            URL: 'http://localhost:5000',
            OPTIONS: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateDetails),
                credentials: 'include',
                withCredentials: true,
                mode: 'cors'

            }
        }
        alert("swdsdsdsdsdsd");
        return new Promise((resolved, rejected) => {
            fetch(`${GET_OPTIONS.URL}/update_password`,
                GET_OPTIONS.OPTIONS)
                .then((res) => res.json())
                .then((updated) => {
                    if (updated.status == 'SUCCESS') {
                        console.log(updated);
                        resolved(updated.status)
                    }
                    else if (updated.status == "false") {
                        console.log(updated);

                        rejected(updated);
                    }
                    else {
                        console.log(updated);

                        rejected(updated);
                    }
                })


        })





    }




    updateProfile = (updateDetails) => {
        const GET_OPTIONS = {
            URL: 'http://localhost:5000',
            OPTIONS: {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateDetails),
                credentials: 'include',
                withCredentials: true,
                mode: 'cors'

            }
        }


        return new Promise((resolved, rejected) => {
            fetch(`${GET_OPTIONS.URL}/update_profile`,
                GET_OPTIONS.OPTIONS)
                .then((res) => res.json())
                .then((updated) => {
                    if (updated.status == 'success') {
                        resolved(updated)
                    }
                    else if (updated.status == "false") {

                        rejected(updated);
                    }
                    else {
                        rejected(updated);
                    }
                })


        })






    }













}