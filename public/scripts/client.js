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
  
    return $article
  }
  
  const renderTweets = (tweets) => {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('.container').append($tweet)
    });
  }


  /** Helper Function: error pop-up window
   * ----- ----- ----- ----- ----- ----- ----- ----- 
   * @param {string} msg ->  display error message
   * @param {string} id ->  id=" ... " element id
   * @param {string} sibling -> insert created DOM element after this sibling
   * Behaviour: The purpose of this function is to construct the 
   * DOM element for the Error pop-up window. And insert itself next to a sibling
   */
  const errorBubble = (msg, id, sibling) => {
    const $msg = $(`<div id="${id}">⚠️ - - ${msg} - - ⚠️</div>`)

    // create DOM element
    $msg.insertAfter(`${sibling}`)
    // animate box
    $(`#${id}`).hide().slideDown({duration: 'fast'})
    setTimeout(()=>{$(`#${id}`).hide('600')}, 3000)
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
      .then(_res => {
        $('.container #tweet').remove() // reset html
       loadTweets()
      })
      // clear form
      this.reset();
    }
  })
  

  // when called it grabs the tweet array from the database; type: JSON
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
