import { ChessBoard, Color, Move, PieceType } from "./types";

class ChessGame {
  private _board: ChessBoard;

  constructor(board: ChessBoard) {
    this._board = board;
    this._populateBoardWithInitialPieces();
  }

  start(): void {
    this._board.printBoard();
    this._board.setOnMoveListener((move) => this.movePiece(move));
  }

  movePiece(move: Move): void {
    const piece = this._board.getPiece(move.from);
    this._board.setPiece({ ...piece, position: move.to });
    const emptyPiece = { ...piece, type: PieceType.empty };
    this._board.setPiece(emptyPiece);
    this._board.printBoard();
  }

  private _populateBoardWithInitialPieces(): void {
    const pieces = [
      PieceType.rook,
      PieceType.knight,
      PieceType.bishop,
      PieceType.queen,
      PieceType.king,
      PieceType.bishop,
      PieceType.knight,
      PieceType.rook,
    ];
    for (let i = 0; i < 8; i++) {
      this._board.setPiece({
        type: pieces[i],
        color: Color.white,
        position: { x: i, y: 0 },
      });
      this._board.setPiece({
        type: PieceType.pawn,
        color: Color.white,
        position: { x: i, y: 1 },
      });
      this._board.setPiece({
        type: PieceType.pawn,
        color: Color.black,
        position: { x: i, y: 6 },
      });
      this._board.setPiece({
        type: pieces[i],
        color: Color.black,
        position: { x: i, y: 7 },
      });
    }
  }
}

export { ChessGame };
