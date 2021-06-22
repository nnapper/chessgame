function convertBoard2Xy(p) {
  return (p + 0.5) * global.BOX_SIZE;
}

function convertXy2Board(xy) {
  return Math.floor(xy / global.BOX_SIZE);
}

function getMouseBoardCoords() {
  console.log("X,Y", mouseX, mouseY);
  var bx1 = convertXy2Board(mouseX);
  var by1 = convertXy2Board(mouseY);
  console.log("BOARD", bx1, by1);
  if (bx1 < 8 && by1 < 8) return { bx: bx1, by: by1 };
  return null;
}

function createPiece(type, bx, by, isWhite) {
  var color = isWhite ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";

  return {
    bx,
    by,
    white: isWhite,
    s: global.PIECE_SIZE,
    type,
    holding: false,
    xfn: function () {
      return convertBoard2Xy(this.bx);
    },
    yfn: function () {
      return convertBoard2Xy(this.by);
    },
    createPoints: function () {
      return Shape.createPiece(this);
    },
    color,
  };
}

function createAllPieces() {
  var pieces = [];
  var types = ["pawn", "knight", "bishop", "rook", "queen", "king"];

  for (var i = 0; i < types.length; i++) {
    var t = types[i];

    if (t == "pawn") {
      var by = 1;
      for (var j = 0; j < 8; j++) pieces.push(createPiece(t, j, by, false));
      by = 6;
      for (var j = 0; j < 8; j++) pieces.push(createPiece(t, j, by, true));
    } else if (t == "knight") {
      pieces.push(createPiece(t, 1, 0, false));
      pieces.push(createPiece(t, 6, 0, false));

      pieces.push(createPiece(t, 1, 7, true));
      pieces.push(createPiece(t, 6, 7, true));
    } else if (t == "bishop") {
      pieces.push(createPiece(t, 2, 0, false));
      pieces.push(createPiece(t, 5, 0, false));

      pieces.push(createPiece(t, 2, 7, true));
      pieces.push(createPiece(t, 5, 7, true));
    } else if (t == "rook") {
      pieces.push(createPiece(t, 0, 0, false));
      pieces.push(createPiece(t, 7, 0, false));

      pieces.push(createPiece(t, 0, 7, true));
      pieces.push(createPiece(t, 7, 7, true));
    } else if (t == "queen") {
      pieces.push(createPiece(t, 3, 0, false));
      pieces.push(createPiece(t, 3, 7, true));
    } else if (t == "king") {
      pieces.push(createPiece(t, 4, 0, false));
      pieces.push(createPiece(t, 4, 7, true));
    }
  }

  return pieces;
}

function findPiece(coord) {
  var i = findPieceIndex(coord);
  if (i < 0) return null;
  return global.chessPieces[i];
}

function findPieceIndex({ bx, by }) {
  for (var i = 0; i < global.chessPieces.length; i++) {
    if (global.chessPieces[i].bx == bx && global.chessPieces[i].by == by) {
      return i;
    }
  }
  return -1;
}

function giveMeAPieceAt(board, bx, by) {
  var piece = board[by][bx];
  var nameMapping = {
    p: "pawn",
    n: "knight",
    b: "bishop",
    r: "rook",
    q: "queen",
    k: "king",
  };
  var type = nameMapping[piece.toLowerCase()];
  var isWhite = piece === piece.toUpperCase();
  if (type == null) return null;
  return createPiece(type, bx, by, isWhite);
}

function createModelForChessPieces(board) {
  var allPieces = [];
  for (var by = 0; by < 8; by++) {
    for (var bx = 0; bx < 8; bx++) {
      var p = giveMeAPieceAt(board, bx, by);
      if (p != null) {
        allPieces.push(p);
      }
    }
  }
  return allPieces;
}
