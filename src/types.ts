enum PieceType {
  empty = " ",
  rook = "♜",
  knight = "♞",
  bishop = "♝",
  queen = "♛",
  king = "♚",
  pawn = "♟",
}

enum Color {
  white = "white",
  black = "black",
}

interface Position {
  x: number;
  y: number;
}

interface Piece {
  type: PieceType;
  color: Color;
  position: Position;
}

interface ChessBoard {
  printBoard(): void;
  setPiece(piece: Piece): void;
  getPiece(position: Position): Piece;
  setOnMoveListener(listener: (move: Move) => void): void;
}

interface Move {
  from: Position;
  to: Position;
}

export { PieceType, Color, Position, Piece, ChessBoard, Move };
