var BOARD_SIZE = 600;
var BOX_SIZE = BOARD_SIZE / 8;
var PIECE_SIZE = BOX_SIZE * 0.6;

// var whiteChessPieces = createMultiplePiece("pawn", true);
// var blackChessPieces = createMultiplePiece("pawn", false);

var chessPieces = createAllPieces();
var removedPieces = [];
