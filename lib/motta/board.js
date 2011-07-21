"use strict"
var motta = motta || {};

motta.board = function (size) {
  var api = {}, data = {};

  function constructor(size) {
    data.cells = [];
    data.size = size;
    for(var i = 0; i < data.size; i++) {
      data.cells[i] = [];
      for(var j = 0; j < data.size; j++) {
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

  api.cellAt = function (row, column) {
    return data.cells[row][column];
  };

  api.occupy = function (row, column, player) {
    api.cellAt(row, column).occupy(player);
  };

  api.occupied = function (row, column) {
    return api.cellAt(row, column).occupied();
  };

  api.occupiedBy = function (row, column, player) {
    return api.cellAt(row, column).occupiedBy(player);
  };

  api.allInside = function (positions) {
    var allInside = true;
    $.each(positions, function (i, position) {
      allInside = allInside && api.isInside(position);
    });
    return allInside;
  };

  api.isInside = function (position) {
    return position.inside(api.min(), api.max());
  };

  api.max = function () {
    return motta.position({x:data.size-1,y:data.size-1});
  };

  api.min = function () { 
    return motta.position({x:0, y:0});
  };

  constructor(size);

  return api;
};
