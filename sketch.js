function setup() {
  createCanvas(BOARD_SIZE, BOARD_SIZE);
}

function draw() {
  background(115, 86, 20);
  drawBoard();
  drawPieces();

  updateModel();
}

function updateModel() {}
