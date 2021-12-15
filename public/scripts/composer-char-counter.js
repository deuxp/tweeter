$(document).ready(() => {

  $('#tweet-text').on('keyup', function() {
    const $count = $(this).val().length; // <-- `this` is the element where the event is occuring
    const $counter = $(this).parents('form').children('.submission-area').children('.counter');

    // change inner html of $counter
    const charsLeft = 140 - Number($count);

    if (charsLeft < 1) { // add css || remove css
      $counter.css('color', 'red');
    } else {
      $counter.css('color', '#4056A1');
    }
    
    $counter.html(charsLeft);

  });

});
