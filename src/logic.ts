import { ChessBoard } from "./board";
import { Move, Piece, Position } from "./piece";
import { Color, PieceType } from "./types";

const initialOrderedPieceTypes = [
  PieceType.rook,
  PieceType.knight,
  PieceType.bishop,
  PieceType.queen,
  PieceType.king,
  PieceType.bishop,
  PieceType.knight,
  PieceType.rook,
];

class ChessGame {
  private _board: ChessBoard;

  constructor(board: ChessBoard) {
    this._board = board;
    this._populateBoardWithInitialPieces();
    this._board.setOnMoveListener((move) => this.movePiece(move));
  }

  movePiece(move: Move): void {
    if (!move.from.isValidMove(move.to, this._board)) return;
    this._board.setPiece(move.from.copyToPosition(move.to.position));
    this._board.setPiece(move.from.copyAsEmpty());
  }

  private _populateBoardWithInitialPieces(): void {
    for (let i = 0; i < 8; i++) {
      this._setInitialSpecialPieces(i, Color.white);
      this._setInitialSpecialPieces(i, Color.black);
      this._setInitialPawns(i);
    }
  }

  private _setInitialSpecialPieces(columnNumber: number, color: Color): void {
    const type = initialOrderedPieceTypes[columnNumber];
    const rowNumber = color === Color.white ? 0 : 7;
    const position = new Position(columnNumber, rowNumber);
    this._board.setPiece(new Piece(type, color, position));
  }

  private _setInitialPawns(columnNumber: number): void {
    this._board.setPiece(
      new Piece(PieceType.pawn, Color.white, new Position(columnNumber, 1))
    );
    this._board.setPiece(
      new Piece(PieceType.pawn, Color.black, new Position(columnNumber, 6))
    );
  }
}

export { ChessGame };
