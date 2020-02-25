let time = new Date;
let timeString = time.toDateString().substring(4,15);

$(document).ready(function() {
  $("#one footer > p").text(timeString)
})