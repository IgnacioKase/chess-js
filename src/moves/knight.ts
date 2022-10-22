import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";

function getValidKnightMoves(board: ChessBoard, piece: Piece): Position[] {
  const moves: Position[] = [];
  const { x, y } = piece.position;

  const positions = [
    new Position(x - 2, y - 1),
    new Position(x - 2, y + 1),
    new Position(x - 1, y - 2),
    new Position(x - 1, y + 2),
    new Position(x + 1, y - 2),
    new Position(x + 1, y + 2),
    new Position(x + 2, y - 1),
    new Position(x + 2, y + 1),
  ].filter((p) => p.isValid());

  for (const position of positions) {
    if (board.isEmpty(position)) moves.push(position);
    if (board.isEnemyPiece(position, piece.color)) moves.push(position);
  }

  return moves;
}

export { getValidKnightMoves };
