/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variables
let turn = 1;
let current = 0;
let randNum;

let player1Total = 0;
let player2Total = 0;

// DOM elements
let newBtn = document.querySelector('.btn-new');
let rollBtn = document.querySelector('.btn-roll');
let holdBtn = document.querySelector('.btn-hold');

let currentP1 = document.querySelector('#current-0');
let currentP2 = document.querySelector('#current-1');

let scoreP1 = document.querySelector('#score-0');
let scoreP2 = document.querySelector('#score-1');

let dice = document.querySelector('.dice');

let player1Panel = document.querySelector('.player-0-panel');
let player2Panel = document.querySelector('.player-1-panel');

// functions
const rollDice = () => {
    // generate random number from 1 to 6
    let randNum = Math.floor(Math.random() * 6 + 1);

    // switches player if dice is 1
    if(randNum === 1) {
        dice.src = `dice-1.png`;
        randNum = 0;

        switchPlayer();
    } else {
        // changes the dice image according to the random number
        dice.src = `dice-${randNum}.png`;
    }    

    // adds the random number to current, updates the DOM
    current += randNum;
    turn === 1 ? currentP1.textContent = `${current}` : currentP2.textContent = `${current}`;
}

// adds the current to total score, updates the DOM
const addToTotal = () => {
    if(turn === 1) {
        player1Total += current; // adds the current to player 1 total
        scoreP1.textContent = `${player1Total}`; // shows the total to the DOM
        
        // check if there is already a winner
        player1Total < 100 ? switchPlayer() : showWinner(1);
    } else if(turn === 2) {
        player2Total += current; // adds the current to player 2 total
        scoreP2.textContent = `${player2Total}`; // shows the total to the DOM

        // check if there is already a winner
        player2Total < 100 ? switchPlayer() : showWinner(2);
    }
}

// switch player is activated if dice is 1, or the user pressed the hold button
const switchPlayer= () => {
    // switch player
    current = 0;
    if(turn === 1) {
        turn = 2;
        currentP1.textContent = 0;

        // toggles the active class
        player2Panel.classList.add('active');
        player1Panel.classList.remove('active');
    } else if(turn === 2) {
        turn = 1;
        currentP2.textContent = 0;

        // toggles the active class
        player1Panel.classList.add('active');
        player2Panel.classList.remove('active');
    }
}

// show the winner in the DOM
const showWinner = (player) => { 
    // disable roll and hold buttons
    rollBtn.style.pointerEvents = 'none';
    holdBtn.style.pointerEvents = 'none';

    if(player === 1) {
        scoreP1.textContent = `${player1Total}`;
        document.querySelector('#name-0').textContent = 'Player 1 wins!';
        player1Panel.classList.add('winner');
        player1Panel.classList.remove('active');
    } else {
        scoreP2.textContent = `${player2Total}`;
        document.querySelector('#name-1').textContent = 'Player 2 wins!';
        player2Panel.classList.add('winner');
        player2Panel.classList.remove('active');
    }
}

// restart the game
const resetGame = () => {
    location.reload();
}

rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', addToTotal);
newBtn.addEventListener('click', resetGame);