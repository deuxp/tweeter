/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// hard coded test object 
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(() => {

  // input  -> JSON object tweet
  // output -> HTML dom structure --> using $() and template literals for the tags || text --> appending to the article, which has CSS rules already applied
  
  const createTweetElement = (tweet) => { // use this in a loop
    // raw text
    const { user, content, created_at } = tweet;
    const { name, avatars, handle } = user;
    const { text } = content;
    
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

          <div class="time">${created_at}</div>

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


  // event listener for submit
  $('.new-tweet form').submit(function(e) {
    e.preventDefault();
    const $text = $(this['0']).serialize();
    console.log($text);
    $.post('/tweets', $text)
     .then(res => {
      //  console.log(res);
      loadTweets()
     })
     this.reset();
  })
  
  const loadTweets = function() {

    $.get({
      method: 'GET',
      dataType: 'json',
      url: '/tweets',
      success: tweets => {
        renderTweets(tweets)
      }
    })
  }
  loadTweets();
})
