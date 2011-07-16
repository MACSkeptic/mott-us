"use strict"
var motta = motta || {};

motta.piece = function (index) {
  var api = {}, data = {};

  function constructor(index) {
    var position = motta.position({x:0,y:0});
    data.mainBlock = motta.block(position);
    data.index = index || 0;
    data.coordinates = {};
    data.coordinates.north = 'north';
    data.coordinates.south = 'south';
    data.coordinates.east = 'east';
    data.coordinates.west = 'west';
  }

  function swap(a, b) {
    var temp = data.coordinates[a];
    data.coordinates[a] = data.coordinates[b];
    data.coordinates[b] = temp;
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
    return $.map([
      data.mainBlock, 
      motta.pieces[index](
        data.mainBlock, data.coordinates
      )
    ], function(e) { return e; } );
  };
  api.connectorBlocks = function () { };
  api.deadBlocks = function () {
    var occupiedBlocks = api.occupiedBlocks(),
        deadBlocksRaw = 
        $.map(occupiedBlocks, function (block) {
          return [
            block.neighbours[data.coordinates.north](),
            block.neighbours[data.coordinates.south](),
            block.neighbours[data.coordinates.east](),
            block.neighbours[data.coordinates.west]()
          ];
        });

    return $.grep(deadBlocksRaw, function (block) {
      return 0 === $.grep(occupiedBlocks, 
        function (occupied){
          return occupied.equals(block);
        }
      ).length;
    });
  };

  constructor(index);

  return api;
};
