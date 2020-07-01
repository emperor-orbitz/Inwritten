

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


            $("#loggedininfo").html( `<img width="25px" src="/fonts/Favorites/icons8-settings-50.png"/>`)
            document.getElementById("commenter_id").defaultValue = result.data._id
        },


        error: function(err){
            $("#loggedininfo").html( `	<li><b><a href="/app/login">Get Started </a></b></li>
            <li><b><a href="/app/login">Log in </a></b></li>
`)

            document.getElementById('textarea').innerHTML = `<p>Sorry, you must <a href="/app/login">login</a> or <a href="/app/signup">signup</a> before you can comment..`;

        }
    })


} 


