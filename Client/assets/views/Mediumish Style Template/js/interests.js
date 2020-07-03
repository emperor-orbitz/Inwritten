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

                $(".random-interests")[0].innerHTML = `<p class="ml-3" style="text-align:center">Read interesting stories like this <a href="/stories" target="__blank" >here </a></p>`

            }
        
        else{
            var interests ="";
            result.message.forEach(element => {

                
                let desc_format = element.description == '' ?"No featured description. Click to continue through the story.":element.description
                interests+= `
                <div class="col-md-4">

<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4" style="min-height:100px;background:url('${element.featured_image}'); background-position:center center;">

    </div>
    <div class="col-md-8 py-2 px-3">
      <div class="card-body">
      <h5 class="card-title"><a href="${element.post_link}" style="color:black">${element.title}</a></h5>
        <p class="card-text">${desc_format}</p>
        <p class="card-text">- <a href="/user/profile/${element.author}">${element.author}</a></span></p>
      </div>
    </div>
  </div>
</div>
			</div>`
            });
            
    
           $(".random-interests")[0].innerHTML = interests
               

        }
         


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



// <div class="card">
// 					<a href="${element.post_link}">
// 					<img class="img-fluid img-thumb"  src="${element.featured_image}" alt="${element.title}">
// 					</a>
// 					<div class="card-block">
// 						<h2 class="card-title"><a href="${element.post_link}">${element.title}</a></h2>
// 						<div class="metafooter">
// 							<div class="wrapfooter">
// 								<span class="meta-footer-thumb">
						
// 								</span>
// 								<span class="author-meta">
// 								<span class="post-name">By <a href="/user/profile/${element.author}">${element.author}</a></span><br/>
// 								<span class="post-date">${element.createdAt}</span><span class="dot"></span><span class="post-read"></span>
// 								</span>
// 								<span class="post-read-more"><a href="${element.post_link}" title="Read Story"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg></a></span>
// 							</div>
// 						</div>
// 					</div>
//                 </div>