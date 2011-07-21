module("board");

function $pos(specs) { return motta.position(specs); }
function $pla(color) { 
  return motta.player({
    'name': 'Name of ' + color,
    'color': color
  }); 
}
function $c(row, column) {
  return motta.cell( motta.position({x:row, y:column}));
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

test("all occupied", function () {
  var board = motta.board(2),
      red = $pla('red'),
      blue = $pla('blue'),
      yellow = $pla('yellow');

  board.occupy(1, 1, red);
  board.occupy(0, 0, red);
  board.occupy(1, 0, blue);

  equals(3, board.allOccupied().length);
  ok(board.allOccupied()[0].equals($c(0, 0)));
  ok(board.allOccupied()[1].equals($c(1, 0)));
  ok(board.allOccupied()[2].equals($c(1, 1)));
});

test("all occupied by", function () {
  var board = motta.board(2),
      red = $pla('red'),
      blue = $pla('blue'),
      yellow = $pla('yellow');

  board.occupy(1, 1, red);
  board.occupy(0, 0, red);
  board.occupy(1, 0, blue);

  equals(2, board.allOccupiedBy(red).length);
  ok(board.allOccupiedBy(red)[0].equals($c(0,0)));
  ok(board.allOccupiedBy(red)[1].equals($c(1,1)));

  equals(1, board.allOccupiedBy(blue).length);
  ok(board.allOccupiedBy(blue)[0].equals($c(1,0)));

  equals(0, board.allOccupiedBy(yellow).length);
});
