

//Check login status;


var check_in = () =>{

    fetch('/auth/isloggedin',  { method:"POST",
    headers: {
        'Accept': 'application/json',
        'Authorization':localStorage.getItem("hs_token")
    }})
        .then(user =>{
            if(user.status == 401) return null
            else return user.json()
        })
        .then(result => {
            if(result == null){
                document.getElementById('textarea').innerHTML = "Sorry, you must be logged in before you can comment..";
            }
            
            else{
                document.getElementById("loggedininfo").innerHTML = ` you are logged in as <b> ${ result.data.username } (${result.data.email})</b>`
                document.getElementById('commenter_id').value = result.data._id;


            };

        })
        .catch(err => {
            console.log(err + "TWSA")
        })
}





//loggedin user info
check_in()



//SUBMIT COMMENTS
$("#formSubmit").submit( function(e){
    e.preventDefault();
    var form = $(this);
    var url= form.attr('action');
    $.ajax({
        type:"POST",
        url:url,
        data:form.serialize(),
        success:function(data){
            //alert(data)
            document.location.reload()
            console.log(data)
        }
    })


})

//console.log(qs);
