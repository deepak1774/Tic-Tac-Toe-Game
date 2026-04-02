const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const restartOverlayBtn = document.getElementById('restart-overlay');
const body = document.body;
const overlay = document.getElementById('result-overlay');
const resultText = document.getElementById('result-text');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], combo };
        }
    }
    if (!board.includes('')) {
        return { winner: 'draw' };
    }
    return null;
}

function updateStatusColor() {
    if (currentPlayer === 'X') {
        status.style.color = '#00ff88';
    } else {
        status.style.color = '#e94560';
    }
}

function handleClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    const result = checkWinner();
    if (result) {
        gameActive = false;
        if (result.winner === 'draw') {
            status.textContent = "DRAW";
            status.style.color = '#fff';
            body.style.background = '#ffd700';
            resultText.textContent = "DRAW";
            resultText.style.color = '#000000';
            resultText.style.textShadow = '0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(255,215,0,0.6)';
            restartOverlayBtn.style.background = '#000000';
            restartOverlayBtn.style.color = '#ffd700';
            restartOverlayBtn.style.borderColor = '#000000';
            overlay.classList.remove('hidden');
        } else {
            status.textContent = `${result.winner} WON`;
            status.style.color = '#fff';
            if (result.winner === 'X') {
                body.style.background = 'linear-gradient(135deg, #004d00 0%, #008000 100%)';
                resultText.textContent = "X WON";
                resultText.style.color = '#002200';
                resultText.style.textShadow = '0 0 40px rgba(0,255,136,0.8), 0 0 100px rgba(0,255,136,0.4)';
                restartOverlayBtn.style.background = 'rgba(0,255,136,0.3)';
                restartOverlayBtn.style.color = '#00ff88';
                restartOverlayBtn.style.borderColor = '#00ff88';
            } else {
                body.style.background = 'linear-gradient(135deg, #4d0000 0%, #cc0000 100%)';
                resultText.textContent = "O WON";
                resultText.style.color = '#ffffff';
                resultText.style.textShadow = '0 0 40px rgba(255,255,255,0.8), 0 0 100px rgba(255,68,68,0.6)';
                restartOverlayBtn.style.background = 'rgba(255,255,255,0.2)';
                restartOverlayBtn.style.color = '#fff';
                restartOverlayBtn.style.borderColor = '#fff';
            }
            overlay.classList.remove('hidden');
            result.combo.forEach(i => cells[i].classList.add('winner'));
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
        updateStatusColor();
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    status.textContent = "Player X's Turn";
    status.style.color = '#00ff88';
    body.style.background = '';
    overlay.classList.add('hidden');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
restartOverlayBtn.addEventListener('click', restartGame);
updateStatusColor();