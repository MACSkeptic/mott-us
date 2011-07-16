module("piece 4");

function blockAt(x, y) {
  return motta.block( motta.position({x:x, y:y}));
}

test("occupied blocks", function () {
  var occupiedBlocks = motta.piece(4).occupiedBlocks();
  equals(4, occupiedBlocks.length);
  ok(!blockAt(0, 0).notIn(occupiedBlocks)); 
  ok(!blockAt(1, 0).notIn(occupiedBlocks)); 
  ok(!blockAt(0, 1).notIn(occupiedBlocks)); 
  ok(!blockAt(1, 1).notIn(occupiedBlocks)); 
});

test("connector blocks", function () {
  var connectorBlocks = motta.piece(4).connectorBlocks();
  equals(4, connectorBlocks.length);
  ok(!blockAt(-1, -1).notIn(connectorBlocks)); 
  ok(!blockAt(2, 2).notIn(connectorBlocks)); 
  ok(!blockAt(2, -1).notIn(connectorBlocks)); 
  ok(!blockAt(-1, 2).notIn(connectorBlocks)); 
});

test("dead blocks", function () {
  var deadBlocks = motta.piece(4).deadBlocks();
  equals(8, deadBlocks.length);
  ok(!blockAt(1, 2).notIn(deadBlocks)); 
  ok(!blockAt(0, 2).notIn(deadBlocks)); 
  ok(!blockAt(-1, 1).notIn(deadBlocks)); 
  ok(!blockAt(-1, 0).notIn(deadBlocks)); 
  ok(!blockAt(2, 1).notIn(deadBlocks)); 
  ok(!blockAt(2, 0).notIn(deadBlocks)); 
  ok(!blockAt(1, -1).notIn(deadBlocks)); 
  ok(!blockAt(0, -1).notIn(deadBlocks)); 
});

test("clockwise rotation", function () {
  var occupiedBlocks = motta.piece(4).
    rotateClockwise().occupiedBlocks();
  equals(4, occupiedBlocks.length);
  ok(!blockAt(0, 0).notIn(occupiedBlocks)); 
  ok(!blockAt(1, 0).notIn(occupiedBlocks)); 
  ok(!blockAt(0, -1).notIn(occupiedBlocks)); 
  ok(!blockAt(1, -1).notIn(occupiedBlocks)); 
});

test("counterClockwise rotation", function () {
  var occupiedBlocks = motta.piece(4).
    rotateCounterClockwise().occupiedBlocks();
  equals(4, occupiedBlocks.length);
  ok(!blockAt(0, 0).notIn(occupiedBlocks)); 
  ok(!blockAt(0, 1).notIn(occupiedBlocks)); 
  ok(!blockAt(-1, 1).notIn(occupiedBlocks)); 
  ok(!blockAt(-1, 0).notIn(occupiedBlocks)); 
});

test("vertical flip", function () {
  var occupiedBlocks = motta.piece(4).
    flipVertical().occupiedBlocks();
  equals(4, occupiedBlocks.length);
  ok(!blockAt(0, 0).notIn(occupiedBlocks)); 
  ok(!blockAt(0, -1).notIn(occupiedBlocks)); 
  ok(!blockAt(1, -1).notIn(occupiedBlocks)); 
  ok(!blockAt(1, 0).notIn(occupiedBlocks)); 
});

test("horizontal flip", function () {
  var occupiedBlocks = motta.piece(4).
    flipHorizontal().occupiedBlocks();
  equals(4, occupiedBlocks.length);
  ok(!blockAt(0, 0).notIn(occupiedBlocks)); 
  ok(!blockAt(0, 1).notIn(occupiedBlocks)); 
  ok(!blockAt(-1, 1).notIn(occupiedBlocks)); 
  ok(!blockAt(-1, 0).notIn(occupiedBlocks)); 
});
