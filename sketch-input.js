function keyPressed() {
  console.log(keyCode);
  switch (keyCode) {
    case _KEYS.UP_ARROW:
      break;
    case _KEYS.DOWN_ARROW:
      break;
  }
}

global.pieceHeld = null;

function mousePressed() {
  if (global.pieceHeld != null) return;

  var coords = getMouseBoardCoords();
  if (coords == null) return;

  var piece = findPiece(coords);
  if (piece != null) {
    global.pieceHeld = piece;
    piece.holding = true;
  }
}

function checkDestBlockedByOwnPiece(coords, white) {
  var p = findPiece(coords);
  if (p == null) {
    // nothing there
    return false;
  }

  if (p.white === white) {
    // global.pieceHeld and dest p are the same color
    return true; //blocking
  }

  return false; //capture
}

function mouseReleased() {
  if (global.pieceHeld == null) return;

  var coords = getMouseBoardCoords();
  if (coords == null) return;
  var isBlockedByOwn = checkDestBlockedByOwnPiece(
    coords,
    global.pieceHeld.white
  );
  var validMove1 = true;

  if (isBlockedByOwn) validMove1 = false;
  else validMove1 = true;

  var isThereAPiece = findPiece(coords) != null;

  var checkValidMoveFunction = funcForValidMove(global.pieceHeld.type);
  var validMove2 = checkValidMoveFunction(
    global.pieceHeld.bx,
    global.pieceHeld.by,
    coords.bx,
    coords.by,
    global.pieceHeld.white,
    isThereAPiece
  );

  var checkNonBlockingFunction = funcForBlockedMove(global.pieceHeld.type);
  var validMove3 = checkNonBlockingFunction(
    global.pieceHeld.bx,
    global.pieceHeld.by,
    coords.bx,
    coords.by,
    global.pieceHeld.white
  );

  var validMove = validMove1 && validMove2 && validMove3;
  console.log("valid move", validMove);
  if (!validMove) {
    global.pieceHeld.holding = false;
    global.pieceHeld = null;
    return;
  }

  var p = findPiece(coords);

  // empty box
  if (p == null) {
    if (
      global.pieceHeld.type == "pawn" &&
      global.pieceHeld.white &&
      coords.by == 0
    )
      global.pieceHeld.type = "queen";
    if (
      global.pieceHeld.type == "pawn" &&
      !global.pieceHeld.white &&
      coords.by == 7
    )
      global.pieceHeld.type = "queen";

    global.pieceHeld.bx = coords.bx;
    global.pieceHeld.by = coords.by;
    global.pieceHeld.holding = false;
    global.pieceHeld = null;
    return;
  }

  // it could be itself
  // is not itself
  if (global.pieceHeld === p || p.white == global.pieceHeld.white) {
    global.pieceHeld.holding = false;
    global.pieceHeld = null;
    return;
  }

  if (
    global.pieceHeld.type == "pawn" &&
    global.pieceHeld.white &&
    coords.by == 0
  )
    global.pieceHeld.type = "queen";
  if (
    global.pieceHeld.type == "pawn" &&
    !global.pieceHeld.white &&
    coords.by == 7
  )
    global.pieceHeld.type = "queen";

  removePiece(p);
  global.pieceHeld.bx = coords.bx;
  global.pieceHeld.by = coords.by;
  global.pieceHeld.holding = false;
  global.pieceHeld = null;
}

function removePiece(piece) {
  var i = findPieceIndex(piece);
  global.chessPieces.splice(i, 1);
}
