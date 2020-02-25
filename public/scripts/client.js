/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// temporary data
const tweetObj = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}





const createTweetElement = function(tweetObj) {
  const $tweet = $("<article>").addClass("tweet")
  
  const $headerUser = $("<div>").addClass("user");
  const $userImg = $("<img>").attr("src", tweetObj.user.avatars)
  const $userName = $("<p>").text(tweetObj.user.name)
  $headerUser.append($userImg);
  $headerUser.append($userName);
  const $userTag = $("<p>").text(tweetObj.user.handle)
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
  const $created = $("<p>").text(tweetObj.created_at);
  const $footer = $("<footer>").append($created)
  $footer.append($iconGroup);
  
  $tweet.append($header)
  $tweet.append($tweetContent)
  $tweet.append($hr)
  $tweet.append($footer)
  
  return $tweet;
}

$(document).ready(function() {
  const $newTweet = createTweetElement(tweetObj);
  console.log($newTweet);
  console.log($("#tweets-container"));
  $("#tweets-container").append($newTweet);
})