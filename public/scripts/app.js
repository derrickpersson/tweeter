$(document).ready(function(){

  function getFormatDate(date){
    return moment(date, "x").fromNow();
  }

  function createTweetHeader(tweetData){
    return `<header>
              <img src="${tweetData.user.avatars.small}">
              <h2>${tweetData.user.name}</h2>
              <span class="userHandle">${tweetData.user.handle}</span>
            </header>`;
  }

  function createTweetFooter(tweetData){
    return `<footer>
              ${getFormatDate(tweetData.created_at)}
              <span class="hover-icons">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <span class="like-counter"></span>
                <i class="fa fa-heart like-button" aria-hidden="true"></i>
              </span>
            </footer>`;
  }

  function createTweetElement(tweetData){
    var header = createTweetHeader(tweetData);
    var $body = $("<div>").text(tweetData.content.text);
    var footer = createTweetFooter(tweetData);

    var $tweet = $("<article>").addClass('tweet').append(header, $body, footer);
    $tweet.data("id", tweetData._id);
    $tweet.data("likes", 0);
    return $tweet;
  };

  function renderTweets(tweets){
    $('.tweet-container').empty().html(tweets.map(createTweetElement).reverse());
  }

  // Get tweets via AJAX
  function loadTweets(){
    $.ajax({
      url: 'tweets',
      dataType: 'json',
      method: 'GET'
    }).done(function(result){
      renderTweets(result);
    });
  };

  // Check that the text length is valid
  function checkTextLength(textarea){
    if( textarea.length > 140){
      return 'Your message is too long!';
    } else if (textarea.length === 0){
      return 'Your message is missing!';
    }
    return null;
  }

// Post tweet using AJAX call
  $('.new-tweet').on("submit", 'form', function(submitEvent){
    var $form = $(submitEvent.target);
    var textArea = $($form).find('textarea').val()
    submitEvent.preventDefault();

    if(checkTextLength(textArea)){
      var warning = `<div class="warning">
                        ${checkTextLength(textArea)} <center>
                    </div>`
      $(submitEvent.target).prepend(warning);
      $(submitEvent.target).find('.warning').fadeOut(3000);
      return;
    };


    $.ajax({
      url: $form.attr('action'),
      type: 'POST',
      data: $form.serialize(),
    }).done(function(event, xhr, settings){
      $(submitEvent.target).trigger('reset');
      $('.counter').text("140");
      loadTweets();
    });
  });


  loadTweets();

  // Toggle form:
  $('.new-tweet').slideUp(0);
  $('#nav-bar > a').on('click', function(event){
    event.preventDefault();
    $(this).toggleClass('form-shown');
    $('.new-tweet').slideToggle();
    $('.new-tweet').find('textarea').focus()
  });


  // Stretch:

  // Liking Tweets:
  $('body').on('click', '.like-button', function(event){
    var $tweet = $(this).closest('article');
    $(this).toggleClass('liked');
    $tweet.data("id");
    if($tweet.data("liked")){
      // Remove one from the total likes.
      $tweet.data("likes", $tweet.data("likes") - 1);
      $tweet.data("liked", false);
    }else{
      // Add one to the total likes.
      $tweet.data("likes", $tweet.data("likes") + 1);
      $tweet.data("liked", true);
    }

    // Show like counter logic
    if($tweet.data("likes") === 0){
      $tweet.find('.like-counter').html(null);
    }else{
     $tweet.find('.like-counter').html($tweet.data("likes"));
    }

    // Post using ajax
    $.ajax({
      url: '/tweets/' + $tweet.data("id"),
      type: 'POST',
      data: {"id": $tweet.data("id"), "likes": $tweet.data("likes")},
    }).done(function(event, xhr, settings){
      // Do stuff???
    });


  });



});