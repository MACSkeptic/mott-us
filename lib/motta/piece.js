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

  function north() { return [data.coordinates.north]; }
  function south() { return [data.coordinates.south]; }
  function east() { return [data.coordinates.east]; }
  function west() { return [data.coordinates.west]; }

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
            block.neighbours[north()[0]](),
            block.neighbours[south()[0]](),
            block.neighbours[east()[0]](),
            block.neighbours[west()[0]]()
          ];
        });

    return $.grep(deadBlocksRaw, function (block) {
      return block.notIn(occupiedBlocks);
    });
  };

  constructor(index);

  return api;
};
