function isValidPawnMove(bx, by, bx1, by1, isWhite, isCapturing) {
  if (bx1 !== bx && !isCapturing) return false;

  if (isWhite && by1 >= by) return false;
  if (!isWhite && by1 <= by) return false;

  var ySteps = Math.abs(by - by1);
  var xSteps = Math.abs(by - by1);
  if (ySteps > 2) return false;

  if (
    isCapturing &&
    xSteps == 1 &&
    ySteps == 1 &&
    ((isWhite && by > by1) || (!isWhite && by1 > by))
  )
    return true;

  var startingOff = false;
  if (isWhite && by == 6) startingOff = true;
  if (!isWhite && by == 1) startingOff = true;

  if (!startingOff && ySteps > 1) return false;
  return true;
}

function isValidKnightMove(bx, by, bx1, by1, isWhite) {
  var xSteps = Math.abs(bx - bx1);
  var ySteps = Math.abs(by - by1);
  return (xSteps === 2 && ySteps === 1) || (xSteps === 1 && ySteps === 2);
}

function isValidBishopMove(bx, by, bx1, by1) {
  var xSteps = Math.abs(bx - bx1);
  var ySteps = Math.abs(by - by1);
  return xSteps === ySteps;
}

function isValidRookMove(bx, by, bx1, by1) {
  return bx1 === bx || by1 === by;
}

function isValidQueenMove(bx, by, bx1, by1) {
  return (
    isValidBishopMove(bx, by, bx1, by1) || isValidRookMove(bx, by, bx1, by1)
  );
}

function isValidKingMove(bx, by, bx1, by1) {
  var xSteps = Math.abs(bx - bx1);
  var ySteps = Math.abs(by - by1);

  return xSteps < 2 && ySteps < 2;
}

function funcForValidMove(type) {
  if (type == "pawn") {
    return isValidPawnMove;
  } else if (type == "knight") {
    return isValidKnightMove;
  } else if (type == "bishop") {
    return isValidBishopMove;
  } else if (type == "rook") {
    return isValidRookMove;
  } else if (type == "queen") {
    return isValidQueenMove;
  } else if (type == "king") {
    return isValidKingMove;
  }
}

function funcForBlockedMove(type) {
  const alwaysTrue = function () {
    return true;
  };

  if (type == "pawn") {
    return isPawnBlocked;
  } else if (type == "knight") {
    return alwaysTrue;
  } else if (type == "bishop") {
    return isBishopBlocked;
  } else if (type == "rook") {
    return isRookBlocked;
  } else if (type == "queen") {
    return isQueenBlocked;
  } else if (type == "king") {
    return alwaysTrue;
  }
}

function isPawnBlocked(bx, by, bx1, by1) {
  var smaller = findSmaller(by, by1);
  var bigger = findBigger(by, by1);
  var validMove = true;

  if (bx1 == bx) {
    var pieceInFront = findPiece({ bx: bx, by: by1 });
    if (pieceInFront != null) return false;
  }

  // var board = createBoardRepresentation(global.chessPieces);
  // var isThereAPiece = null;

  for (var i = smaller + 1; i < bigger; i++) {
    var otherPiece = findPiece({ bx: bx, by: i });
    if (otherPiece !== null) {
      validMove = false;
    }

    // var isThereAPiece = board[i][bx];
    // if (isThereAPiece !== "_") {
    //   validMove = false;
    // }

    /*
    This is what I wrote, it works, 
    but use the the one above, as it
    would be used more often
    
    isThereAPiece = board[i][bx];
    if (isThereAPiece !== "_") {
      validMove = false;
    }
    */
  }

  return validMove;
}

function isBishopBlocked(bx, by, bx1, by1) {
  var lbx = bx;
  var lby = by;
  var rbx = bx1;
  var rby = by1;
  if (bx1 < bx) {
    lbx = bx1;
    lby = by1;
    rbx = bx;
    rby = by;
  }

  var y = lby;
  for (var x = lbx + 1; x < rbx; x++) {
    if (lby < rby) y++;
    else y--;
    var otherPiece = findPiece({ bx: x, by: y });
    if (otherPiece !== null) {
      return false;
    }
  }
  return true;
}

function isRookBlocked(bx, by, bx1, by1) {
  var validMove = true;

  if (by1 == by) {
    var smaller = findSmaller(bx, bx1);
    var bigger = findBigger(bx, bx1);

    // check left to right
    for (var i = smaller + 1; i < bigger; i++) {
      var otherPiece = findPiece({ bx: i, by: by });
      if (otherPiece !== null) {
        validMove = false;
      }
    }
  } else {
    // check up and down
    var smaller = findSmaller(by, by1);
    var bigger = findBigger(by, by1);

    for (var i = smaller + 1; i < bigger; i++) {
      var otherPiece = findPiece({ bx: bx, by: i });
      if (otherPiece !== null) {
        validMove = false;
      }
    }
  }

  return validMove;
}

function isQueenBlocked(bx, by, bx1, by1) {
  //  var funcToTest = bx != bx1 && by != by1 ? isBishopBlocked : isRookBlocked;
  //  return funcToTest(bx, by, bx1, by1);
  return (bx != bx1 && by != by1 ? isBishopBlocked : isRookBlocked)(
    bx,
    by,
    bx1,
    by1
  );
}
