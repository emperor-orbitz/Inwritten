//OTHER BLOG POSTS FEATURED HERE


//random interests
function interests(category) {
    $.ajax({
        type: "GET",
        url: '/user/blog/follow/other_interests',
        headers: {
            'Accept': 'application/json',

        },
        data: { category },

        success: function (result) {
            var interests ="";
        
            result.message.forEach(element => {
                interests+= `<p>
                <a href='${element.post_link}'><h3>${element.title}</h3></a>
                <span>${element.description==''?'No description':element.description}</span>
                
                </p>`
            });
            
    
           $(".random-interests")[0].innerHTML = interests
               
            console.log(result.message)


        },


        error: function (err) {
            alert("error");
            console.log(err)
        }
    })


}

$(document).ready(function (ev) {
    //alert($("#interest-category").val())
    interests($("#interest-category").val())
})