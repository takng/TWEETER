/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweet) {
  let output = '';

  output += `<article class="tweet">
            <header>
              <img src="${escape(tweet.user.avatars.small)}"/>
              <h2>${escape(tweet.user.name)}</h2>
              <span>${escape(tweet.user.handle)}</span>
            </header>
            <p>
              ${escape(tweet.content.text)}
            </p>
            <footer>
              <div class="new-tweet__time-stamp">${escape(tweet.created_at)}</div>
              <div class="new-tweet__icons">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
              </div>
            </footer>
          </article>`

  return output
}

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  for (let tweetData of tweets) {
    let $tweet = createTweetElement(tweetData);
    $('.new-tweet__container').prepend($tweet);
  };
};

$(document).ready(function() {

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
    .done((data) => {
      renderTweets(data);
    })
    .fail(console.error);
  };

  $('.compose').click(function(ev) {
    $('.new-tweet').slideToggle('200');
    $('.textarea').focus();
  });

  $('.new-tweet__container').on('mouseenter', '.tweet', function() {
    $(this).find('.new-tweet__icons').addClass('show');
  })  

  $('.new-tweet__container').on('mouseleave', '.tweet', function() {
    $(this).find('.new-tweet__icons').removeClass('show');
  })

  // form handlers
  $('.new-tweet form').on('submit', (e) => {
    e.preventDefault();

    let textBox = $('.new-tweet textarea');

    if (textBox.val() === '') {
      alert(`Empty input!`);
      return;
    } else if (textBox.val().length > 140) {
      alert(`Tweet more than 140 characters!`);
      return;
    }

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $('.new-tweet form').serialize()
    })
    .then((new_tweet) => {
      loadTweets();
      textBox.val('');
      $(this).find('.counter').text('140');

    })
  });

  loadTweets();
});

