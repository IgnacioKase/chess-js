import { Piece, PieceType, Position, Color, ChessBoard, Move } from "./types";

function _getPieceStringRepresentation(piece: Piece): string {
  return piece.color === Color.white ? piece.type : piece.type.toLowerCase();
}

type _BoardMatrix = Piece[][];

class HTMLChessBoard implements ChessBoard {
  private _board: _BoardMatrix;
  private _boardElement: HTMLTableElement;
  private _inputElement: HTMLInputElement;
  private _onMoveListener: ((move: Move) => void) | null;

  constructor(
    boardElement: HTMLTableElement,
    inputElement: HTMLInputElement,
    submitButton: HTMLButtonElement
  ) {
    this._board = this._createEmptyBoard();
    this._boardElement = boardElement;
    this._inputElement = inputElement;
    this._onMoveListener = null;
    submitButton.addEventListener("click", this._getPlayerMove.bind(this));
  }

  printBoard(): void {
    this._boardElement.innerHTML = "";
    const row = this._boardElement.insertRow();
    ["", "a", "b", "c", "d", "e", "f", "g", "h"].forEach((letter) => {
      const cell = row.insertCell();
      cell.innerHTML = letter;
    });
    for (let i = 0; i < 8; i++) {
      const row = this._boardElement.insertRow();
      const indexCell = row.insertCell();
      indexCell.innerHTML = `${i + 1}`;
      for (let j = 0; j < 8; j++) {
        const cell = row.insertCell();
        const piece = this._board[i][j];
        cell.innerHTML = _getPieceStringRepresentation(piece);
        cell.style.color = piece.color;
      }
    }
  }

  setPiece(piece: Piece): void {
    this._board[piece.position.y][piece.position.x] = piece;
  }

  getPiece(position: Position): Piece {
    return this._board[position.y][position.x];
  }

  setOnMoveListener(listener: (move: Move) => void): void {
    this._onMoveListener = listener;
  }

  _getPlayerMove(): void {
    const userInput = this._inputElement.value;
    const [from, to] = userInput.toLowerCase().split(" ");
    if (!this._onMoveListener) {
      return;
    }
    this._onMoveListener({
      from: this._getPositionFromUserInput(from),
      to: this._getPositionFromUserInput(to),
    });
  }

  private _createEmptyBoard(): _BoardMatrix {
    const board: _BoardMatrix = [];
    for (let i = 0; i < 8; i++) {
      const row: Piece[] = [];
      for (let j = 0; j < 8; j++) {
        const piece: Piece = {
          type: PieceType.empty,
          color: Color.white,
          position: { x: i, y: j },
        };
        row.push(piece);
      }
      board.push(row);
    }
    return board;
  }

  private _getPositionFromUserInput(userInput: string): Position {
    // User input is in the format "a1", output is {x: 0, y: 0}
    return { x: userInput.charCodeAt(0) - 97, y: parseInt(userInput[1]) - 1 };
  }
}

export { HTMLChessBoard };
