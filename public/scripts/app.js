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
                <i class="fa fa-heart" aria-hidden="true"></i>
              </span>
            </footer>`;
  }

  function createTweetElement(tweetData){
    var header = createTweetHeader(tweetData);
    var $body = $("<div>").text(tweetData.content.text);
    var footer = createTweetFooter(tweetData);

    var $tweet = $("<article>").addClass('tweet').append(header, $body, footer);
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


});