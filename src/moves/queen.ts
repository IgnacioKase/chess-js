import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";
import { MovesGenerator } from "./common_moves";

function getValidQueenMoves(board: ChessBoard, piece: Piece): Position[] {
  const movesGenerator = new MovesGenerator(board, piece);
  const horizontalMoves = movesGenerator.getHorizontalMoves();
  const verticalMoves = movesGenerator.getVerticalMoves();
  const diagonalMoves = movesGenerator.getDiagonalMoves();

  return horizontalMoves.concat(verticalMoves, diagonalMoves);
}

export { getValidQueenMoves };
