var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}



$(document).ready(function(){

  function getFormatDate(date){
    return moment(date, "x").fromNow();
  }

  function createTweetHeader(tweetData){
    var $img = $("<img>").attr("src", tweetData.user.avatars.small);
    var $userName = $("<h2>").text(tweetData.user.name);
    var $handle = $("<span>").addClass('userHandle').text(tweetData.user.handle);
    return $header = $("<header>").append($img, $userName, $handle);
  }

  function createTweetFooter(tweetData){
    var $icons = $("<span>").addClass("hover-icons").html('<i class="fa fa-flag" aria-hidden="true"></i><i class="fa fa-retweet" aria-hidden="true"></i><i class="fa fa-heart" aria-hidden="true"></i>');

    return $footer = $("<footer>").text("Created " + getFormatDate(tweetData.created_at)).append($icons);

  }

  function createTweetElement(tweetData){
    var $header = createTweetHeader(tweetData);
    var $body = $("<div>").text(tweetData.content.text);
    var $footer = createTweetFooter(tweetData);

    var $tweet = $("<article>").addClass('tweet').append($header, $body, $footer);
    return $tweet;
  };

  let $tweet = createTweetElement(tweetData);
  console.log($tweet.html());
  $('.tweet-container').append($tweet);
  // console.log(getFormatDate(1461116232227));












});