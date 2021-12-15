/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  // input  -> JSON object tweet
  // output -> HTML dom structure --> using $() and template literals for the tags || text --> appending to the article, which has CSS rules already applied
  
  const createTweetElement = (tweet) => { // use this in a loop
    // raw text
    const { user, content, created_at } = tweet;
    const { name, avatars, handle } = user;
    const { text } = content;
    const ts = timeago.format(created_at)
    
    const $article = $(`
      <article id="tweet">
        <header>

          <div class="profile">
            <img class="icon" src="${avatars}" alt="avatar">
            <div class="user">${name}</div>
          </div>

          <div class="handle">${handle}</div>
        </header>
        
        <div class="message">${text}</div>

        <footer>

          <div class="time">${ts}</div>

          <div class="likes">
            <div class="flag"><i class="fas fa-flag"></i></div>
            <div class="retweet"><i class="fas fa-retweet"></i></div>
            <div class="like"><i class="fas fa-heart"></i></div>
          </div>
          
        </footer>
        
      </article>
    `)
  
    return $article
  }
  
  const renderTweets = (tweets) => {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('.container').append($tweet)
    });
  }


  // event listener for submit form

  $('.new-tweet form').submit(function(e) {
    e.preventDefault();
    const text = $(this['0']).val();
    const $text = $(this['0']).serialize();

    // validation: empty string
    if (!text) {
      alert('start chirping!!')


    } else if (text.length > 140) {

      alert('Too much chirping > 140 characters!!')
    
      
    } else {
      $.post('/tweets', $text)
      .then(_res => {
        $('.container #tweet').remove() // reset html
       loadTweets()
      })
      // clear form
      this.reset();
    }
  })
  
  const loadTweets = function() {

    $.get({
      method: 'GET',
      dataType: 'json',
      url: '/tweets',
      success: tweets => {
        console.log(tweets);
        renderTweets(tweets)
      }
    })
  }

  // init page
  loadTweets();
})
