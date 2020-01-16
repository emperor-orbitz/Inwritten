

//Check login status;
check_in()


 function check_in(){
    $.ajax({
        type: "POST",
        url: "/auth/isloggedin",
        headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem("hs_token")
        },
        
        success: function(result){
            
            result.data.bookmarks.includes($("#post_id").val()) == true ? 
            $("#bookmark_button").attr('disabled', "true").text("bookmarked") : 
            null;


            $("#loggedininfo").html( `<b> ${result.data.username} (${result.data.email})</b>`)
            document.getElementById("commenter_id").defaultValue = result.data._id
        },


        error: function(err){
            document.getElementById('textarea').innerHTML = "Sorry, you must be logged in before you can comment..";

        }
    })


} 



//SUBMIT COMMENTS
$("#formSubmit").submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function (data) {
            //alert(data)
            document.location.reload()
            console.log(data)
        }
    })

})

