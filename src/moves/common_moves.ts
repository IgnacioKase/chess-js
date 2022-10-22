import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";

function getHorizontalMoves(board: ChessBoard, piece: Piece): Position[] {
  const validMoves: Position[] = [];
  const directions = [-1, 1];
  for (const direction of directions) {
    let position = piece.position.translateByNColumn(direction);
    while (board.isEmpty(position) && position.isValid()) {
      validMoves.push(position);
      position = position.translateByNColumn(direction);
    }
    if (board.isEnemyPiece(position, piece.color)) validMoves.push(position);
  }
  return validMoves;
}

function getVerticalMoves(board: ChessBoard, piece: Piece): Position[] {
  const validMoves: Position[] = [];
  const directions = [-1, 1];
  for (const direction of directions) {
    let position = piece.position.translateByNRow(direction);
    while (board.isEmpty(position) && position.isValid()) {
      validMoves.push(position);
      position = position.translateByNRow(direction);
    }
    if (board.isEnemyPiece(position, piece.color)) validMoves.push(position);
  }
  return validMoves;
}

function getDiagonalMoves(board: ChessBoard, piece: Piece): Position[] {
  const validMoves: Position[] = [];
  const directions = [-1, 1];
  for (const xDirection of directions) {
    for (const yDirection of directions) {
      let position = piece.position.translateN(xDirection, yDirection);
      while (board.isEmpty(position) && position.isValid()) {
        validMoves.push(position);
        position = position.translateN(xDirection, yDirection);
      }
      if (board.isEnemyPiece(position, piece.color)) validMoves.push(position);
    }
  }
  return validMoves;
}

export { getHorizontalMoves, getVerticalMoves, getDiagonalMoves };
