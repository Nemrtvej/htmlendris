
const CanvasRenderer = function(wallCanvas, cols, rows, blockSize) {
    this._wallCanvas = wallCanvas;
    this._blockSize = blockSize;
    this._cols = cols;
    this._rows = rows;

    this._ctx = this._initialize();

    this._NEXT_PIECE_X = 5;
    this._NEXT_PIECE_Y = 5;
    this._NEXT_PIECE_HEIGHT = 20;
    this._NEXT_PIECE_WIDTH = 10;

    this._GENERAL_WIDTH = 50;
    this._GENERAL_HEIGHT = 50;
};

/**
 *
 * @param matrix Matrix
 */
CanvasRenderer.prototype.render = function(matrix) {
    for (let rowIndex = 0; rowIndex < matrix.getRows(); rowIndex++) {
        for (let colIndex = 0; colIndex < matrix.getCols(); colIndex++) {
            matrix.getSquare(rowIndex, colIndex).render(this, colIndex, rowIndex);
        }
    }
};


CanvasRenderer.prototype.drawFilledSquare = function(colIndex, rowIndex) {
    this._ctx.fillStyle = 'red';
    this._ctx.fillRect(colIndex, rowIndex, 1, 1);
}

CanvasRenderer.prototype.drawEmptySquare = function(colIndex, rowIndex) {
    this._ctx.fillStyle = 'blue';
    this._ctx.fillRect(colIndex, rowIndex, 1, 1);
}

CanvasRenderer.prototype.fillGeneralBackground = function() {
    this._ctx.fillStyle = '#00d7d7';
    this._ctx.fillRect(0, 0, this._cols, this._rows);
}

CanvasRenderer.prototype.fillNextPieceBackground = function() {
    return;
    this._ctx.fillStyle = '#000000'
    this._ctx.fillRect(this._NEXT_PIECE_X, this._NEXT_PIECE_Y, this._NEXT_PIECE_WIDTH, this._NEXT_PIECE_HEIGHT);
    //this._ctx.font = '12px serif';
    this._ctx.fillStyle = '#dfdf00';
    this._ctx.fillText("NEXT",  this._NEXT_PIECE_X, this._NEXT_PIECE_Y, this._NEXT_PIECE_WIDTH);
    this._ctx.fillText("PIECE",  this._NEXT_PIECE_X, this._NEXT_PIECE_Y + 12, this._NEXT_PIECE_WIDTH);

};

/**
 *
 * @private
 */
CanvasRenderer.prototype._initialize = function() {

    const ctx = this._wallCanvas.getContext('2d');

    ctx.canvas.width = this._cols * this._blockSize;
    ctx.canvas.height = this._rows * this._blockSize;

    ctx.scale(this._blockSize, this._blockSize);
    // ctx.scale(4, 4);

    return ctx;
};