"use strict"
var motta = motta || {};

motta.cell = function (position, contents) {
  var api = {}, data = {};
  data.empty = !contents || contents.empty;
  data.position = position;
  
  api.render = function (container) {
    var div = $('<div>', {
      'class': 'cell', 
      'data-x':position.x, 
      'data-y':position.y
    }).css('left', 13*position.x).css('top', 13*position.y);
    container.append(div);
  };

  return api;
};
