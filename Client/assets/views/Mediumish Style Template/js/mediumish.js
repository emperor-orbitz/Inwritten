$(function(){
  var topOfOthDiv = $(".hideshare").offset().top;
  $(window).scroll(function() {
      if($(window).scrollTop() > topOfOthDiv) { //scrolled past the other div?
          $(".share").hide(); //reached the desired point -- show div
      }
      else{
        $(".share").show();
      }
  });
});

$("#close-alertbar").on("click", function(event){

  console.log($("#alertbar"))
  $("#alertbar")[0].style.display = "none"
})