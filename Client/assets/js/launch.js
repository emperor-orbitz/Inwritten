

$(document).ready(function(ev){
var arr =["thoughts", "ideas" , "creativity", "perspectives"];
let i =0;

setInterval(()=>{
//change words
if(i == arr.length){
    i =0
    $("#change_of_words")[0].innerHTML = arr[i]
    i++

}
else{
    $("#change_of_words")[0].innerHTML = arr[i]
    i++
}
}, 2000)

})


setTimeout(()=>{
    $('#myModal').modal("show")
},5000) 


$("#subscribeForm").submit(function (e) {

    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
        type: "POST",
        url: "/subscribeToPreLaunch",
        data: form.serialize(),
        success: function (data) {
     // get comment again
     if(data.status == "error"){

        document.getElementById("error-box").innerHTML =`<span style='color:red'>Email has already subscribed</span>`
     }
     else{
        document.getElementById("subscribeForm").innerHTML =`<span ><i>A very big thanks to you for subscribing. We hope to see you around soon.</i></span><br>`

        $(`#${e.target.id}`)[0].reset()

     }

        },
        error: function(err){
            console.log("something went wrong", err)
        }
    })

})