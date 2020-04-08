


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
        if(result.data.length == 0){
           interests= "<div class='comment'><p style='color:black;'>No comments</p></div>"
           $(".comment-space")[0].innerHTML = interests

        }
        else{
            console.log(result)
            result.data.forEach(element => {
                interests+= `<li class="comment">
                <div class="vcard">
                  <img src="${element.commenter_id.display_picture}" alt="Image placeholder">
                </div>
                <div class="comment-body">
                  <h3>${element.commenter_id.username}</h3>
                  <div class="meta">${element.createdAt}</div>
                  <p style='color:black'>${element.comment}</p>
                </div>
                </li>`
              });
              //<p><a href="#" class="reply rounded">Reply</a></p>

              
           $(".comment-space")[0].innerHTML = `<ul class="comment-list">${interests}</ul>`
        }
   
    
              


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
     $(`#${e.target.id}`)[0].reset()
     comments( $(".comment-space")[0].id )

        }
    })

})
