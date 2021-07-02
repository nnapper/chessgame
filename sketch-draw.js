function drawBoard() {
  stroke(158, 157, 153);
  for (var i = 0; i < 8; i++) {
    drawBoardRow(i);
  }
}

function drawBoardRow(rowNumber) {
  var i = rowNumber % 2 == 0 ? 0 : 1;

  for (; i < 8; i += 2) {
    fill(158, 157, 153);
    square(i * global.BOX_SIZE, rowNumber * global.BOX_SIZE, global.BOX_SIZE);
  }
}

function drawPieces() {
  for (var i = 0; i < global.chessPieces.length; i++) {
    drawMultiLineCharacter(global.chessPieces[i]);
  }
}
