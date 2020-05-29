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
           interests=  "<div class='comment'><p style='color:black'>No comments</p></div>"
           $(".comment-space")[0].innerHTML = interests

        }
        else{
            result.data.forEach(element => {
                interests+= `<div class='comment' style='color:black'><a class='avatar'>
                  <img src= '${element.commenter_id.display_picture}' style='float:left; width:30px; height:30px; border-radius: 30px; margin-right:10px;'></a>
                 <div class='content'><a class='author'><b>${element.commenter_id.username.toLowerCase()}</b> </a>
                <div class='metadata'><span class='date' style="font-size:10px"> ${element.createdAt}
                </span></div>
                <div class='text'> ${element.comment}
                  </div>
                <div class='actions' style="font-size:12px">
                <a href="">LIKE</a>
            </div></div></div><br>`
  
                 
              });
        }
   
    
           $(".comment-space")[0].innerHTML = interests
              


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
