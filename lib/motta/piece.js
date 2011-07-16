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
  function southeast() { 
    return [data.coordinates.south, data.coordinates.east]; 
  }
  function northwest() { 
    return [data.coordinates.north, data.coordinates.west]; 
  }
  function southwest() { 
    return [data.coordinates.south, data.coordinates.west]; 
  }
  function northeast() { 
    return [data.coordinates.north, data.coordinates.east]; 
  }

  function swap(a, b) {
    var temp = data.coordinates[a];
    data.coordinates[a] = data.coordinates[b];
    data.coordinates[b] = temp;
  }

  api.rotateCounterClockwise = function () {
    var temp = data.coordinates.east;
    data.coordinates.east = data.coordinates.north;
    data.coordinates.north = data.coordinates.west;
    data.coordinates.west = data.coordinates.south;
    data.coordinates.south = temp;
    return api;
  };
  api.rotateClockwise = function () { 
    var temp = data.coordinates.north;
    data.coordinates.north = data.coordinates.east;
    data.coordinates.east = data.coordinates.south;
    data.coordinates.south = data.coordinates.west;
    data.coordinates.west = temp;
    return api;
  };
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

  api.connectorBlocks = function () { 
    var occupiedBlocks = api.occupiedBlocks(),
        deadBlocks = api.deadBlocks(),
        connectorBlocksRaw = $.map(occupiedBlocks,
            function (block) {
              return block.neighbours.within([
                  northeast(), 
                  southeast(), 
                  northwest(), 
                  southwest()
              ]);
            }
        );

    return $.grep(connectorBlocksRaw, function (block) {
      return block.notIn(occupiedBlocks) &&
        block.notIn(deadBlocks);
    });
  };

  api.deadBlocks = function () {
    var occupiedBlocks = api.occupiedBlocks(),
        deadBlocksRaw = $.map(occupiedBlocks, 
          function (block) {
            return block.neighbours.within(
              [north(), south(), east(), west()]
            );
          }
        );

    return $.grep(deadBlocksRaw, function (block) {
      return block.notIn(occupiedBlocks);
    });
  };

  api.on = function (board) {
    var onBoard = {};
    data.board = board;
    onBoard.at = function (x, y) {
      var result = {};
      data.x = x;
      data.y = y;
      $.each(['deadBlocks', 'occupiedBlocks', 'connectorBlocks'], function (i, blockType) {
        result[blockType] = function () {
          return $.map(api[blockType](), function (block) {
            return motta.block(block.position().add(data.x, data.y));
          });
        };
      });
      result.render = function () {
        $.each(result.occupiedBlocks(), function (i, block) {
          data.board.cellAt(block.position().x(), block.position().y()).red();
        });
        $.each(result.deadBlocks(), function (i, block) {
          data.board.cellAt(block.position().x(), block.position().y()).yellow();
        });
        $.each(result.connectorBlocks(), function (i, block) {
          data.board.cellAt(block.position().x(), block.position().y()).green();
        });
      };
      return result;
    };
    return onBoard;
  };

  constructor(index);

  return api;
};
