"use strict"
var motta = motta || {};

motta.pieces = (function () {
  var api = {}, data = {};

  function constructor() {
    data.pieces = [];
    data.pieces[0] = [];
    data.pieces[1] = [ ['north'] ];
    data.pieces[2] = [ ['north'], ['north', 'east'] ];
    data.pieces[3] = [ ['north'], ['north', 'north'] ];
    data.pieces[4] = [ 
      ['north'], 
      ['east'],
      ['north', 'east']
    ];

    for(var i = 0; i < data.pieces.length; i++) {
      api[i] = pieceCreatorFor(data.pieces[i]);
    }
  }

  function pieceCreatorFor(theseMoves) {
    var allMoves = theseMoves;
    return function (initialBlock, coordinates) {
      return $.map(allMoves, function (moves) {
        return initialBlock.neighbour.at(
          $.map(moves, function (move) {
            return coordinates[move];
          })
        );
      });
    };
  }

  constructor();

  return api;
}());
