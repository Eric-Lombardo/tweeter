/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// temporary data
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]


// create html element with dataobj
const createTweetElement = function(tweetObj) {
  const $tweet = $("<article>").addClass("tweet")
  
  const $headerUser = $("<div>").addClass("user");
  const $userImg = $("<img>").attr("src", tweetObj.user.avatars)
  const $userName = $("<p>").text(tweetObj.user.name)
  $headerUser.append($userImg);
  $headerUser.append($userName);
  const $userTag = $("<p>").attr("id", "user-tag").text(tweetObj.user.handle)
  const $header = $("<header>").append($headerUser)
  $header.append($userTag);
  
  const $tweetContent = $("<p>").text(tweetObj.content.text);
  const $hr = $("<hr>");
  
  const $iconGroup = $("<div>").addClass("icon-group");
  const $flag = $("<i>").addClass("fas fa-flag");
  const $sync = $("<i>").addClass("fas fa-sync");
  const $heart = $("<i>").addClass("fas fa-heart");
  $iconGroup.append($flag);
  $iconGroup.append($sync);
  $iconGroup.append($heart);
  let daysOld = Math.floor(($.now() - tweetObj.created_at) / 86400000);
  let daysOldStr = `${daysOld} days old`;
  const $created = $("<p>").text(daysOldStr);
  const $footer = $("<footer>").append($created)
  $footer.append($iconGroup);
  
  $tweet.append($header)
  $tweet.append($tweetContent)
  $tweet.append($hr)
  $tweet.append($footer)
  
  return $tweet;
}

// looping through an array of data objs and using createTweetElement
// to build html elements
const renderTweets = function(dataArr) {
  for (let dataObj of dataArr) {
    let newTweet = createTweetElement(dataObj);
    $("#tweets-container").prepend(newTweet);
  }
}

// $(document).ready(function() {
//   renderTweets(data);
// })

// ---------------- building elements above -------------
// ---------------- ajax post request below -------------

const loadTweets = function() {
  $.ajax({
    method: "GET",
    url: "/tweets"
  })
    .then(function(data) {
      return renderTweets(data);
    })
}


$(document).ready(function() {
  // targetting the form element
  $("#newTweetForm").submit(function(event) {
    event.preventDefault();

    let formData = $("#newTweetForm").serialize();

    if (formData.length < 6) {
      alert("the tweet body is empty")
    } else if (formData.length > 145) {
      alert("140 character maximum exceeded");
    } else {
      // ajax POST /tweets
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: formData
      })
        .done(() => loadTweets());
    }

    
  })
})

