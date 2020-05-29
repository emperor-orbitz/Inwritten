

//follow AJAX
function follow(followee){
    $.ajax({
        type: "POST",
        url: "/user/blog/follow/follow_user",
        headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem("hs_token")
        },
        data: {followee:followee},
        
        success: function(result){
            //change button text to "followed"
            console.log(result)
            document.getElementById("follow-btn").innerText ="unfollow";
            
        },


        error: function(err){
           console.log(err)
        }
    })


} 


//follow status
function follow_status(followee){
    $.ajax({
        type: "GET",
        url: `/user/blog/follow/follow_status`,
        headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.getItem("hs_token")
        },
        data: { followee: followee },
        
        success: function(result){
            if(result.message == "Not following"){
                $("#follow-btn")[0].innerText ="follow"
            }
            else if(result.message != "Not allowed"){
                $("#follow-btn")[0].hidden = false 

            }
            else{
                $("#follow-btn")[0].innerText ="Unfollow"

            }

            
        },

        error: function(err){
      console.log(err)
        }
    })


}


$(document).ready(function(ev){

    follow_status($('#follow-btn').val())
})


$('#follow-btn').on("click", function(event){
    console.log(event.target.value)
    follow(event.target.value)
})
