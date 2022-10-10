const boardSpots = document.querySelectorAll('.spot');
const player_1 = 'x';
const player_2 = 'o';
const gameStatus = document.querySelector('.game-status')
const player1 = prompt("what is players 1's name");
const player2 = prompt("what is players 2's name");
let xTurn;
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let resetButtn = document.getElementById('buttn')

startGame();

function startGame() {
    boardSpots.forEach(spot => {
        spot.addEventListener('click', playersMove, {once: true})
        spot.classList.remove(player_1)
        spot.classList.remove(player_2)
        spot.removeEventListener('click', boardSpots)
    });
}

function playersMove(event){
    const spot = event.target
    const activePlayer = xTurn ? player_1 : player_2
    move(spot, activePlayer)
    gameStatus.textContent =`${activePlayer}'s turn`;
    switchPlayer();
    if (findWinner(activePlayer)) {
        // console.log('winner')
        endGame(false)
    } else if (draw()) {
        endGame(true)
    }

};

function switchPlayer() {
    xTurn = !xTurn 
}

function move(spot, activePlayer) {
    spot.classList.add(activePlayer)
};

function findWinner(activePlayer) {
    return winCondition.some(boardOrder => {
        return boardOrder.every(index => {
            return boardSpots[index].classList.contains(activePlayer)
        })
    })
}

function endGame(draw) {
    if (draw) {
        gameStatus.innerText = "it's a draw"
    } else {
        gameStatus.innerText = `${xTurn ? "O's" : "X's"} Wins!`
    }
}

function itsADraw() {
    return boardSpots.every(spot =>{
        return spot.spot.classList.contains(player_1) || 
        spot.classList.contains(player_2)
    })
}

resetButtn.addEventListener("click", startGame)

