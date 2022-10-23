import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";
import { MovesGenerator } from "./common_moves";

function getValidKnightMoves(board: ChessBoard, piece: Piece): Position[] {
  const movesGenerator = new MovesGenerator(board, piece);
  const positions = _getPossibleKnightMoves(piece);
  return movesGenerator.getValidMovesFromPositions(positions);
}

function _getPossibleKnightMoves(piece: Piece): Position[] {
  const { x, y } = piece.position;

  return [
    new Position(x - 2, y - 1),
    new Position(x - 2, y + 1),
    new Position(x - 1, y - 2),
    new Position(x - 1, y + 2),
    new Position(x + 1, y - 2),
    new Position(x + 1, y + 2),
    new Position(x + 2, y - 1),
    new Position(x + 2, y + 1),
  ].filter((p) => p.isValid());
}

export { getValidKnightMoves };
