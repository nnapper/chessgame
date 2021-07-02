const Shape = {
  createPiece(piece) {
    var funcMap = {
      pawn: this.createPawn,
      knight: this.createKnight,
      bishop: this.createBishop,
      rook: this.createRook,
      queen: this.createQueen,
      king: this.createKing,
    };
    // var func = this.createPawn;
    // if (type === "pawn") func = this.createPawn;
    // else if (type === "knight") func = this.createKnight;
    // else if (type === "bishop") func = this.createBishop;
    // else if (type === "rook") func = this.createRook;
    // else if (type === "queen") func = this.createQueen;
    // else if (type === "king") func = this.createKing;
    return funcMap[piece.type](piece);
  },

  createTriangle: function ({ s }) {
    var a = s / 8;
    return [
      // top
      { x: 0, y: -a },
      { x: a, y: a },
      { x: -a, y: a },
    ];
  },

  createPawn: function ({ s }) {
    var a = s / 2;
    return [
      // top
      { x: 0, y: -a * 0.6 },
      { x: a / 2, y: (-a / 2) * 0.6 },

      // bottom
      { x: a / 4, y: a / 8 }, // point 3
      { x: a, y: a },
      { x: -a, y: a },
      { x: -a / 4, y: a / 8 },
      { x: -a / 2, y: (-a / 2) * 0.6 },
    ];
  },

  createKnight: function ({ s }) {
    var a = s / 2;
    return [
      // top
      { x: -a * 0.5, y: -a },
      { x: a / 2, y: -a * 0.9 },
      { x: a * 0.8, y: -a * 0.6 },

      // bottom
      { x: a, y: a / 8 },
      { x: a / 2, y: -a * 0.2 },
      { x: a / 4, y: a / 8 },
      { x: a, y: a },
      { x: -a, y: a },
      { x: -a / 4, y: a * 0.15 },
      { x: -a * 0.7, y: -a * 0.15 },
    ];
  },

  createBishop: function ({ s }) {
    var a = s / 2;
    return [
      // top
      { x: 0, y: -a },
      { x: a * 0.6, y: -a / 2 },

      // bottom
      { x: a * 0.7, y: a / 8 }, // point 3
      { x: a / 4, y: a / 8 },
      { x: a, y: a },
      { x: -a, y: a },
      { x: -a / 4, y: a / 8 },
      { x: -a * 0.7, y: a / 8 },
      { x: -a * 0.6, y: -a / 2 },
    ];
  },

  createRook: function ({ s }) {
    var a = s / 2;
    return [
      // top
      { x: -a * 0.85, y: -a },
      { x: -a * 0.6, y: -a },
      { x: -a * 0.6, y: -a / 2 }, // dip
      { x: -a * 0.3, y: -a / 2 }, // dip
      { x: -a * 0.3, y: -a },
      { x: a * 0.3, y: -a },
      { x: a * 0.3, y: -a / 2 }, // dip
      { x: a * 0.6, y: -a / 2 }, // dip
      { x: a * 0.6, y: -a },
      { x: a * 0.85, y: -a },

      // bottom
      { x: a, y: a / 8 }, // point 11
      { x: a / 4, y: a / 8 },
      { x: a, y: a },
      { x: -a, y: a },
      { x: -a / 4, y: a / 8 },
      { x: -a, y: a / 8 },
    ];
  },

  createQueen: function ({ s }) {
    var a = s / 2;
    return [
      // top
      { x: -a * 0.9, y: -a },
      { x: -a * 0.2, y: -a / 2 }, // dip
      { x: 0, y: -a },
      { x: a * 0.2, y: -a / 2 }, // dip
      { x: a * 0.9, y: -a },
      { x: a * 0.9, y: -a },

      // bottom
      { x: a * 0.5, y: a / 8 }, // point 11
      { x: a / 4, y: a / 8 },
      { x: a, y: a },
      { x: -a, y: a },
      { x: -a / 4, y: a / 8 },
      { x: -a * 0.5, y: a / 8 },
    ];
  },

  createKing: function ({ s }) {
    var a = s / 2;
    return [
      // top
      { x: -a * 0.7, y: -a * 0.5 * 0.5 },
      { x: -a * 0.2, y: (-a / 2) * 0.45 },

      { x: -a * 0.2, y: -a * 0.8 * 0.7 },

      { x: -a * 0.6, y: -a * 0.8 * 0.7 },
      { x: -a * 0.6, y: (-a - 0.1 * a) * 0.7 },
      { x: -a * 0.2, y: (-a - 0.1 * a) * 0.7 },

      { x: -a * 0.2, y: (-a - 0.4 * a) * 0.8 },
      { x: a * 0.2, y: (-a - 0.4 * a) * 0.8 },

      { x: a * 0.2, y: (-a - 0.1 * a) * 0.7 },
      { x: a * 0.6, y: (-a - 0.1 * a) * 0.7 },
      { x: a * 0.6, y: -a * 0.8 * 0.7 },

      { x: a * 0.2, y: -a * 0.8 * 0.7 },

      { x: a * 0.2, y: (-a / 2) * 0.5 },
      { x: a * 0.7, y: -a * 0.5 * 0.5 },

      // bottom
      { x: a / 4, y: a / 8 }, // point 11
      { x: a / 4, y: a / 8 },
      { x: a, y: a },
      { x: -a, y: a },
      { x: -a / 4, y: a / 8 },
      { x: -a / 4, y: a / 8 },
    ];
  },
};
