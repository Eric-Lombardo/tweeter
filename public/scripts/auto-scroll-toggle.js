$(document).ready(function() {
  $("#auto-scroll").hide();

  // fading in/out depending on window scroll value
  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $(".navbar-right-group").fadeOut();
      $("#auto-scroll").fadeIn();
    } else {
      $(".navbar-right-group").fadeIn();
      $("#auto-scroll").fadeOut();
    }
  });

  // click features for #auto-scroll button
  $("#auto-scroll").on("click", function() {
    $(window).scrollTop(0);
    $(".new-tweet").slideDown("slow");
    $("#newTweetText").focus();
  });
});