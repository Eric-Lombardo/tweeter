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


// helper function to turn created_at into a more human friendly way
const reducedDate = function(days) {
  if (days > 365) {
    return `nearly ${Math.round(days / 365)} years old`;
  } else if (days === 0) {
    return `Today`
  }
}

// create html element with given obj data
const createTweetElement = function(tweetObj) {
  let buildStr = `
  <article class="tweet">
    <header>
      <div class="user">
        <img src="${tweetObj.user.avatars}">
        <p>${tweetObj.user.name}</p>
      </div>
      <p id="user-tag">${tweetObj.user.handle}</p>
    </header>

    <p style="word-break: break-all;">${tweetObj.content.text}</p>

    <hr>

    <footer>
      <p>${reducedDate(Math.floor(($.now() - tweetObj.created_at) / 86400000))}</p>
      <div class="icon-group">
        <i class="fas fa-flag"></i>
        <i class="fas fa-sync"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`

  return $(buildStr);
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
  // renderTweets(data);
  $.ajax({
    method: "GET",
    url: "/tweets"
  })
    .then(data => renderTweets(data))
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

// export default data