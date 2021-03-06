import {NullPiece} from '/js/htmlendris/Pieces/NullPiece.js';
import {PieceI} from '/js/htmlendris/Pieces/PieceI.js';
import {PieceJ} from '/js/htmlendris/Pieces/PieceJ.js';
import {PieceL} from '/js/htmlendris/Pieces/PieceL.js';
import {PieceO} from '/js/htmlendris/Pieces/PieceO.js';
import {PieceS} from '/js/htmlendris/Pieces/PieceS.js';
import {PieceT} from '/js/htmlendris/Pieces/PieceT.js';
import {PieceZ} from '/js/htmlendris/Pieces/PieceZ.js';
import {PlaygroundPiece} from '/js/htmlendris/Utils/PlaygroundPiece.js';
import {Point} from '/js/htmlendris/Utils/Point.js';

export const PieceProvider = function(playgroundCols, playgroundRows) {
    this._playgroundCols = playgroundCols;
    this._playgroundRows = playgroundRows;
};

PieceProvider.prototype.getNextPiece = function() {
    return new PlaygroundPiece(new Point(Math.floor(this._playgroundCols / 2), 0), this._createNextPiece(), 0);
};
PieceProvider.prototype.getNullPiece = function() {
    return new PlaygroundPiece(new Point(0, 0), new NullPiece(), 0);
};

PieceProvider.prototype._createNextPiece = function() {

    const colors = [];
    colors.push('red');
    colors.push('green');
    colors.push('yellow');
    colors.push('pink');
    colors.push('violet');
    colors.push('white');

    const generators = [];
    generators.push((color) => new PieceI('red'));
    generators.push((color) => new PieceJ('green'));
    generators.push((color) => new PieceL('yellow'));
    generators.push((color) => new PieceO('white'));
    generators.push((color) => new PieceS('pink'));
    generators.push((color) => new PieceT('orange'));
    generators.push((color) => new PieceZ('brown'));

    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    return generators[Math.floor(Math.random() * generators.length)](chosenColor);
};
