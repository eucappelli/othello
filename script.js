let gameBoard = null;
let actualBoard = null;

const cells = [];
const blacks = 0;
const whites = 1;
let player = blacks;
let bot = whites;
let turn = -1;
let blacksCount = 0;
let whitesCount = 0;

let colors = ["black", "white"];

const UP = -10;
const DOWN = 10;
const LEFT = -1;
const RIGHT = 1;
const UP_RIGHT = -9;
const DOWN_RIGHT = 11;
const DOWN_LEFT = 9;
const UP_LEFT = -11;
const DIRECTIONS = [UP, UP_RIGHT, RIGHT, DOWN_RIGHT, DOWN, DOWN_LEFT, LEFT, UP_LEFT];

window.onload = function () {
    createHud();
    createGameBody();
}

function createHud() {
    const hud = document.createElement("div");
    hud.id = "hud";
    hud.className = "hud";
    const tutorial = createTutorial();
    const button = createButtonsDiv();
    hud.appendChild(tutorial);
    hud.appendChild(button);
    document.body.appendChild(hud);
}


function createGameBody() {
    const body = document.createElement("div");
    const gameScore = createGameScore();
    body.id = "gameBody";
    body.className = "gameBody";
    body.appendChild(gameScore);
    document.body.appendChild(body);
}

function createTutorial() {
    const tutorial = document.createElement("div");
    tutorial.id = "tutorial";
    tutorial.className = "tutorial";
    tutorial.innerHTML = "Bem vindo ao Othello.\nClique no botão abaixo para começar um novo jogo."
    return tutorial;
}

function createButtonsDiv() {
    const buttons = document.createElement("div");
    buttons.id = "buttons-div";
    buttons.className = "buttons-div";
    const startButton = createStartButton();
    buttons.appendChild(startButton);
    document.body.appendChild(buttons);
    return buttons;
}

function createGameScore() {
    const gameScore = document.createElement("div");
    gameScore.id = "gameScore";
    gameScore.className = "gameScore";
    gameScore.innerHTML = setScore();
    return gameScore;
}

function setScore() {
    return `Brancas: ${whitesCount}\nPretas: ${blacksCount}`;;
}

function createStartButton() {
    const button = document.createElement("button");
    button.id = "start-button";
    button.innerHTML = "Começar jogo";
    button.className = "button";
    button.onclick = function () {
        startGame();
    };
    return button;
}

function startGame() {
    if (!gameBoard) {
        gameBoard = createGameBoard();
        const board = createGameBoard();
        const body = document.getElementById("gameBody");
        body.style.display = "inline"
        body.appendChild(board);
    }

    createActualBoard();
    initGameState();
    document.getElementById("gameScore").innerHTML = setScore();
}

// cria o tabuleiro visivel
function createGameBoard() {
    const board = document.createElement("div");
    board.id = "board";
    // cria rows do tabuleiro 
    for (let i = 0; i < 8; i++) {
        let row = document.createElement("div");
        row.className = "row";
        row.id = `row-${i}`;
        board.appendChild(row);
    }
    const rows = board.getElementsByClassName("row");
    for (let row of rows) {
        const rowId = row.id.replace(/[^\d.]/g, '');;
        for (let j = 0; j < 8; j++) {
            const cellId = (rowId * 8) + j;
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.id = `cell-${cellId}`;
            cell.onclick = onClickCell(cellId);
            cells.push(cell);
            row.appendChild(cell);
        }
    }

    return board;
}

// cria o array que contém os objetos no tabuleiro na memoria
function createActualBoard() {
    actualBoard = new Array(64);
    for (let i = 0; i < 64; i++) {
        actualBoard[i] = 1;
    }
}

function initGameState() {
    turn = player;

    createPiece(27, whites);
    createPiece(36, whites);
    createPiece(35, blacks);
    createPiece(28, blacks);
}

function createPiece(id, color) {
    actualBoard[id] = color;
    const cell = document.getElementById(`cell-${id}`);
    const piece = document.createElement("div");
    piece.className = colors[color];
    piece.id = `piece-${id}`;

    if (color == whites) whitesCount++;
    else blacksCount++;
    cell.appendChild(piece);
}

function onClickCell(cellId) {
    if (turn == player) {
        makeMove(cellId);
    } else {
        // jogada do bot
    }
}

function makeMove(cellId) {
    // verifica se a celula está dentro do tabuleiro
    const isEmpty = !cells[cellId].firstChild;
    if (isEmpty) {

    }
}

// retorna o id da proxima celula do jogador/bot caso exista
// retorna o id da borda caso não exista
function findCell(cellId, move, currentPlayer) {
    let nextCell = cellId + move;
    const opponent = currentPlayer == player ? bot : player;
    // retorna null se a nova celula for do proprio jogador
    if (colors.indexOf(cellsColor(nextCell)) == currentPlayer) {
        return null;
    }
    // anda até a proxima celular que não é do oponente
    while (colors.indexOf(cellsColor(nextCell)) == opponent) {
        nextCell += move;
    }
    return board[nextCell].firstChild ? nextCell : null;
}

function cellsColor(id) {
    if (!cells[id].firstChild) {
        return false;
    } return cells[id].firstChild.className;
}