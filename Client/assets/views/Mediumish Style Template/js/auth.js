

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


            $("#loggedininfo").html( `<b><i class="fa fa-cogs"></i> Edit this story</b>`)
            document.getElementById("commenter_id").defaultValue = result.data._id
        },


        error: function(err){

            document.getElementById('textarea').innerHTML = `<p>Sorry, you must <a href="/app/login">login</a> or <a href="/app/signup">signup</a> before you can comment..`;

        }
    })


} 


