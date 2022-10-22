import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";
import {
  getDiagonalMoves,
  getHorizontalMoves,
  getVerticalMoves,
} from "./common_moves";

function getValidQueenMoves(board: ChessBoard, piece: Piece): Position[] {
  const horizontalMoves = getHorizontalMoves(board, piece);
  const verticalMoves = getVerticalMoves(board, piece);
  const diagonalMoves = getDiagonalMoves(board, piece);

  return horizontalMoves.concat(verticalMoves, diagonalMoves);
}

export { getValidQueenMoves };
