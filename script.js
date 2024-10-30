const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'x';
let board = Array(9).fill(null);

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!board[index]) {
            board[index] = currentPlayer;
            cell.classList.add(currentPlayer);
            cell.textContent = currentPlayer.toUpperCase();
            if (checkWin()) {
                alert(`שחקן ${currentPlayer.toUpperCase()} ניצח!`);
                resetBoard();
            } else if (board.every(cell => cell)) {
                alert('תיקו!');
                resetBoard();
            } else {
                currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            }
        }
    });
});

resetButton.addEventListener('click', resetBoard);

function resetBoard() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'x';
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}