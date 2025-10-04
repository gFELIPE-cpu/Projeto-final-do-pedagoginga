// Seleciona todas as células no tabuleiro (9divs com classe cell)//
const cells = document.querySelectorAll(".cell")

// Seleciona a area de status (quem joga, vitória ou empate)
const statusText = document.getElementById("status")

// Seleciona o botão de reiniciar
const restartBtn = document.getElementById("restart")

// Define quem é o jogador
let currentPlayer = "X";

//Array que representa o tabuleiro (9 posições)
let board = ["", "", "", "", "", "", "", "", ""]

//Variavvel para controlar se o jogo ainda está em andamento
let gameActive = true;

const winningConditions = [
    [0, 1, 2], //linha superior
    [3, 4, 5],//linha meio
    [6, 7, 8],//linha inferior
    [0, 3, 6],//coluna esquerda
    [1, 4, 7],//coluna meio
    [2, 5, 8],//coluna direita
    [0, 4, 8],//diagonal principal
    [2, 4, 6]//diagonal secundária
];

function initializeGame() {
    for(let i = 0; i < 9; i++) {
        cells[i].addEventListener("click", handleCellClick)
    }
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Vez do Jogador ${currentPlayer}`;
}

function handleCellClick(event) {
    const cell = event.target // celula clicada
    const index = cell.getAttribute("data-index"); //índice da célula (0 a 8)
    
    // Se já tiver valor ou jogo acabou, ignora clique
    if(board[index] !== "" || !gameActive) {
        return
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if(currentPlayer === "X"){
        cell.classList.add("x")
    } else {
        cell.classList.add("o")
    }

    checkWinner();
}


function checkWinner() {
    let roundWon = false;

    //percorre todas as condições de vitórias
    for (let i = 0; i < winningConditions.length; i+=1) {
        const [a, b, c] = winningConditions[i]
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            roundWon = true;
            console.log("fim!")
            break;
        }
    }

    //Se alguém venceu
    if (roundWon) {
        statusText.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        return;
    }

    // se todas as células estiverem preenchidas e ninguém ganhou, empate
    if (!board.includes("")) {
        statusText.textContent = "Empate!";
        gameActive = false;
        return;
    }
    // inverte jogadores
    if (currentPlayer === "X"){
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
}  

function restartGame() {
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""]
        gameActive = true;
        statusText.textContent = `Vez do jogador ${currentPlayer}`;

        for (let i = 0; i < cells.length; i += 1) {
            cells[i].textContent = "";
            cells[i].classList.remove("x");
            cells[i].classList.remove("o");
        }
}
initializeGame();