import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";
import { getHorizontalMoves, getVerticalMoves } from "./common_moves";

function getValidRookMoves(board: ChessBoard, piece: Piece): Position[] {
  const horizontalMoves = getHorizontalMoves(board, piece);
  const verticalMoves = getVerticalMoves(board, piece);

  return horizontalMoves.concat(verticalMoves);
}

export { getValidRookMoves };
