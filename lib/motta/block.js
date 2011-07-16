"use strict"
var motta = motta || {};

motta.block = function (position) {
  var api = {}, data = {};

  function constructor(position) {
    data.position = position;
  }

  api.neighbours = {};
  api.neighbour = {};
  
  api.neighbours.north = function () {
    return motta.block(data.position.add(0, 1));
  };

  api.neighbours.south = function () {
    return motta.block(data.position.add(0, -1));
  };

  api.neighbours.east = function () {
    return motta.block(data.position.add(1, 0));
  };

  api.neighbours.west = function () {
    return motta.block(data.position.add(-1, 0));
  };

  api.neighbours.within = function (these) {
    return $.map(these, function (moves) {
      return api.neighbour.at(moves);
    });
  };

  api.neighbour.at = function (these) {
    var current = api;

    $.each(these, function(i, move) {
      current = current.neighbours[move]();
    });

    return current;
  };

  api.toString = function () {
    return "(block at "+ data.position.toString() +")";
  };

  api.equals = function (otherBlock) {
    return otherBlock.position().equals(api.position());
  };
  
  api.position = function () { return data.position; };

  api.notIn = function (listOfBlocks) {
    return 0 === $.grep(listOfBlocks, function (b) {
      return b.equals(api);
    }).length;
  };

  constructor(position);

  return api;
};
