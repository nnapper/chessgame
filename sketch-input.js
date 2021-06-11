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
  // if (isValidPawnMove(pawn.bx, pawn.by, bx1, by1, true)) {
  //   pawn.bx = bx1;
  //   pawn.by = by1;
  // }
  // var validMove = isValidRookMove(rook.bx, rook.by, bx1, by1, true);
  // console.log("valid move", validMove);
  // if (validMove) {
  //   rook.bx = bx1;
  //   rook.by = by1;
  // }
}

function mouseReleased() {
  if (pieceHeld == null) return;

  var coords = getMouseBoardCoords();
  if (coords == null) return;
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
  var i = findIndex(piece);
  chessPieces.splice(i, 1);
}
