function isValidPawnMove(bx, by, bx1, by1, isWhite) {
  if (bx1 !== bx) return false;

  if (isWhite && by1 >= by) return false;
  if (!isWhite && by1 <= by) return false;

  var steps = Math.abs(by - by1);
  if (steps > 2) return false;

  var startingOff = false;
  if (isWhite && by == 6) startingOff = true;
  if (!isWhite && by == 1) startingOff = true;

  if (!startingOff && steps > 1) return false;
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
  if (type == "pawn") {
    return isPawnBlocked;
  } else if (type == "knight") {
    return function () {
      return false;
    };
  } else if (type == "bishop") {
    return true;
  } else if (type == "rook") {
    return true;
  } else if (type == "queen") {
    return true;
  } else if (type == "king") {
    return true;
  }
}

function isPawnBlocked(bx, by, bx1, by1) {
  var validMove = true;
  var coords = {
    bx: 1,
    by: 1,
  };
  var p = findPiece(coords);

  if (pieceHeld.by === 2) {
    pieceHeld.holding = false;
    pieceHeld = null;
    validMove = false;
  }

  return validMove;
}

function isBishopBlocked(newCoords, piece) {
  return true;
}
