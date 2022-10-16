import { HTMLChessBoard } from "./board";
import { ChessGame } from "./logic";

const htmlBoard = document.getElementById("board") as HTMLTableElement;
const htmlInput = document.getElementById("move") as HTMLInputElement;
const htmlSubmitButton = document.getElementById("submit") as HTMLButtonElement;

const chessBoard = new HTMLChessBoard(htmlBoard, htmlInput, htmlSubmitButton);
const chessGame = new ChessGame(chessBoard);

chessGame.start();
