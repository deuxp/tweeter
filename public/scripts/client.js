/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  /**
   * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
   * @param {JSON} tweet -> the tweets JSON object database
   * @returns the DOM object representation of one tweet
   * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
   */
  const createTweetElement = (tweet) => {
    const { user, content, created_at } = tweet;
    const { name, avatars, handle } = user;
    const { text } = content;
    const timeStamp = timeago.format(created_at)

    // XSS prevention
    const $safeText = $('<div>').text(text).html()
    
    const $article = $(`
      <article id="tweet">
        <header>

          <div class="profile">
            <img class="icon" src="${avatars}" alt="avatar">
            <div class="user">${name}</div>
          </div>

          <div class="handle">${handle}</div>
        </header>
        
        <div class="message">${$safeText}</div>

        <footer>

          <div class="time">${timeStamp}</div>

          <div class="likes">
            <div class="flag"><i class="fas fa-flag"></i></div>
            <div class="retweet"><i class="fas fa-retweet"></i></div>
            <div class="like"><i class="fas fa-heart"></i></div>
          </div>
          
        </footer>
        
      </article>
    `)
    return $article;
  };
  

  /**
   * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
   * @param {JSON} tweets
   * Behaviour: Leverage createTweetElement() to append
   *            each tweet element to the DOM
   * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
   */
  const renderTweets = (tweets) => {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('.container').append($tweet)
    });
  }


  /** Helper Function: error pop-up window
   * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
   * @param {string} msg -> display error message
   * @param {string} id -> id="" element id
   * @param {string} sibling -> insert created DOM element after this sibling
   * Behaviour: The purpose of this function is to construct the 
   * DOM element for the Error pop-up window. And insert itself after a sibling
   * ----- ----- ----- ----- ----- ----- ----- ----- ---------- ----- ----- 
   */
  const errorBubble = (msg, id, sibling) => {
    const $msg = $(`<div id="${id}">⚠️ - - ${msg} - - ⚠️</div>`)

    // create DOM element
    $msg.insertAfter(`${sibling}`)
    // animate pop-up
    $(`#${id}`).hide().slideDown({duration: 'fast'})
    // hide box pop-up upon form submission 
    $('.new-tweet form').submit(function(e) {
      e.preventDefault();
      $(`#${id}`).hide('fast');
    })

  };


  // event listener for submit form
  $('.new-tweet form').submit(function(e) {

    e.preventDefault();
    const text = $(this['0']).val();
    const $text = $(this['0']).serialize();
    const errMsg1 = 'You need to enter some text'
    const errMsg2 = 'You have exceeded the character limit'
    
    // validation: empty string
    if (!text) {
      errorBubble(errMsg1, 'error-msg', '.new-tweet h2')
      
    } else if (text.length > 140) {
      errorBubble(errMsg2, 'error-msg', '.new-tweet h2')

    } else {
      $.post('/tweets', $text)
      .then(() => {
        $('.container #tweet').remove() // without this clearing the HTML, loadTweets() will append duplicate lists to the DOM
        loadTweets()
      })
      .then(() => {
        $('#error-msg').hide('slow')
      })
      .then(() => {
        // clear form
        $('.new-tweet form').trigger('reset');
      })
    }
  })
  


  /**
   * Behaviour: Requests the tweet array from the database; type: JSON
   */
  const loadTweets = function() {
    $.get({
      method: 'GET',
      dataType: 'json',
      url: '/tweets',
      success: tweets => {renderTweets(tweets)}
    })
    .catch(err => {
      console.log(err.message);
    })
  };

  // init page
  loadTweets();
})
