$(document).ready(function() {
  
  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $(".navbar-right-group").fadeOut();
    } else {
      $(".navbar-right-group").fadeIn();
    }
  })

})