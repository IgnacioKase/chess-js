/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.ts":
/*!**********************!*\
  !*** ./src/board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTMLChessBoard": () => (/* binding */ HTMLChessBoard)
/* harmony export */ });
/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ "./src/piece.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/types.ts");


const HIGHLIGH_PIECE_CLASS = "highlight-piece";
const HEADER_INDEX_NAMES = ["", "a", "b", "c", "d", "e", "f", "g", "h"];
const BOARD_SIZE = { rows: 8, columns: 8 }; // it doesn't include indexes on the sides
class HTMLChessBoard {
    constructor(boardElement) {
        this._currentSelectedPiece = null;
        this._piecesByCellId = new Map();
        this._cellsByPositionKey = new Map();
        this._htmlBoard = boardElement;
        this._piecesByCellId = new Map();
        this._onMoveListener = null;
        this._initializeHtmlBoard();
    }
    setPiece(piece) {
        const cell = this._getCellByPosition(piece.position);
        this._setPieceOnCell(cell, piece);
    }
    getPiece(position) {
        if (!position.isValid())
            throw new Error(`Invalid position ${position.asKey()}`);
        const cell = this._getCellByPosition(position);
        return this._getPieceFromCell(cell);
    }
    setOnMoveListener(listener) {
        this._onMoveListener = listener;
    }
    isEmpty(position) {
        if (!position.isValid())
            return false;
        const piece = this.getPiece(position);
        return piece.type === _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.empty;
    }
    isEnemyPiece(position, color) {
        if (!position.isValid())
            return false;
        const piece = this.getPiece(position);
        if (piece.type === _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.empty)
            return false;
        return piece.color !== color;
    }
    _getCellByPosition(position) {
        const cell = this._cellsByPositionKey.get(position.asKey());
        if (cell === undefined)
            throw new Error(`Cell not found, on ${position.asKey()}`);
        return cell;
    }
    _initializeHtmlBoard() {
        this._clearHtmlTable();
        this._insertHeaderRow();
        this._insertBoardRows();
    }
    _clearHtmlTable() {
        this._htmlBoard.innerHTML = "";
    }
    _insertHeaderRow() {
        const header_row = this._htmlBoard.insertRow();
        HEADER_INDEX_NAMES.forEach((index) => {
            const cell = header_row.insertCell();
            cell.innerHTML = index;
        });
    }
    _insertBoardRows() {
        for (let i = 0; i < BOARD_SIZE.rows; i++)
            this._insertBoardRow();
    }
    _insertBoardRow() {
        const row = this._htmlBoard.insertRow();
        this._insertIndexCell(row);
        this._insertBoardCells(row);
    }
    _insertIndexCell(row) {
        const cell = row.insertCell();
        cell.innerHTML = `${row.rowIndex}`;
    }
    _insertBoardCells(row) {
        for (let column = 0; column < BOARD_SIZE.columns; column++)
            this._insertBoardCell(row);
    }
    _insertBoardCell(row) {
        const cell = row.insertCell();
        const position = new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(cell.cellIndex - 1, row.rowIndex - 1);
        cell.setAttribute("id", `${position.x}${position.y}`);
        this._cellsByPositionKey.set(position.asKey(), cell);
        this._setEmptyPieceOnCell(cell, position);
        cell.addEventListener("click", this._onPieceClick.bind(this));
    }
    _setEmptyPieceOnCell(cell, position) {
        const piece = this._createEmptyPiece(position);
        this._setPieceOnCell(cell, piece);
    }
    _createEmptyPiece(position) {
        return new _piece__WEBPACK_IMPORTED_MODULE_0__.Piece(_types__WEBPACK_IMPORTED_MODULE_1__.PieceType.empty, _types__WEBPACK_IMPORTED_MODULE_1__.Color.white, position);
    }
    _setPieceOnCell(cell, piece) {
        cell.innerHTML = piece.asString();
        cell.style.color = piece.color;
        this._savePieceOnCellMap(cell, piece);
    }
    _onPieceClick(event) {
        const cell = event.target;
        const piece = this._getPieceFromCell(cell);
        this._resetHightlitedCells();
        if (this._currentSelectedPiece !== null)
            return this._triggerMove(piece);
        this._setActivePiece(piece, cell);
    }
    _savePieceOnCellMap(cell, piece) {
        const cell_id = cell.getAttribute("id") || "";
        this._piecesByCellId.set(cell_id, piece);
    }
    _getPieceFromCell(cell) {
        const cell_id = cell.getAttribute("id") || "";
        const piece = this._piecesByCellId.get(cell_id);
        if (piece === undefined)
            throw new Error(`Piece not found, on ${cell_id}`);
        return piece;
    }
    _triggerMove(to) {
        if (this._currentSelectedPiece === null)
            return;
        this._movePiece(this._currentSelectedPiece, to);
        this._currentSelectedPiece = null;
    }
    _setActivePiece(piece, cell) {
        if (piece.type === _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.empty)
            return;
        this._currentSelectedPiece = piece;
        this._highLightCell(cell);
    }
    _movePiece(from, to) {
        if (this._onMoveListener === null)
            return;
        this._onMoveListener({ from: from, to: to });
    }
    _resetHightlitedCells() {
        const cells = Array.from(document.getElementsByClassName(HIGHLIGH_PIECE_CLASS));
        this._clearHighlight(cells);
    }
    _clearHighlight(cells) {
        cells.forEach((c) => c.classList.remove(HIGHLIGH_PIECE_CLASS));
    }
    _highLightCell(cell) {
        cell.classList.add(HIGHLIGH_PIECE_CLASS);
    }
}



/***/ }),

/***/ "./src/logic.ts":
/*!**********************!*\
  !*** ./src/logic.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChessGame": () => (/* binding */ ChessGame)
/* harmony export */ });
/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ "./src/piece.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/types.ts");


const initialOrderedPieceTypes = [
    _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.rook,
    _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.knight,
    _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.bishop,
    _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.queen,
    _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.king,
    _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.bishop,
    _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.knight,
    _types__WEBPACK_IMPORTED_MODULE_1__.PieceType.rook,
];
class ChessGame {
    constructor(board) {
        this._board = board;
        this._populateBoardWithInitialPieces();
        this._board.setOnMoveListener((move) => this.movePiece(move));
    }
    movePiece(move) {
        if (!move.from.isValidMove(move.to, this._board))
            return;
        this._board.setPiece(move.from.copyToPosition(move.to.position));
        this._board.setPiece(move.from.copyAsEmpty());
    }
    _populateBoardWithInitialPieces() {
        for (let i = 0; i < 8; i++) {
            this._setInitialSpecialPieces(i, _types__WEBPACK_IMPORTED_MODULE_1__.Color.white);
            this._setInitialSpecialPieces(i, _types__WEBPACK_IMPORTED_MODULE_1__.Color.black);
            this._setInitialPawns(i);
        }
    }
    _setInitialSpecialPieces(columnNumber, color) {
        const type = initialOrderedPieceTypes[columnNumber];
        const rowNumber = color === _types__WEBPACK_IMPORTED_MODULE_1__.Color.white ? 0 : 7;
        const position = new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(columnNumber, rowNumber);
        this._board.setPiece(new _piece__WEBPACK_IMPORTED_MODULE_0__.Piece(type, color, position));
    }
    _setInitialPawns(columnNumber) {
        this._board.setPiece(new _piece__WEBPACK_IMPORTED_MODULE_0__.Piece(_types__WEBPACK_IMPORTED_MODULE_1__.PieceType.pawn, _types__WEBPACK_IMPORTED_MODULE_1__.Color.white, new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(columnNumber, 1)));
        this._board.setPiece(new _piece__WEBPACK_IMPORTED_MODULE_0__.Piece(_types__WEBPACK_IMPORTED_MODULE_1__.PieceType.pawn, _types__WEBPACK_IMPORTED_MODULE_1__.Color.black, new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(columnNumber, 6)));
    }
}



/***/ }),

/***/ "./src/moves/bishop.ts":
/*!*****************************!*\
  !*** ./src/moves/bishop.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getValidBishopMoves": () => (/* binding */ getValidBishopMoves)
/* harmony export */ });
/* harmony import */ var _common_moves__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common_moves */ "./src/moves/common_moves.ts");

function getValidBishopMoves(board, piece) {
    return (0,_common_moves__WEBPACK_IMPORTED_MODULE_0__.getDiagonalMoves)(board, piece);
}



/***/ }),

/***/ "./src/moves/common_moves.ts":
/*!***********************************!*\
  !*** ./src/moves/common_moves.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDiagonalMoves": () => (/* binding */ getDiagonalMoves),
/* harmony export */   "getHorizontalMoves": () => (/* binding */ getHorizontalMoves),
/* harmony export */   "getVerticalMoves": () => (/* binding */ getVerticalMoves)
/* harmony export */ });
function getHorizontalMoves(board, piece) {
    const validMoves = [];
    const directions = [-1, 1];
    for (const direction of directions) {
        let position = piece.position.translateByNColumn(direction);
        while (board.isEmpty(position) && position.isValid()) {
            validMoves.push(position);
            position = position.translateByNColumn(direction);
        }
        if (board.isEnemyPiece(position, piece.color))
            validMoves.push(position);
    }
    return validMoves;
}
function getVerticalMoves(board, piece) {
    const validMoves = [];
    const directions = [-1, 1];
    for (const direction of directions) {
        let position = piece.position.translateByNRow(direction);
        while (board.isEmpty(position) && position.isValid()) {
            validMoves.push(position);
            position = position.translateByNRow(direction);
        }
        if (board.isEnemyPiece(position, piece.color))
            validMoves.push(position);
    }
    return validMoves;
}
function getDiagonalMoves(board, piece) {
    const validMoves = [];
    const directions = [-1, 1];
    for (const xDirection of directions) {
        for (const yDirection of directions) {
            let position = piece.position.translateN(xDirection, yDirection);
            while (board.isEmpty(position) && position.isValid()) {
                validMoves.push(position);
                position = position.translateN(xDirection, yDirection);
            }
            if (board.isEnemyPiece(position, piece.color))
                validMoves.push(position);
        }
    }
    return validMoves;
}



/***/ }),

/***/ "./src/moves/king.ts":
/*!***************************!*\
  !*** ./src/moves/king.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getValidKingMoves": () => (/* binding */ getValidKingMoves)
/* harmony export */ });
/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../piece */ "./src/piece.ts");

function getValidKingMoves(board, piece) {
    const moves = [];
    const { x, y } = piece.position;
    const positions = [
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x - 1, y - 1),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x - 1, y),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x - 1, y + 1),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x, y - 1),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x, y + 1),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x + 1, y - 1),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x + 1, y),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x + 1, y + 1),
    ].filter((p) => p.isValid());
    for (const position of positions) {
        if (board.isEmpty(position))
            moves.push(position);
        if (board.isEnemyPiece(position, piece.color))
            moves.push(position);
    }
    return moves;
}



/***/ }),

/***/ "./src/moves/knight.ts":
/*!*****************************!*\
  !*** ./src/moves/knight.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getValidKnightMoves": () => (/* binding */ getValidKnightMoves)
/* harmony export */ });
/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../piece */ "./src/piece.ts");

function getValidKnightMoves(board, piece) {
    const moves = [];
    const { x, y } = piece.position;
    const positions = [
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x - 2, y - 1),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x - 2, y + 1),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x - 1, y - 2),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x - 1, y + 2),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x + 1, y - 2),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x + 1, y + 2),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x + 2, y - 1),
        new _piece__WEBPACK_IMPORTED_MODULE_0__.Position(x + 2, y + 1),
    ].filter((p) => p.isValid());
    for (const position of positions) {
        if (board.isEmpty(position))
            moves.push(position);
        if (board.isEnemyPiece(position, piece.color))
            moves.push(position);
    }
    return moves;
}



/***/ }),

/***/ "./src/moves/pawn.ts":
/*!***************************!*\
  !*** ./src/moves/pawn.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getValidPawnMoves": () => (/* binding */ getValidPawnMoves)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/types.ts");

function getValidPawnMoves(board, piece) {
    const validMoves = [];
    const direction = piece.color === _types__WEBPACK_IMPORTED_MODULE_0__.Color.white ? 1 : -1;
    const forwardPosition = piece.position.translateByNRow(direction);
    const doubleForwaredPosition = piece.position.translateByNRow(direction * 2);
    const attackLeftPosition = forwardPosition.translateByNColumn(-1);
    const attackRightPosition = forwardPosition.translateByNColumn(1);
    if (board.isEnemyPiece(attackLeftPosition, piece.color))
        validMoves.push(attackLeftPosition);
    if (board.isEnemyPiece(attackRightPosition, piece.color))
        validMoves.push(attackRightPosition);
    if (!board.isEmpty(forwardPosition))
        return validMoves;
    validMoves.push(forwardPosition);
    // the double jump is only valid if the simple jump is valid (i.e: the forwardPosition is empty)
    if (board.isEmpty(doubleForwaredPosition) && _isPawnOnInitialPosition(piece))
        validMoves.push(doubleForwaredPosition);
    return validMoves;
}
function _isPawnOnInitialPosition(piece) {
    return piece.position.y === 1 || piece.position.y === 6;
}



/***/ }),

/***/ "./src/moves/queen.ts":
/*!****************************!*\
  !*** ./src/moves/queen.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getValidQueenMoves": () => (/* binding */ getValidQueenMoves)
/* harmony export */ });
/* harmony import */ var _common_moves__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common_moves */ "./src/moves/common_moves.ts");

function getValidQueenMoves(board, piece) {
    const horizontalMoves = (0,_common_moves__WEBPACK_IMPORTED_MODULE_0__.getHorizontalMoves)(board, piece);
    const verticalMoves = (0,_common_moves__WEBPACK_IMPORTED_MODULE_0__.getVerticalMoves)(board, piece);
    const diagonalMoves = (0,_common_moves__WEBPACK_IMPORTED_MODULE_0__.getDiagonalMoves)(board, piece);
    return horizontalMoves.concat(verticalMoves, diagonalMoves);
}



/***/ }),

/***/ "./src/moves/rook.ts":
/*!***************************!*\
  !*** ./src/moves/rook.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getValidRookMoves": () => (/* binding */ getValidRookMoves)
/* harmony export */ });
/* harmony import */ var _common_moves__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common_moves */ "./src/moves/common_moves.ts");

function getValidRookMoves(board, piece) {
    const horizontalMoves = (0,_common_moves__WEBPACK_IMPORTED_MODULE_0__.getHorizontalMoves)(board, piece);
    const verticalMoves = (0,_common_moves__WEBPACK_IMPORTED_MODULE_0__.getVerticalMoves)(board, piece);
    return horizontalMoves.concat(verticalMoves);
}



/***/ }),

/***/ "./src/moves_map.ts":
/*!**************************!*\
  !*** ./src/moves_map.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getValidMoves": () => (/* binding */ getValidMoves)
/* harmony export */ });
/* harmony import */ var _moves_bishop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moves/bishop */ "./src/moves/bishop.ts");
/* harmony import */ var _moves_king__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moves/king */ "./src/moves/king.ts");
/* harmony import */ var _moves_knight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./moves/knight */ "./src/moves/knight.ts");
/* harmony import */ var _moves_pawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./moves/pawn */ "./src/moves/pawn.ts");
/* harmony import */ var _moves_queen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./moves/queen */ "./src/moves/queen.ts");
/* harmony import */ var _moves_rook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./moves/rook */ "./src/moves/rook.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "./src/types.ts");







const _VALID_MOVES_BY_PIECE = new Map([
    [_types__WEBPACK_IMPORTED_MODULE_6__.PieceType.pawn, _moves_pawn__WEBPACK_IMPORTED_MODULE_3__.getValidPawnMoves],
    [_types__WEBPACK_IMPORTED_MODULE_6__.PieceType.rook, _moves_rook__WEBPACK_IMPORTED_MODULE_5__.getValidRookMoves],
    [_types__WEBPACK_IMPORTED_MODULE_6__.PieceType.knight, _moves_knight__WEBPACK_IMPORTED_MODULE_2__.getValidKnightMoves],
    [_types__WEBPACK_IMPORTED_MODULE_6__.PieceType.bishop, _moves_bishop__WEBPACK_IMPORTED_MODULE_0__.getValidBishopMoves],
    [_types__WEBPACK_IMPORTED_MODULE_6__.PieceType.queen, _moves_queen__WEBPACK_IMPORTED_MODULE_4__.getValidQueenMoves],
    [_types__WEBPACK_IMPORTED_MODULE_6__.PieceType.king, _moves_king__WEBPACK_IMPORTED_MODULE_1__.getValidKingMoves],
]);
function getValidMoves(board, piece) {
    const validMovesGetter = _VALID_MOVES_BY_PIECE.get(piece.type);
    return validMovesGetter ? validMovesGetter(board, piece) : [];
}



/***/ }),

/***/ "./src/piece.ts":
/*!**********************!*\
  !*** ./src/piece.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Piece": () => (/* binding */ Piece),
/* harmony export */   "Position": () => (/* binding */ Position)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/types.ts");
/* harmony import */ var _moves_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moves_map */ "./src/moves_map.ts");


class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    asKey() {
        return `${this.x},${this.y}`;
    }
    translateN(columns, rows) {
        return new Position(this.x + columns, this.y + rows);
    }
    translateByNRow(rows) {
        return new Position(this.x, this.y + rows);
    }
    translateByNColumn(columns) {
        return new Position(this.x + columns, this.y);
    }
    isValid() {
        return this.x >= 0 && this.x <= 7 && this.y >= 0 && this.y <= 7;
    }
}
class Piece {
    constructor(type, color, position) {
        this.type = type;
        this.color = color;
        this.position = position;
    }
    isValidMove(to, board) {
        if (!this._isPositionChangeValid(to, board))
            return false;
        if (to.type === _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.empty)
            return true;
        return this.color !== to.color;
    }
    asString() {
        return this.color === _types__WEBPACK_IMPORTED_MODULE_0__.Color.white ? this.type : this.type.toLowerCase();
    }
    copyToPosition(position) {
        return new Piece(this.type, this.color, position);
    }
    copyAsEmpty() {
        return new Piece(_types__WEBPACK_IMPORTED_MODULE_0__.PieceType.empty, this.color, this.position);
    }
    _isPositionChangeValid(to, board) {
        return (0,_moves_map__WEBPACK_IMPORTED_MODULE_1__.getValidMoves)(board, this).some((validMove) => validMove.asKey() === to.position.asKey());
    }
}



/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Color": () => (/* binding */ Color),
/* harmony export */   "PieceType": () => (/* binding */ PieceType)
/* harmony export */ });
var PieceType;
(function (PieceType) {
    PieceType["empty"] = " ";
    PieceType["rook"] = "\u265C";
    PieceType["knight"] = "\u265E";
    PieceType["bishop"] = "\u265D";
    PieceType["queen"] = "\u265B";
    PieceType["king"] = "\u265A";
    PieceType["pawn"] = "\u265F";
})(PieceType || (PieceType = {}));
var Color;
(function (Color) {
    Color["white"] = "white";
    Color["black"] = "black";
})(Color || (Color = {}));



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.ts");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic */ "./src/logic.ts");


const htmlBoard = document.getElementById("board");
const chessBoard = new _board__WEBPACK_IMPORTED_MODULE_0__.HTMLChessBoard(htmlBoard);
new _logic__WEBPACK_IMPORTED_MODULE_1__.ChessGame(chessBoard);

})();

/******/ })()
;