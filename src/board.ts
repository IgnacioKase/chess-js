import { Move, Piece, Position, PositionKey } from "./piece";
import { PieceType, Color } from "./types";

const HIGHLIGH_PIECE_CLASS = "highlight-piece";
const HEADER_INDEX_NAMES = ["", "a", "b", "c", "d", "e", "f", "g", "h"];
const BOARD_SIZE = { rows: 8, columns: 8 }; // it doesn't include indexes on the sides

interface ChessBoard {
  setPiece(piece: Piece): void;
  getPiece(position: Position): Piece;
  setOnMoveListener(listener: (move: Move) => void): void;
  isEmpty(position: Position): boolean;
  isEnemyPiece(position: Position, color: Color): boolean;
}

class HTMLChessBoard implements ChessBoard {
  private _onMoveListener: ((move: Move) => void) | null;
  private _htmlBoard: HTMLTableElement;
  private _currentSelectedPiece: Piece | null = null;
  private _piecesByCellId = new Map<string, Piece>();
  private _cellsByPositionKey = new Map<PositionKey, HTMLTableCellElement>();

  constructor(boardElement: HTMLTableElement) {
    this._htmlBoard = boardElement;
    this._piecesByCellId = new Map();
    this._onMoveListener = null;
    this._initializeHtmlBoard();
  }

  setPiece(piece: Piece): void {
    const cell = this._getCellByPosition(piece.position);
    this._setPieceOnCell(cell, piece);
  }

  getPiece(position: Position): Piece {
    if (!position.isValid())
      throw new Error(`Invalid position ${position.asKey()}`);
    const cell = this._getCellByPosition(position);
    return this._getPieceFromCell(cell);
  }

  setOnMoveListener(listener: (move: Move) => void): void {
    this._onMoveListener = listener;
  }

  isEmpty(position: Position): boolean {
    if (!position.isValid()) return false;
    const piece = this.getPiece(position);
    return piece.type === PieceType.empty;
  }

  isEnemyPiece(position: Position, color: Color): boolean {
    if (!position.isValid()) return false;
    const piece = this.getPiece(position);
    if (piece.type === PieceType.empty) return false;
    return piece.color !== color;
  }

  private _getCellByPosition(position: Position): HTMLTableCellElement {
    const cell = this._cellsByPositionKey.get(position.asKey());
    if (cell === undefined)
      throw new Error(`Cell not found, on ${position.asKey()}`);
    return cell;
  }

  private _initializeHtmlBoard(): void {
    this._clearHtmlTable();
    this._insertHeaderRow();
    this._insertBoardRows();
  }

  private _clearHtmlTable(): void {
    this._htmlBoard.innerHTML = "";
  }

  private _insertHeaderRow(): void {
    const header_row = this._htmlBoard.insertRow();
    HEADER_INDEX_NAMES.forEach((index) => {
      const cell = header_row.insertCell();
      cell.innerHTML = index;
    });
  }

  private _insertBoardRows(): void {
    for (let i = 0; i < BOARD_SIZE.rows; i++) this._insertBoardRow();
  }

  private _insertBoardRow(): void {
    const row = this._htmlBoard.insertRow();
    this._insertIndexCell(row);
    this._insertBoardCells(row);
  }

  private _insertIndexCell(row: HTMLTableRowElement): void {
    const cell = row.insertCell();
    cell.innerHTML = `${row.rowIndex}`;
  }

  private _insertBoardCells(row: HTMLTableRowElement): void {
    for (let column = 0; column < BOARD_SIZE.columns; column++)
      this._insertBoardCell(row);
  }

  private _insertBoardCell(row: HTMLTableRowElement): void {
    const cell = row.insertCell();
    const position = new Position(cell.cellIndex - 1, row.rowIndex - 1);
    const piece = this._createEmptyPiece(position)
    cell.setAttribute("id", `${position.x}${position.y}`);
    this._cellsByPositionKey.set(position.asKey(), cell);
    this._setPieceOnCell(cell, piece);
    cell.addEventListener("click", this._onPieceClick.bind(this));
  }

  private _createEmptyPiece(position: Position): Piece {
    return new Piece(PieceType.empty, Color.white, position);
  }

  private _setPieceOnCell(cell: HTMLTableCellElement, piece: Piece): void {
    cell.innerHTML = piece.asString();
    cell.style.color = piece.color;
    this._savePieceOnCellMap(cell, piece);
  }

  private _onPieceClick(event: MouseEvent): void {
    const cell = event.target as HTMLTableCellElement;
    const piece = this._getPieceFromCell(cell);

    this._resetHightlitedCells();

    if (this._currentSelectedPiece !== null) return this._triggerMove(piece);
    this._setActivePiece(piece, cell);
  }

  private _savePieceOnCellMap(cell: HTMLTableCellElement, piece: Piece): void {
    const cell_id = cell.getAttribute("id") || "";
    this._piecesByCellId.set(cell_id, piece);
  }

  private _getPieceFromCell(cell: HTMLTableCellElement): Piece {
    const cell_id = cell.getAttribute("id") || "";
    const piece = this._piecesByCellId.get(cell_id);
    if (piece === undefined) throw new Error(`Piece not found, on ${cell_id}`);
    return piece;
  }

  private _triggerMove(to: Piece): void {
    if (this._currentSelectedPiece === null) return;
    this._movePiece(this._currentSelectedPiece, to);
    this._currentSelectedPiece = null;
  }

  private _setActivePiece(piece: Piece, cell: HTMLTableCellElement): void {
    if (piece.type === PieceType.empty) return;
    this._currentSelectedPiece = piece;
    this._highLightCell(cell);
  }

  private _movePiece(from: Piece, to: Piece): void {
    if (this._onMoveListener === null) return;
    this._onMoveListener({ from: from, to: to });
  }

  private _resetHightlitedCells(): void {
    const cells = Array.from(
      document.getElementsByClassName(HIGHLIGH_PIECE_CLASS)
    ) as Array<HTMLTableCellElement>;
    this._clearHighlight(cells);
  }

  private _clearHighlight(cells: Array<HTMLTableCellElement>): void {
    cells.forEach((c) => c.classList.remove(HIGHLIGH_PIECE_CLASS));
  }

  private _highLightCell(cell: HTMLTableCellElement): void {
    cell.classList.add(HIGHLIGH_PIECE_CLASS);
  }
}

export { ChessBoard, HTMLChessBoard };
