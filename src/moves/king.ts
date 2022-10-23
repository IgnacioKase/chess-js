import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";
import { MovesGenerator } from "./common_moves";

function getValidKingMoves(board: ChessBoard, piece: Piece): Position[] {
  const movesGenerator = new MovesGenerator(board, piece);
  const positions = _getPossibleKingMoves(piece);
  return movesGenerator.getValidMovesFromPositions(positions);
}

function _getPossibleKingMoves(piece: Piece): Position[] {
  const { x, y } = piece.position;

  return [
    new Position(x - 1, y - 1),
    new Position(x - 1, y),
    new Position(x - 1, y + 1),
    new Position(x, y - 1),
    new Position(x, y + 1),
    new Position(x + 1, y - 1),
    new Position(x + 1, y),
    new Position(x + 1, y + 1),
  ].filter((p) => p.isValid());
}

export { getValidKingMoves };
