import { ChessBoard } from "./board";
import { getValidBishopMoves } from "./moves/bishop";
import { getValidKingMoves } from "./moves/king";
import { getValidKnightMoves } from "./moves/knight";
import { getValidPawnMoves } from "./moves/pawn";
import { getValidQueenMoves } from "./moves/queen";
import { getValidRookMoves } from "./moves/rook";
import { Piece, Position } from "./piece";
import { PieceType } from "./types";

type getValidMoves = (board: ChessBoard, piece: Piece) => Position[];

const _VALID_MOVES_BY_PIECE = new Map<PieceType, getValidMoves>([
  [PieceType.pawn, getValidPawnMoves],
  [PieceType.rook, getValidRookMoves],
  [PieceType.knight, getValidKnightMoves],
  [PieceType.bishop, getValidBishopMoves],
  [PieceType.queen, getValidQueenMoves],
  [PieceType.king, getValidKingMoves],
]);

function getValidMoves(board: ChessBoard, piece: Piece): Position[] {
  const validMovesGetter = _VALID_MOVES_BY_PIECE.get(piece.type);
  return validMovesGetter ? validMovesGetter(board, piece) : [];
}

export { getValidMoves };
