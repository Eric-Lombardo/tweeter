let time = new Date;
let timeString = time.toDateString().substring(4,15);

$(document).ready(function() {
  $(".tweet footer > p").text(timeString)
})