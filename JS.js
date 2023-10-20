const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const board = document.getElementById('board');
let currentPlayer = 'X';
let boardArray = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let mode = '';

function makeMove(index) {
    if (gameActive && boardArray[index] === '') {
        boardArray[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        cells[index].classList.add(currentPlayer);

        if (checkWin(currentPlayer)) {
            message.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (boardArray.indexOf('') === -1) {
            message.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `${currentPlayer}'s turn`;

            cells[index].classList.remove(currentPlayer);

            if (gameActive && currentPlayer === 'O') {
                if (mode === 'cpu') {
                    makeCPUMove();
                }
            }
        }
    }
}

function checkWin(player) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winCombos.some(combo => {
        return combo.every(index => boardArray[index] === player);
    });
}

function resetBoard() {
    currentPlayer = 'X';
    boardArray = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    message.textContent = "X's turn";
    gameActive = true;
    board.style.display = 'grid';
}

resetButton.addEventListener('click', resetBoard);

function startGameAndCloseModal(selectedMode) {
    toggleMenu();
    resetBoard();
    gameActive = true;
    currentPlayer = 'X';
    mode = selectedMode;
    if (selectedMode === 'cpu' && currentPlayer === 'O') {
        makeCPUMove();
    }
}

function makeCPUMove() {
    if (gameActive && currentPlayer === 'O') {
        const emptyCells = boardArray.reduce((acc, cell, index) => {
            if (cell === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cpuMove = emptyCells[randomIndex];
        setTimeout(() => makeMove(cpuMove), 500);
    }
}

const modalBackground = document.getElementById('modal-background');

function toggleMenu() {
    const menuModal = document.getElementById('menu-modal');
    if (menuModal.style.display === 'block') {
        menuModal.style.display = 'none';
        modalBackground.style.display = 'none';
    } else {
        menuModal.style.display = 'block';
        modalBackground.style.display = 'block';
    }
}

window.onclick = function (event) {
    const menuModal = document.getElementById('menu-modal');
    if (event.target === menuModal) {
        menuModal.style.display = 'none';
    }
}
