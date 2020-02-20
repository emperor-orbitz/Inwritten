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
                
                interests+= `
                <div class="card">
                <img src="${element.featured_image}" class="card-img-top" alt="${element.title}">
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.description==''?'No description':element.description}</p>
                <p class="card-text"><small class="text-muted">${element.updatedAt}</small></p>
                </div>
                </div>`
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