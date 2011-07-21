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

  api.equals = function (otherPosition) {
    return otherPosition.x() == api.x() &&
      otherPosition.y() == api.y();
  };

  api.x = function () { return data.position.x; };
  api.y = function () { return data.position.y; };

  api.inside = function (min, max) {
    return api.x() >= min.x() &&
      api.x() <= max.x() &&
      api.y() >= min.y() &&
      api.y() <= max.y();
  };

  constructor(position);

  return api;
};
