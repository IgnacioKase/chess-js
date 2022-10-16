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
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/types.ts");

function _getPieceStringRepresentation(piece) {
    return piece.color === _types__WEBPACK_IMPORTED_MODULE_0__.Color.white ? piece.type : piece.type.toLowerCase();
}
class HTMLChessBoard {
    constructor(boardElement, inputElement, submitButton) {
        this._board = this._createEmptyBoard();
        this._boardElement = boardElement;
        this._inputElement = inputElement;
        this._onMoveListener = null;
        submitButton.addEventListener("click", this._getPlayerMove.bind(this));
    }
    printBoard() {
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
    setPiece(piece) {
        this._board[piece.position.y][piece.position.x] = piece;
    }
    getPiece(position) {
        return this._board[position.y][position.x];
    }
    setOnMoveListener(listener) {
        this._onMoveListener = listener;
    }
    _getPlayerMove() {
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
    _createEmptyBoard() {
        const board = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                const piece = {
                    type: _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.empty,
                    color: _types__WEBPACK_IMPORTED_MODULE_0__.Color.white,
                    position: { x: i, y: j },
                };
                row.push(piece);
            }
            board.push(row);
        }
        return board;
    }
    _getPositionFromUserInput(userInput) {
        // User input is in the format "a1", output is {x: 0, y: 0}
        return { x: userInput.charCodeAt(0) - 97, y: parseInt(userInput[1]) - 1 };
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
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/types.ts");

class ChessGame {
    constructor(board) {
        this._board = board;
        this._populateBoardWithInitialPieces();
    }
    start() {
        this._board.printBoard();
        this._board.setOnMoveListener((move) => this.movePiece(move));
    }
    movePiece(move) {
        const piece = this._board.getPiece(move.from);
        this._board.setPiece(Object.assign(Object.assign({}, piece), { position: move.to }));
        const emptyPiece = Object.assign(Object.assign({}, piece), { type: _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.empty });
        this._board.setPiece(emptyPiece);
        this._board.printBoard();
    }
    _populateBoardWithInitialPieces() {
        const pieces = [
            _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.rook,
            _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.knight,
            _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.bishop,
            _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.queen,
            _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.king,
            _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.bishop,
            _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.knight,
            _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.rook,
        ];
        for (let i = 0; i < 8; i++) {
            this._board.setPiece({
                type: pieces[i],
                color: _types__WEBPACK_IMPORTED_MODULE_0__.Color.white,
                position: { x: i, y: 0 },
            });
            this._board.setPiece({
                type: _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.pawn,
                color: _types__WEBPACK_IMPORTED_MODULE_0__.Color.white,
                position: { x: i, y: 1 },
            });
            this._board.setPiece({
                type: _types__WEBPACK_IMPORTED_MODULE_0__.PieceType.pawn,
                color: _types__WEBPACK_IMPORTED_MODULE_0__.Color.black,
                position: { x: i, y: 6 },
            });
            this._board.setPiece({
                type: pieces[i],
                color: _types__WEBPACK_IMPORTED_MODULE_0__.Color.black,
                position: { x: i, y: 7 },
            });
        }
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
const htmlInput = document.getElementById("move");
const htmlSubmitButton = document.getElementById("submit");
const chessBoard = new _board__WEBPACK_IMPORTED_MODULE_0__.HTMLChessBoard(htmlBoard, htmlInput, htmlSubmitButton);
const chessGame = new _logic__WEBPACK_IMPORTED_MODULE_1__.ChessGame(chessBoard);
chessGame.start();

})();

/******/ })()
;