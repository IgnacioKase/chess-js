import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";
import { getDiagonalMoves } from "./common_moves";

function getValidBishopMoves(board: ChessBoard, piece: Piece): Position[] {
  return getDiagonalMoves(board, piece);
}

export { getValidBishopMoves };
