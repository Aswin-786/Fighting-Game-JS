const playButton = document.getElementById('play');
const resultDiv = document.getElementById('result');
const p1NameDiv = document.getElementById('p1Name');
const p2NameDiv = document.getElementById('p2Name');
const p1HealthDiv = document.getElementById('p1Health');
const p2HealthDiv = document.getElementById('p2Health');

const updateGame = (p1, p2, gameState) => {
  p1NameDiv.innerText = p1.name;
  p2NameDiv.innerText = p2.name;
  p1HealthDiv.innerText = p1.health;
  p2HealthDiv.innerText = p2.health;

  // if p1 health reaches above 100 after healing
  if (p1.health > 100) {
    p1.health = 100;
    updateGame(p1, p2, game.isOver);
  }

  // if p2 health reaches above 100 after healing
  if (p2.health > 100) {
    p2.health = 100;
    updateGame(p1, p2, game.isOver);
  }

  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver;
    resultDiv.innerText = game.declareWinner(game.isOver, p1, p2);
    return gameState;
  }
};

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  // Attack an enemy
  strike(player, enemy, attackDmg) {
    // Get random number between 1 - 10 and that is damageAmount
    let damageAmount = Math.floor(Math.random() * attackDmg);
    // Subtract the enemy health with the damageAmount
    enemy.health -= damageAmount;

    // Update the game and DOM with updateGame()
    updateGame(p1, p2, game.isOver);

    // Return a message
    return `${player.name} attacks ${enemy.name} ${damageAmount}`;
  }

  // Heal the player
  heal(player) {
    // Get random number between 1 - 5 and store that in hpAmount
    let hpAmount = Math.floor(Math.random() * this.attackDmg);

    // Add hpAmount to players health
    player.health += hpAmount;

    // Update the game and DOM with updateGame()
    updateGame(p1, p2, game.isOver);

    // Return a message
    return `${player.name} heals for ${hpAmount} HP`;
  }
}

class Game {
  constructor() {
    this.isOver = false;
  }

  // player has 0 health declare the winner!
  declareWinner(isOver, p1, p2) {
    let message;

    if (isOver && p1.health <= 0) {
      message = `${p2.name} WINS!`;
    } else if (isOver && p2.health <= 0) {
      message = `${p1.name} WINS!`;
    } else if (isOver && p2.health < p1.health) {
      message = `${p1.name} WINS!`;
    } else if (isOver && p2.health > p1.health) {
      message = `${p2.name} WINS!`;
    }

    // Play victory sound
    document.getElementById('victory').play();

    // Return message variable
    return message;
  }

  // Reset the players
  reset(p1, p2) {
    p1.health = 100;
    p2.health = 100;
    resultDiv.innerText = '';
    this.isOver = false;
    updateGame(p1, p2, this.isOver);
  }

  play(p1, p2) {
    // Reset to make sure player health is back to full before starting
    this.reset(p1, p2);

    // Make sure the players take turns untill isOver is TRUE
    while (!this.isOver) {
      // Make sure both players get strike() and heal() once each loop
      p1.strike(p1, p2, p1.attackDmg);
      p2.heal(p2);
      p2.strike(p2, p1, p2.attackDmg);
      p1.heal(p1);
    }

    // Once isOver is TRUE run the declareWinner() method
    return this.declareWinner(this.isOver, p1, p2);
  }
}

let names;
let pl1_name;
let pl2_name;

let name = JSON.parse(localStorage.getItem('names'));
console.log(name);

if (name == null) {
  pl1_name = 'Player 1';
  pl2_name = 'Player 2';
} else {
  pl1_name = name[0];
  pl2_name = name[1];
}

let player1 = new Player(pl1_name.toUpperCase(), 100, 10);
let player2 = new Player(pl2_name.toUpperCase(), 100, 10);

// when screen refreshed back to player name page
if (performance.navigation.type === 1) {
  // page was just refreshed:
  window.location.href = '../index.html';
}

// Save original Player Data into a variable in order to reset
let p1 = player1;
let p2 = player2;
console.log(p1);

// Create the game object from the Game class
let game = new Game();

// Intialize the game by calling updateGame()
updateGame(p1, p2, 10);

// Save intial isOver from the game object inside this variable
let gameState;

// Add a click listener to run the play() method on click and pass in the players
playButton.onclick = () => {
  resultDiv.innerText = game.play(p1, p2);
};

// Player 1 Controls
document.addEventListener('keydown', function (e) {
  // if press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if (e.key == 'q' && p2.health >= 0 && !game.isOver) {
    p1.strike(p1, p2, p1.attackDmg);
    document.getElementById('p1attack').play();
  }
});

document.addEventListener('keydown', function (e) {
  // if press a AND the player health is greater than 0 AND isOver is still false then strike()
  if (e.key == 'a' && p2.health >= 0 && !game.isOver) {
    p1.heal(p1);
    document.getElementById('p1heal').play();
  }
});

// Player 2 Controls
document.addEventListener('keydown', function (e) {
  // if press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if (e.key == 'p' && p1.health >= 0 && !game.isOver) {
    p2.strike(p2, p1, p2.attackD
