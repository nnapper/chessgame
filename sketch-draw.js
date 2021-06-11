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
    square(i * BOX_SIZE, rowNumber * BOX_SIZE, BOX_SIZE);
  }
}

function drawPieces() {
  for (var i = 0; i < chessPieces.length; i++) {
    drawCharacter(chessPieces[i]);
  }
}
