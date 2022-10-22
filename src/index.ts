import { HTMLChessBoard } from "./board";
import { ChessGame } from "./logic";

const htmlBoard = document.getElementById("board") as HTMLTableElement;

const chessBoard = new HTMLChessBoard(htmlBoard);
new ChessGame(chessBoard);
