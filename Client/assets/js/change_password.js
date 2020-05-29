$("#passwordResetForm").submit(function (e) {

    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
        type: "POST",
        url: "/auth/change_password_page_submit",
        data: form.serialize(),
        success: function (data) {
     // get comment again
     if(data.type == "error"){
        document.getElementById("error-box").innerHTML =`<span style='color:red'>${data.message}</span>`
     }
     else{
        document.getElementById("passwordResetForm").innerHTML =`<span style='color:green'>Password Reset successful! Sign in with your new password</span><br>
        <a href="/login"><button class="btn btn-sm btn-link">LOGIN</a>`

        $(`#${e.target.id}`)[0].reset()

     }

        },
        error: function(err){
            alert("something went wrong"+err)
        }
    })

})
$("#passwordResetForm").on("change", function (e) {
    document.getElementById("error-box").innerHTML =` `

})