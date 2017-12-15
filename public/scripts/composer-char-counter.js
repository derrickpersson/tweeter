$(document).ready(function(){

  $('.new-tweet textarea').on("input", function(event){
    const allowedCharacters = 140;
    let charactersRemaining = allowedCharacters - $(this).val().length;
    let counter = $(this).parent().find('.counter');
    let overLimitClass = 'over-character-limit';

    counter.text(charactersRemaining);
    if(charactersRemaining < 0){
      counter.addClass(overLimitClass);
    }else{
      counter.removeClass(overLimitClass);
    }
  })



});