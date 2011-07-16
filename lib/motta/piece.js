"use strict"
var motta = motta || {};

motta.piece = function () {
  var api = {}, data = {};

  function constructor() {
    var position = motta.position({x:0,y:0});
    data.mainBlock = motta.block(position);

    data.north = 'north';
    data.south = 'south';
    data.east = 'east';
    data.west = 'west';
  }

  function swap(a, b) {
    var temp = data[a];
    data[a] = data[b];
    data[b] = temp;
  }

  api.rotateClockwise = function () { };
  api.rotateCounterClockwise = function () { };
  api.flipVertical = function () { 
    swap('north', 'south');
    return api;
  };
  api.flipHorizontal = function () {
    swap('east', 'west');
    return api;
  };
  api.occupiedBlocks = function () {
    return [
      data.mainBlock, 
      data.mainBlock.neighbours[data.north](),
      data.mainBlock.
        neighbours[data.north]().
        neighbours[data.east]()
    ];
  };
  api.connectorBlocks = function () { };
  api.deadBlocks = function () { };

  constructor();

  return api;
};
