
$(document).ready(() => {

  $('#tweet-text').on('input', function() {
    const $count = $(this).val().length; // <-- `this` is the element where the event is occuring
    const $counter = $(this).parents('form').children('.submission-area').children('.counter');

    // change inner html of $counter
    let charsLeft = 140 - Number($count);

    // add css || remove css
    if (charsLeft < 1) { 
      $counter.css('color', 'red');
    } else {
      $counter.css('color', '#4056A1');
    }
    
    $counter.html(charsLeft);
    
  });
  
  
      ///////////////////
      // reset counter //
      ///////////////////
  $('.new-tweet form').submit(function(e) {
      e.preventDefault();
      let $counts = $(this).parents('form').children('.submission-area').children('.counter');

      $counts.html('140')
  })

});
