  $(document).ready(function() {
    let tArea = $('textarea');
    let counter = $('.counter');
    $('.new-tweet').on('keyup', 'textarea', function() {
      tArea.val();
      counter.text(140 - tArea.val().length);

      if (tArea.val().length > 140) {
        counter.addClass('over');
      } else {
        counter.removeClass('over');
      }
    });
  });

