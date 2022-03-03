console.clear();

var $animation_elements = $('.animation-element');
var $window = $(window);

$window.on('scroll resize', check_if_in_view);

$window.trigger('scroll');

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $animation_elements.each(function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    if ((element_bottom_position >= window_top_position) &&
      (element_top_position <= window_bottom_position)) {

      $element.addClass('in-view');

      $audio = $(this).find("audio");
      audio = $audio.get(0);
      if (!$audio.is(":animated") && audio.paused) {
        audio.volume = 0;
        $audio.animate({
          volume: 1
        }, 2000);
        audio.play();
      }

    } else {
      $element.removeClass('in-view');
      $audio = $(this).find("audio");
      audio = $audio.get(0);
      if (!$audio.is(":animated") && !audio.paused) {
        $audio.animate({
          volume: 0
        }, 2000, function() {
          this.pause();
        });
      }
    }
  });
}
