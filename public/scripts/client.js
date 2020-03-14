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
const reducedDate = function(milleseconds) {
  let years = 0;
  let months = 0;
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // reduce milleseconds into year/month/day/hour/minute/second components
  while (milleseconds >= 1000) {
    if (milleseconds >= 31556952000) {
      milleseconds -= 31556952000;
      years++
    } else if (milleseconds >= 2592000000) {
      milleseconds -= 2592000000;
      months++
    } else if (milleseconds >= 86400000) {
      milleseconds -= 86400000;
      days++
    } else if (milleseconds >= 3600000) {
      milleseconds -= 3600000;
      hours++
    } else if (milleseconds >= 60000) {
      milleseconds -= 60000;
      minutes++
    } else if (milleseconds >= 1000) {
      milleseconds -= 1000;
      seconds++
    }
  }

  // return the most useful timestamp back
  if (!seconds) {
    return "just now"
  } else if (years && months) {
    return `${years} years and ${months} months ago`
  } else if (years) {
    return `${years} years ago`
  } else if (months) {
    return `${months} months ago`
  } else if (days) {
    return `${days} days ago`
  } else if (hours) {
    return `${hours} hours ago`
  } else if (minutes) {
    return `${minutes} minutes and ${seconds} seconds ago`
  } else if (seconds) {
    return `${seconds} seconds ago`
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
      <p>${reducedDate($.now() - tweetObj.created_at)}</p>
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
