$(document).ready(() => {
  const $textBox = $('#tweet-text');

  $textBox.on('keyup', function() {
    const $count = $(this).val().length; // <-- `this` is the element where the event is occuring
    const $counter = $(this).parents('form').children('.submission-area').children('.counter');

    // change inner html of $counter
    const charsLeft = Number(140) - Number($count);

    if (charsLeft < 1) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', '#4056A1');
    }
    
    $counter.html(charsLeft);

  });

});