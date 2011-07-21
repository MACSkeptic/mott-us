"use strict"
var motta = motta || {};

motta.cell = function (position, contents) {
  var api = {}, data = {};
  data.empty = !contents || contents.empty;
  data.position = position;
  
  api.render = function (container) {
    data.div = $('<div>', {
      'class': 'cell', 
      'data-x':position.x, 
      'data-y':position.y
    }).css('left', 11*position.x).css('top', 11*position.y);
    container.append(data.div);
  };

  api.empty = function () { return !data.contents; };

  api.occupy = function (player) { 
    data.contents = player;
  };

  api.red = function () {
    data.div.css('background-color', 'red');
  };
  api.yellow = function () {
    data.div.css('background-color', 'yellow');
  };
  api.green = function () {
    data.div.css('background-color', 'green');
  };

  return api;
};
