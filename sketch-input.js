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
  if (global.GAME_OVER) return;
  if (global.pieceHeld != null) return;

  // not holding piece
  var coords = getMouseBoardCoords();
  if (coords == null) return;

  var piece = findPiece(coords);
  if (piece != null) {
    if (global.isWhiteTurn) {
      if (!piece.white) return;
      else global.isWhiteTurn = false;
    }

    if (
      global.previousPlace != null &&
      piece.white == global.previousPlace.white
    )
      return;

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
  if (coords.bx != 6 || coords.bx != 3 || coords.by != 0 || coords.y != 7)
    return false;
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

function checkForEnPassent(coords) {
  var pawn1 = global.lastPieceMoved;
  var pawn1b = global.previousPlace;
  var pawn2 = global.pieceHeld;
  if (pawn1 == null) return false;
  if (pawn1.white) {
    if (pawn1.by != 4) return false;
  } else {
    if (pawn1.by != 3) return false;
  }
  if (pawn1.type != "pawn" && pawn2.type != "pawn") return false;
  if (Math.abs(pawn1.by - pawn1b.by) != 2) return false;
  if (pawn2.by != pawn1.by) return false;
  if (Math.abs(pawn2.bx - pawn1.bx) != 1) return false;
  if (coords.bx != pawn1.bx) return false;
  if (pawn1.white) {
    if (coords.by != pawn1.by + 1) return false;
  } else {
    if (coords.by != pawn1.by - 1) return false;
  }

  removePiece(pawn1);
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
    if (global.isWhiteTurn) {
      global.isWhiteTurn = false;
    } else {
      global.isWhiteTurn = true;
    }
    return;
  }

  var enPassant = checkForEnPassent(coords);
  if (enPassant) {
    var pawn = global.pieceHeld;
    pawn.bx = coords.bx;
    pawn.by = coords.by;
    pawn.holding = false;
    global.pieceHeld = null;
    if (global.isWhiteTurn) {
      global.isWhiteTurn = false;
    } else {
      global.isWhiteTurn = true;
    }
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
  global.lastPieceMoved = global.pieceHeld;
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

    global.previousPlace = {
      bx: global.pieceHeld.bx,
      by: global.pieceHeld.by,
      white: global.pieceHeld.white,
      type: global.pieceHeld.type,
    };
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

  if (p.type == "king" && p.white != global.pieceHeld.white) {
    if (global.pieceHeld.white) {
      global.WHITE_WINS++;
      global.GAME_OVER = true;
    } else {
      global.BLACK_WINS++;
      global.GAME_OVER = true;
    }
  }

  global.previousPlace = {
    bx: global.pieceHeld.bx,
    by: global.pieceHeld.by,
    white: global.pieceHeld.white,
    type: global.pieceHeld.type,
  };
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
