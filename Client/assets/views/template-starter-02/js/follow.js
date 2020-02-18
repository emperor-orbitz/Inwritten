

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
            console.log(result)

            
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

            console.log(result.message)

            
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
