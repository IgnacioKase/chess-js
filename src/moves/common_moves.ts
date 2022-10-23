import { ChessBoard } from "../board";
import { Piece, Position, Translation } from "../piece";

class MovesGenerator {
  private _board: ChessBoard;
  private _piece: Piece;

  constructor(board: ChessBoard, piece: Piece) {
    this._board = board;
    this._piece = piece;
  }

  getHorizontalMoves(): Position[] {
    const directions = [-1, 1];
    const translations = this._getTranslationFromDirections(directions, [0]);
    return this._getMovesInTranslations(translations);
  }

  getVerticalMoves(): Position[] {
    const directions = [-1, 1];
    const translations = this._getTranslationFromDirections([0], directions);
    return this._getMovesInTranslations(translations);
  }

  getDiagonalMoves(): Position[] {
    const directions = [-1, 1];
    const translations = this._getTranslationFromDirections(
      directions,
      directions
    );
    return this._getMovesInTranslations(translations);
  }

  getValidMovesFromPositions(positions: Position[]): Position[] {
    const moves: Position[] = [];
    for (const position of positions) {
      if (this._board.isEmpty(position)) moves.push(position);
      if (this._board.isEnemyPiece(position, this._piece.color))
        moves.push(position);
    }
    return moves;
  }

  _getTranslationFromDirections(
    xDirections: number[],
    yDirections: number[]
  ): Translation[] {
    let translations: Translation[] = [];
    for (let xDirection of xDirections)
      for (let yDirection of yDirections)
        translations.push({ x: xDirection, y: yDirection });
    return translations;
  }

  _getMovesInTranslations(translations: Translation[]): Position[] {
    return translations
      .map((translation) => this._getMovesInDirection(translation))
      .flat();
  }

  _getMovesInDirection(translation: Translation): Position[] {
    let moves: Position[] = [];
    let position = this._piece.position.translate(translation);
    for (let move of this._moveUntilBlocked(position, translation))
      moves.push(move);
    return moves;
  }

  *_moveUntilBlocked(
    position: Position,
    translation: Translation
  ): Generator<Position> {
    while (this._board.isEmpty(position) && position.isValid()) {
      yield position;
      position = position.translate(translation);
    }
    if (this._board.isEnemyPiece(position, this._piece.color)) yield position;
  }
}

export { MovesGenerator };
