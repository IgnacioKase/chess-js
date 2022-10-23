import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";
import { MovesGenerator } from "./common_moves";

function getValidRookMoves(board: ChessBoard, piece: Piece): Position[] {
  const movesGenerator = new MovesGenerator(board, piece);
  const horizontalMoves = movesGenerator.getHorizontalMoves();
  const verticalMoves = movesGenerator.getVerticalMoves();

  return horizontalMoves.concat(verticalMoves);
}

export { getValidRookMoves };
