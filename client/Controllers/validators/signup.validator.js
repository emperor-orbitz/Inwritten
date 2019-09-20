

export default class Validator {
    constructor(params) {
        this.username = params.username;
        this.email = params.email;
        this.password = params.password;


    }


    DisplayError = [];


    //the this in the outer view is not the same as that inside;;

    emailPromise = () => {
        var username, email, password, DisplayError, validatePassword;
        username = this.username;
        email = this.email
        password = this.password;
        DisplayError = this.DisplayError;
        validatePassword = this.validatePassword;

        return new Promise(function (resolve, reject) {

            var mapArr = [
                ['passwordError', 'Passwords shouldnt be less than 6 characters'],
                ['emailError', 'Please, Correct your email'],
                ['empty', 'Please, try filling all fields']
            ];

            var mapErrs = new Map(mapArr);

            var email_test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (username.length == 0) {
                DisplayError.push({ 'message': mapErrs.get('empty') });
                reject(DisplayError);
            }
            else if (((email.length == 0) && (password.length == 0))) {
                //sorry both fields are required
                DisplayError.push({ 'message': mapErrs.get('empty') });
                reject(DisplayError);

            }

            else if ((email_test.test(email) == false) && (validatePassword() == false)) {
                ////the password has issues
                DisplayError.push(
                    { 'message': mapErrs.get('emailError') },
                    { 'message': mapErrs.get('passwordError') }
                );

                reject(DisplayError);
            }


            else if ((email_test.test(email) == false) && (validatePassword() == true)) {
                DisplayError.push({ 'message': mapErrs.get('emailError') });

                reject(DisplayError);

            }


            else if ((email_test.test(email) == true) && (validatePassword() == false)) {
                DisplayError.push({ 'message': mapErrs.get('passwordError') });

                reject(DisplayError);

            }

            else {
                resolve([{ "sdsdsdsdsds": "jsndsds" }]);
            }



        })
    }


    validatePassword = (password = this.password) => {

        if ((password.length < 6)) {
            return false;
        }

        else {
            return true;
        }
    }




}
