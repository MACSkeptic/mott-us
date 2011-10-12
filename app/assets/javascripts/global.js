var _TW$ = _TW$ || {};

_TW$.notice = function (selector) {
  var api = {}, data = {};

  function element() { return $(selector); }
  function createCloser() { return $("<a>Close</a>").attr({'class':'close', 'href': '#'}); }


  function initialize() {
    if ($.trim(element().html()) == '' ) { return; }
    element().css({cursor: "pointer"});

    var closer = createCloser();

    element().append(closer).css({left: document.width / 2 - element().width() / 2}).fadeIn('slow');

    closer.unbind('click').click(function () {
      $($(this).parent()).fadeOut('slow', function () {
        $(this).remove();
      })
    });
  }

  $(initialize);

  return api;
};

