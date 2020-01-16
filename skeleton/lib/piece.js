/**
 * Initializes the Piece with its color.
 */

//constructor fuction : this refers to instance of function class
function Piece (color) {    //this is an intialize righhttttt?
    this.color = color;
    //we need to target the current player
}

/**
 * Returns the color opposite the current piece.
 */
//DarkPiece.oppColor()
Piece.prototype.oppColor = function () { 
    if(this.color === 'black'){
       return 'white'
    }
    else {
        return 'black'
    }
};

/**
 * Changes the piece's color to the opposite color.
 */
Piece.prototype.flip = function () {
    this.color = this.oppColor()    
};

/**
 * Returns a string representation of the string
 * based on its color.
 */
Piece.prototype.toString = function () {
    if (this.color === 'black') {
        return 'B'
    }
    else {
        return 'W'
    }
};

module.exports = Piece;
