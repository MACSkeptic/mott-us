var motta = motta || {};
motta.player = function (specs) {
  var api = {}, data = {};

  function constructor(specs) {
    data.name = specs.name;
    data.color = specs.color;
  }

  api.name = function () { return data.name; };
  api.color = function () { return data.color; };

  constructor(specs);

  return api;
};
