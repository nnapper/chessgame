function setup() {
  createCanvas(global.BOARD_SIZE, global.BOARD_SIZE);
}

function draw() {
  background(115, 86, 20);
  drawBoard();
  drawPieces();

  updateModel();
}

function updateModel() {}
