"use strict"
var motta = motta || {};

motta.block = function (position) {
  var api = {}, data = {};

  function constructor(position) {
    data.position = position;
  }

  api.neighbours = {};
  
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

  api.toString = function () {
    return "(block at "+ data.position.toString() +")";
  };

  constructor(position);

  return api;
};
