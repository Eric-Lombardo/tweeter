/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// starter data to build tweet "history"
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


// create html element with given obj data
const createTweetElement = function(tweetObj) {
  const $tweet = $("<article>").addClass("tweet");
  
  // create header section of a tweet (profile pic, name, @tag)
  const $headerUser = $("<div>").addClass("user");
  const $userImg = $("<img>").attr("src", tweetObj.user.avatars);
  const $userName = $("<p>").text(tweetObj.user.name);
  $headerUser.append($userImg);
  $headerUser.append($userName);
  const $userTag = $("<p>").attr("id", "user-tag").text(tweetObj.user.handle);
  const $header = $("<header>").append($headerUser);
  $header.append($userTag);
  
  // actual tweet text body
  const $tweetContent = $("<p>").text(tweetObj.content.text);
  const $hr = $("<hr>");
  
  // create footer section (days old, icon group(flag, like, retweet))
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
  const $footer = $("<footer>").append($created);
  $footer.append($iconGroup);
  
  // stitch everything inside 1 article
  $tweet.append($header);
  $tweet.append($tweetContent);
  $tweet.append($hr);
  $tweet.append($footer);
  
  return $tweet;
};

// looping through an array of data objs and using createTweetElement
// to build html elements
const renderTweets = function(dataArr) {
  for (let dataObj of dataArr) {
    let newTweet = createTweetElement(dataObj);
    $("#tweets-container").prepend(newTweet);
  }
};

// to display starter data on page load
$(document).ready(function() {
  renderTweets(data);
});

// ---------------- building elements above -------------
// ---------------- ajax post request below -------------

const loadTweets = function() {
  $("#newTweetText").val("");
  // access tweet DB
  $.ajax({
    method: "GET",
    url: "/tweets"
  })
    .then(function(data) {
      let newestTweet = [data[data.length - 1]];
      return renderTweets(newestTweet);
    });
};


$(document).ready(function() {
  // targetting the form element on submit
  $("#newTweetForm").submit(function(event) {
    event.preventDefault();
    $("#error-container").slideUp("slow");

    let formData = $("#newTweetForm").serialize();

    if ($("#newTweetText").val().length === 0) {
      // if tweet message body is empty show error
      $("#error-message").text("the tweet body is empty");
      $("#error-container").slideDown("slow");
    } else if ($("#newTweetText").val().length > 140) {
      // if tweet body exceeds 140 chars show error
      $("#error-message").text("140 character maximum exceeded");
      $("#error-container").slideDown("slow");
    } else {
      // ajax POST /tweets
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: formData
      })
        .done(() => {
          loadTweets();
          // reset textarea and UI char counter
          $(".counter")[0].innerHTML = 140;
          $("textarea").css("height", 31);
        });
    }
  });
});

