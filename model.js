// const global = {
//   BOARD_SIZE: 600,
//   BOX_SIZE: this.BOARD_SIZE / 8,
//   PIECE_SIZE: this.BOX_SIZE * 0.6,

//   chessPieces: [], // createAllPieces()
//   removedPieces: [],
// };

var DEFAULT_POSITIONS = [
  "rnbqkbnr",
  "pppppppp",
  "________",
  "________",
  "________",
  "________",
  "PPPPPPPP",
  "RNBQKBNR",
];

const global = (function () {
  const boardSize = 800;
  const boxSize = boardSize / 8;
  const pieceSize = boxSize * 0.6;

  return {
    BOARD_SIZE: boardSize,
    BOX_SIZE: boxSize,
    PIECE_SIZE: pieceSize,
    pieceHeld: null,

    chessPieces: [], //createModelForChessPieces(DEFAULT_POSITIONS),
    removedPieces: [],
  };
})();
