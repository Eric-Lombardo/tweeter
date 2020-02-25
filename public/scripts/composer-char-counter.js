$("#newTweetText").on("keypress", function(event) {
  // getting text length from textarea input
  let counter = $(`#${this.id}`)[0].textLength + 1;

  // targetting element .counter to update number
  $(".counter")[0].innerHTML = 140 - counter;

  if (140 - counter < 0) {
    $(".counter").first().addClass("gone-over-limit")
  }
})