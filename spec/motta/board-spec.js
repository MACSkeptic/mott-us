module("board");

function $pos(specs) { return motta.position(specs); }

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
  ok(board.cellAt(1, 0).empty());
  ok(board.cellAt(0, 1).empty());
  ok(board.cellAt(1, 1).empty());
});
