let counter = 0;
let maxChar = 140;

$(document).ready(function() {
  $("#newTweetText").on("input", function() {
    // getting text length from textarea input
    counter = $(`#${this.id}`)[0].textLength;
    
    // targetting element .counter to update number
    $(".counter")[0].innerHTML = maxChar - counter;
    
    // if negative add class
    if (maxChar - counter < 0) {
      $(".counter").first().addClass("gone-over-limit");
    }
    
    // never allow textarea to enter scroll-mode
    $("textarea").css("height", $("textarea")[0].scrollHeight);

    // removes negative-red-color class when text is within character limits
    if (maxChar - counter >= 0) {
      $(".counter").first().removeClass("gone-over-limit");
    }  
  })
})