import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";
import { Color } from "../types";

function getValidPawnMoves(board: ChessBoard, piece: Piece): Position[] {
  const validMoves: Position[] = [];
  const direction = piece.color === Color.white ? 1 : -1;
  const forwardPosition = piece.position.translateByNRow(direction);
  const doubleForwaredPosition = piece.position.translateByNRow(direction * 2);
  const attackLeftPosition = forwardPosition.translateByNColumn(-1);
  const attackRightPosition = forwardPosition.translateByNColumn(1);

  if (board.isEnemyPiece(attackLeftPosition, piece.color))
    validMoves.push(attackLeftPosition);
  if (board.isEnemyPiece(attackRightPosition, piece.color))
    validMoves.push(attackRightPosition);

  if (!board.isEmpty(forwardPosition)) return validMoves;
  validMoves.push(forwardPosition);

  // the double jump is only valid if the simple jump is valid (i.e: the forwardPosition is empty)
  if (board.isEmpty(doubleForwaredPosition) && _isPawnOnInitialPosition(piece))
    validMoves.push(doubleForwaredPosition);

  return validMoves;
}

function _isPawnOnInitialPosition(piece: Piece): boolean {
  return piece.position.y === 1 || piece.position.y === 6;
}

export { getValidPawnMoves };
