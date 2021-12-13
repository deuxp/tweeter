// waits for DOM content to load before running callback

$(document).ready(() => {
  const $tweetText = $('#tweet-text')
  const chars = 140

  
  $tweetText.on('keypress', function(e) {
    const $thang = $(this)
    console.log($thang);
  })

})