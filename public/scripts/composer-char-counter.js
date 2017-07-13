// var script = document.createElement("SCRIPT");
// script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
// script.type = 'text/javascript';
//
// $(document).ready(function(){
//   console.log(document);
  // console.log(document.body);
  // // console.log( $( "body" ).data( "textarea" ) );
  // console.log (("selector").data);

  $(document).ready(function() {
    let tArea = $('textarea');
    let counter = $('.counter');
console.log(tArea.val());
console.log(tArea.val().length);
    $('.new-tweet').on('keyup', 'textarea', function() {
      tArea.val();
      counter.text(140 - tArea.val().length);

      console.log(tArea.val());
      console.log(this);
      //console.log(this.val());
      console.log(tArea.val().length);

      if (tArea.val().length > 140) {
        counter.addClass('over');
      } else {
        counter.removeClass('over');
      }
    });
  });
  //console.log(document.textarea.newTweet);
    //
    // $("button").click(function(){
    //     $("p").hide();
    //     console.log(document);
    // });

    // document.click(function(){
    //     //$("p").hide();
    //     console.log(document);
    // });
    //
    // $("textarea.newTweet").input(function() {
    //     console.log(document);
//       $($0).toggleClass('over')
// [span.counter, context: span.counter]
// $($0).toggleClass('over')
// [span.counter.over, context: span.counter.over]
// $($0).toggleClass('over')
// [span.counter, context: span.counter]
      // get the length of the textarea's value (the text the user inputted)

      // update our character counter html to show user how many characters
      // they have left

    //   Toggle a class on the character counter to notify the user they are
    //   over the limit
    // });
//});
