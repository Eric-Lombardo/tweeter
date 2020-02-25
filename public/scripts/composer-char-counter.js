let counter = 0;
let maxChar = 140;

$("#newTweetText").on("keypress", function(event) {
  // getting text length from textarea input
  counter = $(`#${this.id}`)[0].textLength + 1;

  // targetting element .counter to update number
  $(".counter")[0].innerHTML = maxChar - counter;

  // if negative add class
  if (maxChar - counter < 0) {
    $(".counter").first().addClass("gone-over-limit")
  }
})


// if there's a backspace pressed adjust count
$("#newTweetText").on("keydown", function(event) {
  if (event.keyCode === 8) {
    counter--;
    if (counter <= 0) {
      counter = 0;
    }
    $(".counter")[0].innerHTML = maxChar - counter; 
  }

  if (maxChar - counter >= 0) {
    $(".counter").first().removeClass("gone-over-limit")
  }
})