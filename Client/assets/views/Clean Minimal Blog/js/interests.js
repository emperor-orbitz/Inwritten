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
            if (result.message == "Database is empty") {
                var interests = "";

                $(".random-interests")[0].innerHTML = `<p class="ml-3" style="text-align:center">Read interesting stories like this <a href="/stories" target="__blank" >here </a></p>`

            }

            else {
                var interests = "";
                result.message.forEach(element => {


                    let desc_format = element.description == '' ? "No featured description. Click to continue through the story." : element.description
                    interests += `
                        <div class="col-md-4">

                <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                <div class="col-md-4" style="min-height:100px;background:url('${element.featured_image}'); background-position:center center;">

                </div>
                <div class="col-md-8 py-2 px-3">
                <div class="card-body">
                <h5 class="card-title"><a href="${element.post_link}" style="color:black">${element.title}</a></h5>
                <p class="card-text" style="font-size:15px !important">${desc_format}</p>
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


