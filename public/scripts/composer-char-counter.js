  $(document).ready(function() {
    let tArea = $('textarea');
    let counter = $('.counter');
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

