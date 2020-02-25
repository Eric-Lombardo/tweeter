let time = new Date;
let timeString = time.toDateString().substring(4,15);

$("#old-tweets-footer > p").text(timeString)