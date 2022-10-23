import { ChessBoard } from "../board";
import { Piece, Position } from "../piece";
import { MovesGenerator } from "./common_moves";

function getValidBishopMoves(board: ChessBoard, piece: Piece): Position[] {
  return new MovesGenerator(board, piece).getDiagonalMoves();
}

export { getValidBishopMoves };
