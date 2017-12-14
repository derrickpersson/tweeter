var tweetsData = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]




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
    var $icons = $("<span>").addClass("hover-icons").html('<i class="fa fa-flag" aria-hidden="true"></i>' + ' ' + '<i class="fa fa-retweet" aria-hidden="true"></i>' + ' ' + '<i class="fa fa-heart" aria-hidden="true"></i>');

    return $footer = $("<footer>").text("Created " + getFormatDate(tweetData.created_at)).append($icons);

  }

  function createTweetElement(tweetData){
    var $header = createTweetHeader(tweetData);
    var $body = $("<div>").text(tweetData.content.text);
    var $footer = createTweetFooter(tweetData);

    var $tweet = $("<article>").addClass('tweet').append($header, $body, $footer);
    return $tweet;
  };

  function renderTweets(tweets){
    $('.tweet-container').empty()
    for(var i = 0; i < tweets.length; i++){
      $('.tweet-container').prepend(createTweetElement(tweets[i]));
    }

  }


// Get tweets via AJAX
function loadTweets(){
  $.ajax({
        url: 'tweets',
        dataType: 'json',
        method: 'GET',
        success: function (result) {
          renderTweets(result);
        }
      });
};

// Post tweet using AJAX call
  $('.new-tweet').on("submit", 'form', function(submitEvent){
    var textAreaLength = $(this).find('textarea').val().length
    submitEvent.preventDefault();

    if( textAreaLength > 140){
      return alert('Your message is too long!');
    }else if(textAreaLength === 0){
      return alert('Your message is missing!');
    }

    var $form = $(submitEvent.target);
    var formData = $(this).serialize();

    $.ajax({
        url: $form.attr('action'),
        type: 'POST',
        data: $form.serialize(),
        }).done(function(event, xhr, settings){
          $(submitEvent.target).trigger('reset');
          loadTweets();
        });
  });


  loadTweets();

  // Toggle form:
  $('.new-tweet').slideUp(0);
  $('#nav-bar > a').on('click', function(event){
    event.preventDefault();
    $(this).toggleClass('form-shown');
    $(this).toggleClass('form-hidden');
    $('.new-tweet').slideToggle();
    $('.new-tweet').find('textarea').focus()
  });


});