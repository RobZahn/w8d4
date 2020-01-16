let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () { 
  // return [...Array(8)].map(e => Array(8)); //what is the ...
  const grid = new Array(8).fill(null).map( x => new Array(8).fill(null))
  // const grid = [];
  // for (let i = 0; i < 8; i++) {
  //   grid.push(new Array(8));
  // }
  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');
  return grid;
  // Array.new(6).map do |x|
  //   Array.new(6)
}



/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) { //can we do x,y = pos like we do in ruby? [x][y]
  const x = pos[0]
  const y = pos[1]
  
  return this.grid[x][y]
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};


/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  // debugger
  if (this.isOccupied(pos)) {
    return this.getPiece(pos).color === color;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return this.getPiece(pos) !== null;
  
};
/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  //use hasmove? on both playrs, how are we going to check both players
  // do we use this?
  
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0];
  let y = pos[1];
  if ((x > 7 || x < 0) || (y > 7 || y < 0)) {
    return false;
  } else {
    return true;
  }
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) { 
    
    const nextMove = [pos[0] + dir[0], pos[1] + dir[1]]; 
    if(!board.isValidPos(nextMove)){
      return null;
    } else if(!board.isOccupied(nextMove)) {
      return null;
    } else if(board.isMine(nextMove, color)) {
      return piecesToFlip;
    } else {
      piecesToFlip.push(nextMove); 
      return _positionsToFlip(board, nextMove, color, dir, piecesToFlip);
    }
  }

// //   isvalidpos = checks whether position is valid
// //   isOccupied = T/F is it empty?
// //   isMine = T/F is it the same color as my color?
// // }     
// //                                         we want to stop moving to our left until we hit our own color or empty space
// //                                         as we are moving we want to add the next pos to our piecesToFlip only if its an opp color
//     0   1    2    3   4     5    6    7       queue = [  [3,5]  ]
// 0["_", "_", "_", "_", "_", "_", "_", "_"]     
// 1["_", "_", "_", "_", "_", "_", "_", "_"]
// 2["_", "_", "_", "_", "_", "_", "_", "_"]     currentpos = [3,5]
// 3["_", "_", "_", "W", "B", "_", "_", "_"]     moving [0,-1] ==== dir
// 4["_", "_", "_", "B", "W", "_", "_", "_"]     trying to get to 3,4 and we need to check if its oppCOLOR
// 5["_", "_", "_", "_", "_", "_", "_", "_"]
// 6["_", "_", "_", "_", "_", "_", "_", "_"]
// 7["_", "_", "_", "_", "_", "_", "_", "_"]




/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {

};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  
  console.log(this.grid)
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */

Board.prototype.validMove = function (pos, color) {
  // debugger
  if (this.isOccupied(pos)) {
    return false;
  } 
    for (let i = 0; i < Board.DIRS.length; i++) {
      if(_positionsToFlip(this, pos, color, Board.DIRS[i],[])) {
          return true
      }
  }
  return false
}

Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  }

  for (let i = 0; i < Board.DIRS.length; i++) {
    const piecesToFlip =
      _positionsToFlip(this, pos, color, Board.DIRS[i]); ??where is the array in here?
    if (piecesToFlip) {
      return true;
    }
  }

  return false;
};


 

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

module.exports = Board;
