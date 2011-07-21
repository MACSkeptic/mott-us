module("board");

function $pos(specs) { return motta.position(specs); }
function $pla(color) { 
  return motta.player({
    'name': 'Name of ' + color,
    'color': color
  }); 
}

test("all inside", function () {
  var board = motta.board(3);
  
  ok(board.allInside([
    $pos({x:0,y:0}),
    $pos({x:1,y:0}),
    $pos({x:2,y:0}),
    $pos({x:0,y:1}),
    $pos({x:1,y:1}),
    $pos({x:2,y:1}),
    $pos({x:0,y:2}),
    $pos({x:1,y:2}),
    $pos({x:2,y:2})
  ]));
});

test("not all inside", function () {
  var board = motta.board(3);
  
  ok(!board.allInside([
    $pos({x:0,y:0}),
    $pos({x:1,y:0}),
    $pos({x:2,y:0}),
    $pos({x:0,y:1}),
    $pos({x:1,y:3}),
    $pos({x:2,y:1}),
    $pos({x:0,y:2}),
    $pos({x:1,y:2}),
    $pos({x:2,y:2})
  ]));
});

test("occupy", function () {
  var board = motta.board(2);

  ok(board.cellAt(0, 0).empty());
  ok(board.cellAt(1, 0).empty());
  ok(board.cellAt(0, 1).empty());
  ok(board.cellAt(1, 1).empty());

  board.occupy(0, 0, "player one");

  ok(!board.cellAt(0, 0).empty());
  ok(board.occupied(0, 0));
  ok(board.cellAt(1, 0).empty());
  ok(!board.occupied(1, 0));
  ok(board.cellAt(0, 1).empty());
  ok(!board.occupied(0, 1));
  ok(board.cellAt(1, 1).empty());
  ok(!board.occupied(1, 1));
});

test("occupied by", function () {
  var board = motta.board(2),
      red = $pla('red'),
      blue = $pla('blue');

  board.occupy(1, 1, red);

  ok(board.occupiedBy(1, 1, red));
  ok(!board.occupiedBy(1, 1, blue));
  ok(!board.occupiedBy(0, 0, blue));
  ok(!board.occupiedBy(0, 0, red));
});
