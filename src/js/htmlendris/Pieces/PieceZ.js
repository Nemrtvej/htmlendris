import {AbstractPiece} from './AbstractPiece.js'
import {EmptySquare} from "/js/htmlendris/Squares/EmptySquare.js";
import {FilledSquare} from "/js/htmlendris/Squares/FilledSquare.js";
import {matrixFromSquares} from "/js/htmlendris/Utils/Matrix.js";

export const PieceZ = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

PieceZ.prototype = Object.create(AbstractPiece.prototype);

PieceZ.prototype.getShape = function(orientation) {
    if (orientation % 2 === 0) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new FilledSquare(this._color), new EmptySquare()],
            [new EmptySquare(),  new FilledSquare(this._color), new FilledSquare(this._color)],
        ]);
    } else {
        return matrixFromSquares([
            [new EmptySquare(),  new FilledSquare(this._color)],
            [new FilledSquare(this._color), new FilledSquare(this._color)],
            [new FilledSquare(this._color), new EmptySquare()],
        ]);
    }
};
