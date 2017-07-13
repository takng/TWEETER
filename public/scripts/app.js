 /*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */

 const escape = (str) => {
   var div = document.createElement('div');
   div.appendChild(document.createTextNode(str));
   return div.innerHTML;
 };

 const convertDate = (postedOn)  => {
   let msPerMinute = 60 * 1000;
   let msPerHour = msPerMinute * 60;
   let msPerDay = msPerHour * 24;
   let msPerMonth = msPerDay * 30;
   let msPerYear = msPerDay * 365;
   let elapsed = Date.now() - postedOn;

   if (elapsed < msPerMinute) {
       return Math.round(elapsed/1000) + ' seconds ago';
   }
   else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + ' minutes ago';
   }
   else if (elapsed < msPerDay ) {
       return Math.round(elapsed/msPerHour ) + ' hours ago';
   }
   else if (elapsed < msPerMonth) {
      return Math.round(elapsed/msPerDay) + ' days ago';
   }
   else if (elapsed < msPerYear) {
      return Math.round(elapsed/msPerMonth) + ' months ago';
   }
   else {
      return Math.round(elapsed/msPerYear ) + ' years ago';
   };
 };

 const createTweetElement = (tweet) => {
   "user": {
     "name": "Newton",
     "avatars": {
       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
     },
     "handle": "@SirIsaac"
   },
   "content": {
     "text": "If I have seen further it is by standing on the shoulders of giants"
   },
   "created_at": 1461116232227
 };

 // new tweets template
 // const createTweetElement = (tweet) => `<article class="tweet">
 //   <header>
 //     <img src="${escape(tweet.user.avatars.small)}"/>
 //     <h2>${escape(tweet.user.name)}</h2>
 //     <span>${escape(tweet.user.handle)}</span>
 //   </header>
 //   <p>
 //     ${escape(tweet.content.text)}
 //   </p>
 //   <footer>
 //     <div class="new-tweet__time-stamp">${escape(convertDate(tweet.created_at))}</div>
 //     <div class="new-tweet__icons">
 //       <i class="fa fa-flag" aria-hidden="true"></i>
 //       <i class="fa fa-retweet" aria-hidden="true"></i>
 //       <i class="fa fa-heart" aria-hidden="true"></i>
 //     </div>
 //   </footer>
 // </article>`;

 const renderTweets = (tweets) => {
   for (let tweetData of tweets) {
     let $tweet = createTweetElement(tweetData);
     $('.new-tweet__container').prepend($tweet);
   };
 };


 // begin jQuery functions on document ready
 $(document).ready(function() {

   $('#nav-bar .logo, #nav-bar .header').on('click', () => {
     location.reload(true);
   });

   const loadTweets = () => {
     $.ajax({
       method: 'GET',
       url: '/tweets'
     })
     .then((data) => {
       renderTweets(data);
     }, console.error);
   };


   // load initial tweets
   loadTweets();


   // social icons
   let $tweetContainer = $('.new-tweet__container');

   $tweetContainer.on('mouseenter', '.tweet', function() {
     $(this).find('.new-tweet__icons').addClass('show');
   })
   $tweetContainer.on('mouseleave', '.tweet', function() {
     $(this).find('.new-tweet__icons').removeClass('show');
   });


   // toggle compose form
   let $composeBox = $('.new-tweet');

   $('.compose').on('click', () => {
     $composeBox.slideToggle('slow').focus();

     if($composeBox.is(':visible')) {
       $composeBox.find('textarea').focus();
     };
   });


   // append new tweet submissions and store in database
   let $newTweet = $('.new-tweet form');

   $newTweet.on('submit', (e) => {
     e.preventDefault();

     let $tweetBox = $('.new-tweet textarea');
     let $tweetBoxError = $('.tweet-append-error');

     if ($tweetBox.val() === '') {
       $tweetBoxError.remove();
       $newTweet.append(`<span class="tweet-append-error">
         Oops! The tweet field is empty!
       </span>`);
       return;
     } else if ($tweetBox.val().length > 140) {
       $tweetBoxError.remove();
       $newTweet.append(`<span class="tweet-append-error">
         Oops! Your tweet is too long!
       </span>`);
       return;
     };

     $.ajax({
       method: 'POST',
       url: '/tweets',
       data: $newTweet.serialize()
     })
     .then((new_tweet) => {
       $tweetBoxError.remove();
       loadTweets();
       $tweetBox.val('');
       $newTweet.find('.counter').text('140');
     });
   });

 });
