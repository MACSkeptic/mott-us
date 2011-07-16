"use strict"
var motta = motta || {};

motta.position = function (position) {
  var api = {}, data = {};

  function constructor(position) {
    data.position = position;
  }

  api.add = function (deltaX, deltaY) {
    return motta.position({
      x: data.position.x + deltaX,
      y: data.position.y + deltaY
    });
  };

  api.toString = function () {
    return "[X:"+ data.position.x +
      ", Y:"+ data.position.y +"]";
  };

  constructor(position);

  return api;
};
