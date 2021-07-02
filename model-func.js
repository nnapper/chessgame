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
    movedYet: false,
    xfn: function () {
      return convertBoard2Xy(this.bx);
    },
    yfn: function () {
      return convertBoard2Xy(this.by);
    },
    createPoints: function () {
      return Shape.createPiece(this);
    },
    createPointsArr: function () {
      var shapes = [Shape.createPiece(this)];

      for (var i = this.s; i > 0; i -= 10) {
        var tri = Shape.createTriangle({ s: i });
        shapes.push(tri);
      }
      return shapes;
    },
    color,
  };
}

function findPieceByBxBy(bx, by) {
  return findPiece({ bx: bx, by: by });
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
