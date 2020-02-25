let time = new Date;
let timeString = time.toDateString().substring(4,15);

$(document).ready(function() {
  $("#old-tweets-footer > p").text(timeString)
})