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
        
            
            if(result.message== "Database is empty"){
                var interests ="";

                $(".random-interests")[0].innerHTML = `No other stories for now`
                $(".random-interests")[1].innerHTML = `No other stories for now`

            }
            else{       

                var interests ="";  
                result.message.forEach(element => {
                
                    interests+= `
                    <li>
                    <a href="">
                      <img src="images/img_1.jpg" alt="Image placeholder" class="mr-4">
                      <div class="text">
                        <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                        <div class="post-meta">
                          <span class="mr-2">March 15, 2018 </span>
                        </div>
                      </div>
                    </a>
                  </li>`
                }); 
                  $(".random-interests")[0].innerHTML = `<ul>${interests}</ul>`
        }
               
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