import { ChessBoard } from "./board";
import { Color, PieceType } from "./types";
import { getValidMoves } from "./moves_map";

type PositionKey = string;

class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  asKey(): PositionKey {
    return `${this.x},${this.y}`;
  }

  translateN(columns: number, rows: number): Position {
    return new Position(this.x + columns, this.y + rows);
  }

  translateByNRow(rows: number): Position {
    return new Position(this.x, this.y + rows);
  }

  translateByNColumn(columns: number): Position {
    return new Position(this.x + columns, this.y);
  }

  isValid(): boolean {
    return this.x >= 0 && this.x <= 7 && this.y >= 0 && this.y <= 7;
  }
}

class Piece {
  type: PieceType;
  color: Color;
  position: Position;

  constructor(type: PieceType, color: Color, position: Position) {
    this.type = type;
    this.color = color;
    this.position = position;
  }

  isValidMove(to: Piece, board: ChessBoard): boolean {
    if (!this._isPositionChangeValid(to, board)) return false;
    if (to.type === PieceType.empty) return true;
    return this.color !== to.color;
  }

  asString(): string {
    return this.color === Color.white ? this.type : this.type.toLowerCase();
  }

  copyToPosition(position: Position): Piece {
    return new Piece(this.type, this.color, position);
  }

  copyAsEmpty(): Piece {
    return new Piece(PieceType.empty, this.color, this.position);
  }

  private _isPositionChangeValid(to: Piece, board: ChessBoard): boolean {
    return getValidMoves(board, this).some(
      (validMove) => validMove.asKey() === to.position.asKey()
    );
  }
}

interface Move {
  from: Piece;
  to: Piece;
}

export { Position, PositionKey, Piece, Move };
