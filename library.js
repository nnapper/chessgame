function drawCharacter(object) {
  var points = object.createPoints();
  var movedPoints = movePoints(points, object);
  stroke(color(object.color));
  strokeWeight(global.boxSize / 2);
  drawShape(movedPoints);
}

function drawMultiLineCharacter(object) {
  var pointsArr = object.createPointsArr();
  pointsArr.forEach((points) => {
    var movedPoints = movePoints(points, object);
    stroke(color(object.color));
    strokeWeight(global.boxSize / 2);
    drawShape(movedPoints);
  });
}

// move; {x: 123, y: 2313}
function movePoints(points, obj) {
  var movedPoints = [];
  var tx = mouseX;
  var ty = mouseY;
  if (!obj.holding) {
    tx = obj.xfn();
    ty = obj.yfn();
  }
  for (var i = 0; i < points.length; i++) {
    movedPoints[i] = {
      x: points[i].x + tx,
      y: points[i].y + ty,
    };
  }
  return movedPoints;
}

function drawShape(points) {
  for (var i = 0; i < points.length; i++) {
    var p1 = points[i];
    var p2 = i == points.length - 1 ? points[0] : points[i + 1];
    line(p1.x, p1.y, p2.x, p2.y);
  }
}

function findSmaller(n1, n2) {
  var smaller = n1 < n2 ? n1 : n2;
  return smaller;
}

function findBigger(n1, n2) {
  var bigger = n1 > n2 ? n1 : n2;
  return bigger;
}

var _KEYS = {
  ESC: 27,
  ENTER: 13,

  W: 87,
  A: 65,
  S: 83,
  D: 68,
  F: 70,
  Q: 81,
  E: 69,
  R: 82,
  T: 84,

  UP_ARROW: 38,
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  SHIFT: 16,
  SLASH: 191,
  PERIOD: 190,
  COMMA: 188,
  APOSTROPHE: 222,

  LEVEL_UP: 67,
};
