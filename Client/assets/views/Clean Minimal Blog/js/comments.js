//OTHER BLOG POSTS FEATURED HERE


$(document).ready(function (ev) {
   $("#load_comments").on("click", function(ev){
    comments( $(".comment-space")[0].id )
   })
    //comments( $(".comment-space")[0].id )
})




//LOAD COMMENTS
function comments(post_id) {
    $.ajax({
        type: "GET",
        url: '/comment/list',
        headers: {
            'Accept': 'application/json',

        },
        data: { id:post_id },

        success: function (result) {
            var interests ="";
        if(result.data.length ==0){
           interests=  "<div class='comment'><h5>No comments</h5></div>"
           $(".comment-space")[0].innerHTML = interests

        }
        else{
            result.data.forEach(element => {
                interests+= `<div class='comment'><a class='avatar'>
                  <img src='${element.commenter_id.display_picture}' style="border-radius:20px; width:30px;height:30px" /></a>
                 <div class='content'><a class='author' >
                 ${element.commenter_id.username} </a>
                <div class='metadata'><span class='date'> ${element.createdAt}
                </span></div>
                <div class='text'> ${element.comment}
                  </div>
                <div class='actions'>
                <a class='like'>LIKE</a>
            </div></div></div>`
  
                 
              });
              $(".comment-space")[0].innerHTML = `${interests}<br>`

        }
   
            
    
              
           // console.log(result.data)


        },


        error: function (err) {
            alert("error");
            console.log(err)
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
     // get comment again
     comments( $(".comment-space")[0].id )

        $(`#${e.target.id}`)[0].reset()
        }
    })

})
