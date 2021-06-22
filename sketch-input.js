function keyPressed() {
  console.log(keyCode);
  switch (keyCode) {
    case _KEYS.UP_ARROW:
      break;
    case _KEYS.DOWN_ARROW:
      break;
  }
}

var pieceHeld = null;

function mousePressed() {
  if (pieceHeld != null) return;

  var coords = getMouseBoardCoords();
  if (coords == null) return;

  var piece = findPiece(coords);
  if (piece != null) {
    pieceHeld = piece;
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
    // pieceheld and dest p are the same color
    return true; //blocking
  }

  return false; //capture
}

function mouseReleased() {
  if (pieceHeld == null) return;

  var coords = getMouseBoardCoords();
  if (coords == null) return;
  var isBlockedByOwn = checkDestBlockedByOwnPiece(coords, pieceHeld.white);
  var validMove1 = true;

  if (isBlockedByOwn) validMove1 = false;
  else validMove1 = true;

  var checkValidMoveFunction = funcForValidMove(pieceHeld.type);
  var validMove2 = checkValidMoveFunction(
    pieceHeld.bx,
    pieceHeld.by,
    coords.bx,
    coords.by,
    pieceHeld.white
  );

  var checkNonBlockingFunction = funcForBlockedMove(pieceHeld.type);
  var validMove3 = checkNonBlockingFunction(
    pieceHeld.bx,
    pieceHeld.by,
    coords.bx,
    coords.by,
    pieceHeld.white
  );

  var validMove = validMove1 && validMove2 && validMove3;
  console.log("valid move", validMove);
  if (!validMove) {
    pieceHeld.holding = false;
    pieceHeld = null;
    return;
  }

  var p = findPiece(coords);

  // empty box
  if (p == null) {
    if (pieceHeld.type == "pawn" && pieceHeld.white && coords.by == 0)
      pieceHeld.type = "queen";
    if (pieceHeld.type == "pawn" && !pieceHeld.white && coords.by == 7)
      pieceHeld.type = "queen";

    pieceHeld.bx = coords.bx;
    pieceHeld.by = coords.by;
    pieceHeld.holding = false;
    pieceHeld = null;
    return;
  }

  // it could be itself
  // is not itself
  if (pieceHeld === p || p.white == pieceHeld.white) {
    pieceHeld.holding = false;
    pieceHeld = null;
    return;
  }

  if (pieceHeld.type == "pawn" && pieceHeld.white && coords.by == 0)
    pieceHeld.type = "queen";
  if (pieceHeld.type == "pawn" && !pieceHeld.white && coords.by == 7)
    pieceHeld.type = "queen";

  removePiece(p);
  pieceHeld.bx = coords.bx;
  pieceHeld.by = coords.by;
  pieceHeld.holding = false;
  pieceHeld = null;
}

function removePiece(piece) {
  var i = findPieceIndex(piece);
  global.chessPieces.splice(i, 1);
}
