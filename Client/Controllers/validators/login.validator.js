
//DEPRECATED LOGIN VALIDATION
export default class Validator {
    constructor(params) {
        this.email = params.email;
        this.password = params.password;


    }


    DisplayError = [];


    //the this in the outer view is not the same as that inside;;

    emailPromise = () => {
        var email, password, DisplayError, validatePassword;
        //no username
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

            if (((email.length == 0) && (password.length == 0))) {
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
                //TERRIBLE WORST CASE
            }



        })
    }


    validatePassword = (password = this.password) =>  password.length < 6 ? false :true





}
