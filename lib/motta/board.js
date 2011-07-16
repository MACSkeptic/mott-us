"use strict"
var motta = motta || {};

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
      $.each(row, function (j, cell) {
        cell.render(container);
      });
    }); 
  };

  constructor(size);

  return api;
};
