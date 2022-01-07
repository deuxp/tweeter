
$(document).ready(() => {

  // Form character counter
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


  ///////////////////////////////////
  // toggle new tweet from nav bar //
  ///////////////////////////////////

  const $ntwt = $('section.new-tweet');
  const $elem = $('i'); 
  $elem.on('click', () => {
    $elem.toggleClass('animate toggleColor')
    $ntwt.slideToggle('fast')
    $ntwt.toggleClass('hidden')
    $('#tweet-text').focus()
  })
  
  
  /////////////////////////////////////
  // reveal second button: new-tweet //
  /////////////////////////////////////
  
  const $st = $('.second-toggle')
  
  $(document).on('scroll', () => {
    $st.removeClass('hidden')
  })
  
  $('#tweet-text').on('focus', () => {
    $st.addClass('hidden')
  })


  ////////////////////////
  // animate nav button //
  ////////////////////////

  const $navTweet = $('.animate');

  const loopBack = () => {
    $navTweet.animate({
      'top': '0px'
    }, 1500, )
  }
	
	const loop = () => {
		$navTweet.animate({
      'top': '10px'
    }, 1300, () => {
      loopBack()
    })
	}
	
  const animateButton = () => {
    loop()
    setInterval(() => {
      loop()
    }, 2800)
  }

  animateButton()
});
