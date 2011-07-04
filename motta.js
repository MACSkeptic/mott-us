"use strict"

var motta = {};

motta.cell = function (position, contents) {
  var api = {}, data = {};
  data.empty = !contents || contents.empty;
  data.position = position;
  
  api.render = function (container) {
    var div = $('<div>', {'class': 'cell', 'data-x':position.x, 'data-y':position.y}).
      css('left', 13*position.x).css('top', 13*position.y);
    container.append(div);
  };

  return api;
};

motta.board = function (size) {
  var api = {}, data = {};

  function constructor(size) {
    data.cells = [];
    for(var i = 0; i < size; i++) {
      data.cells[i] = [];
      for(var j = 0; j < size; j++) {
        data.cells[i].push(motta.cell({x:i, y:j}));
      }
    }
  }

  api.render = function (container) {
    $.each(data.cells, function (i, row) {
      $.each(row, function (i, cell) {
        cell.render(container);
      });
    }); 
  };

  constructor(size);

  return api;
};
