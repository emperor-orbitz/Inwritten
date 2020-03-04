

//Check login status;

const headers = {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem("hs_token")
}

var bookmark = () => {

    // /user/bookmark/:user_id/:blog_id'

    var bid = $("#post_id").val()
    return $.ajax({ type: "POST", url: "/auth/isloggedin", headers: headers })
        .then(res => $.ajax({ type: "POST", url: `/user/bookmark/${res.data._id}/${bid}`, headers: headers }))
        .then(final => final)
        .catch(err => console.log("there was an error"))


}

$("#bookmark_button").on("click", function (event) {
    event.preventDefault()
    bookmark().then(_ => $(this).attr('disabled', "true").text("Added to bookmarks"))
        .catch(err => alert("Currently unable to add to bookmarks"))

})

//bookmark()

var cid = $("input#commenter_id").attr("value")
var pid = $("#post_id").val()

