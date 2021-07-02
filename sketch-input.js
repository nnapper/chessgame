function keyPressed() {
  console.log(keyCode);
  switch (keyCode) {
    case _KEYS.UP_ARROW:
      break;
    case _KEYS.DOWN_ARROW:
      break;
  }
}

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

function checkForCastling(coords) {
  var king = global.pieceHeld;
  var kingSide = true;
  if (king.type != "king" || king.movedYet) return false;
  if (king.bx > coords.bx) kingSide = false;
  var r = findPieceByBxBy(kingSide ? 7 : 0, king.by);
  if (r == null || r.movedYet || r.type != "rook") return false;

  var smallest = null;
  var biggest = null;
  if (king.bx > r.bx) {
    smallest = r;
    biggest = king;
  } else {
    smallest = king;
    biggest = r;
  }

  for (var i = smallest.bx + 1; i < biggest.bx; i++) {
    var p = findPieceByBxBy(i, king.by);
    if (p) return false;
  }

  return true;
}

function mouseReleased() {
  // not holding piece; do nothing
  if (global.pieceHeld == null) return;

  // destination is outside of the board; do nothing
  var coords = getMouseBoardCoords();
  if (coords == null) return;

  // see if can castling
  var castling = checkForCastling(coords);
  if (castling) {
    var king = global.pieceHeld;

    if (king.bx < coords.bx) {
      // king side
      var r = global.chessPieces.filter(
        (p) => p.type === "rook" && p.bx == 7 && p.by == king.by
      )[0];
      r.bx = 5;
    } else {
      // queen side
      var r = global.chessPieces.filter(
        (p) => p.type === "rook" && p.bx == 0 && p.by == king.by
      )[0];
      r.bx = 3;
    }
    king.bx = coords.bx;
    king.by = coords.by;
    king.holding = false;
    global.pieceHeld = null;
    return;
  }

  // invalid if blocked by own pieces
  var validMove1 = !checkDestBlockedByOwnPiece(coords, global.pieceHeld.white);

  // check if move is valid
  var isThereAPiece = findPiece(coords) != null;
  var validMove2 = funcForValidMove(global.pieceHeld.type)(
    global.pieceHeld.bx,
    global.pieceHeld.by,
    coords.bx,
    coords.by,
    global.pieceHeld.white,
    isThereAPiece
  );

  // check if blocked by other pieces
  var validMove3 = funcForBlockedMove(global.pieceHeld.type)(
    global.pieceHeld.bx,
    global.pieceHeld.by,
    coords.bx,
    coords.by,
    global.pieceHeld.white
  );

  var validMove = validMove1 && validMove2 && validMove3;
  console.log("valid move", validMove);
  // if invalid; release the piece
  if (!validMove) {
    global.pieceHeld.holding = false;
    global.pieceHeld = null;
    return;
  }

  // valid action
  global.pieceHeld.movedYet = true;
  var p = findPiece(coords);
  if (p == null) {
    // making a queen
    if (
      global.pieceHeld.type === "pawn" &&
      ((global.pieceHeld.white && coords.by == 0) ||
        (!global.pieceHeld.white && coords.by == 7))
    ) {
      global.pieceHeld.type = "queen";
    }

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

  // check to promote to queen
  if (
    global.pieceHeld.type === "pawn" &&
    ((global.pieceHeld.white && coords.by == 0) ||
      (!global.pieceHeld.white && coords.by == 7))
  ) {
    global.pieceHeld.type = "queen";
  }

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
