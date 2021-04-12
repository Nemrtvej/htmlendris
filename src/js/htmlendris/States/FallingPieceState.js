const FallingPieceState = function() {
    this._STEP_DURATION = 1000;
    this._previousTime = 0;
};

FallingPieceState.prototype = Object.create(AbstractState.prototype);

/**
 * @param time double
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 *
 * @returns {StepResult}
 */
FallingPieceState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    if (time - this._previousTime < this._STEP_DURATION) {
        return new StepResult(currentPlayground, this, currentPiece, false);
    } else {
        this._previousTime = time;
    }

    const movedPiece = currentPiece.move(new Point(0, 1));

    if (currentPlayground.playgroundPieceFits(movedPiece)) {
        return new StepResult(currentPlayground, this, movedPiece, true);
    } else {
        return new StepResult(currentPlayground.withPlaygroundPiece(currentPiece), new NewPieceState(time), pieceProvider.getNextPiece(), true);
    }

};


/**
 * @param event
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 * @return {KeyPressResult}
 */
FallingPieceState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {

    const CODE_SPACE_BAR = 32;
    const CODE_ARROW_UP = 38;
    const CODE_ARROW_LEFT = 37;
    const CODE_ARROW_RIGHT = 39;
    const CODE_ARROW_DOWN = 40;

    let knownCodes = [CODE_SPACE_BAR, CODE_ARROW_UP, CODE_ARROW_LEFT, CODE_ARROW_RIGHT, CODE_ARROW_DOWN];

    if (!knownCodes.includes(event.keyCode)) {
        return new KeyPressResult(currentPlayground, this, currentPiece, true, false);
    }

    event.preventDefault();

    try {
        if (event.keyCode === CODE_ARROW_UP) {
            const movedPiece = currentPiece.rotate(1);
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, this, movedPiece, true, false);
            }
        } else if (event.keyCode === CODE_ARROW_LEFT) {
            const movedPiece = currentPiece.move(new Point(-1, 0));
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, this, movedPiece, true, false);
            }
        } else if (event.keyCode === CODE_ARROW_RIGHT) {
            const movedPiece = currentPiece.move(new Point(1, 0));
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, this, movedPiece, true, false);
            }
        } else if (event.keyCode === CODE_ARROW_DOWN) {
            const movedPiece = currentPiece.move(new Point(0, 1));
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, this, movedPiece, true, false);
            }
        } else if (event.keyCode === CODE_SPACE_BAR) {
            const freeFallPieceState = new FreeFallPieceState();
            freeFallPieceState.setRunParameters(currentPlayground, currentPiece, renderer);
            const handler = setInterval(freeFallPieceState.run.bind(freeFallPieceState), 100);
            freeFallPieceState.setHandler(handler);

            setTimeout(freeFallPieceState.run.bind(freeFallPieceState), 10);
            return new KeyPressResult(currentPlayground, freeFallPieceState, currentPiece, true, false);
        }

        return new KeyPressResult(currentPlayground, this, currentPiece, true, false);
    } catch (exception) {
        if (!exception instanceof CollisionException) {
            throw exception;
        }
    }
};