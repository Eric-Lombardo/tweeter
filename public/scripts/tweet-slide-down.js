// handle animation of clicking navbar write new tweet
$(document).ready(function() {
  $(".fa-angle-double-down").on("click", function() {

    // when its hidden aniamte slide down
    if ($(".new-tweet").hasClass("hide")) {
      $(".new-tweet").slideDown("slow", function() {
        $(".new-tweet").toggleClass("hide");
        $("#newTweetText").focus();
      });
    } else if (!$(".new-tweet").hasClass("hide")) {
      // when its showing slide it up
      $(".new-tweet").slideUp("slow", function() {
        $(".new-tweet").toggleClass("hide");
      });
    }
  });
});
