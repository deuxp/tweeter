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
  
  
    /** 
     * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
     * Behaviour: Requests the tweet array from the database; type: JSON
     *            Then renders the tweets to the DOM using renderTweets()
     * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
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
  
  
    /** Helper Function: Appends error pop-up window and presents it
     * ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- 
     * @param {string} msg -> display error message
     * @param {string} id -> id="" element id
     * @param {string} sibling -> insert created DOM element after this sibling
     * Behaviour: The purpose of this function is to construct the 
     * DOM element for the Error pop-up window. And insert itself after a specified sibling
     * ----- ----- ----- ----- ----- ----- ----- ----- ---------- ----- ----- 
     */
    const errorBubble = (msg, id, sibling) => {
      // prevent duplicates
      $(`#${id}`).remove();

      // create DOM element
      const $msg = $(`<div id="${id}">⚠️ - - ${msg} - - ⚠️</div>`)
      $msg.insertAfter(`${sibling}`)
  
      // animate pop-up
      $(`#${id}`).hide().slideDown({duration: 'fast'})
    };
  

  ////////////////////////////////////
  // event listener for submit form //
  ////////////////////////////////////

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
        // hide the error box && clear form
        $('#error-msg').hide('fast')
        $('.new-tweet form').trigger('reset');

        // Guard: clear parent DOM element so loadTweets() does NOT append duplicate elements
        $('.container #tweet').remove()
        loadTweets()
        
        // reset counter
        $('.submission-area .counter').html('140')
        $('#tweet-text').focus()


      })
    }
  })
  

  ////////////////////////////////
  // INITIAL LOAD OF ALL TWEETS //
  ////////////////////////////////

  loadTweets();


  ///////////////////////////////////
  // toggle new tweet from nav bar //
  ///////////////////////////////////

  const $ntwt = $('section.new-tweet');
  const $i = $('i'); 
  $i.on('click', () => {
    $i.toggleClass('animate toggleColor')
      $ntwt.slideToggle('fast')
        $ntwt.toggleClass('hidden')
          $('#tweet-text').focus()

  })


  ////////////////////
  // animate button //
  ////////////////////

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

})