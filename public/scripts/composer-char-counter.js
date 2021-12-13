// waits for DOM content to load before running callback

$(document).ready(() => {
  const $tweetText = $('#tweet-text')

  $tweetText.on('keyup', function() {
    const $count = $(this).val().length; // <-- `this` is the element where the event is occuring
    // const $counter = $('.counter')

    // logs
    // console.log(`this is the parent of "this":`);
    const $counter = $(this).parents('form').children('.submission-area').children('.counter');
    // console.log(a);
    // console.log(`this is "this": `);
    // console.log(this);

    // change inner html of $counter
    const charsLeft = Number(140) - Number($count)
    if (charsLeft < 1) {
      $counter.css('color', 'red')
    } else {
      $counter.css('color', '#4056A1')
    }
    $counter.html(charsLeft)

  })

})