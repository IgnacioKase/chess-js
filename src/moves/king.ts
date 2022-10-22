import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";

function getValidKingMoves(board: ChessBoard, piece: Piece): Position[] {
  const moves: Position[] = [];
  const { x, y } = piece.position;

  const positions = [
    new Position(x - 1, y - 1),
    new Position(x - 1, y),
    new Position(x - 1, y + 1),
    new Position(x, y - 1),
    new Position(x, y + 1),
    new Position(x + 1, y - 1),
    new Position(x + 1, y),
    new Position(x + 1, y + 1),
  ].filter((p) => p.isValid());

  for (const position of positions) {
    if (board.isEmpty(position)) moves.push(position);
    if (board.isEnemyPiece(position, piece.color)) moves.push(position);
  }

  return moves;
}

export { getValidKingMoves };
