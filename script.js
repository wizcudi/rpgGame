let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// Calling/using these var allows changes you see in html based on #id in HTML
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// All the various weapons you can have
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

// All the various monsters you can fight
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]

// Different locations you can go to a various game play in those locations
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];


// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// updates game screen based on button that is clicked, Location Array is the param
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

// when a user clicks the go to town button this function triggers the action
function goTown() {
  update(locations[0]);
}

// when a user clicks the go to store button this function triggers the action
function goStore() {
  update(locations[1]);
}

// when a user clicks the go to cave button this function triggers the action
function goCave() {
  update(locations[2]);
}

// when a user clicks the buy health button this function triggers the action
function buyHealth() {
  // this if else state checks to see if player has 10 gold coins or more
  if (gold >= 10) {
    // when player buys health 10 gold coins is extracted from player
    gold -= 10;
    // 10 points is added to health
    health += 10;
    // players gold coins now reflects 10 less coins
    goldText.innerText = gold;
    // players health now reflects 10 more health points
    healthText.innerText = health;
  } else {
    // if the player does not have enough gold, this message is shown
    text.innerText = "You do not have enough gold to buy health.";
  }
}

// logic for buying weapons
function buyWeapon() {
  // checks if player has all the weapons in inventory
  if (currentWeapon < weapons.length - 1) {
    // checks if player has 30 gold coins or more
    if (gold >= 30) {
      // removes 30 gold coins
      gold -= 30;
      // adds one new weapon
      currentWeapon++;
      // updates players gold coins by -30
      goldText.innerText = gold;
      //creates new weapon and displays weapon name
      let newWeapon = weapons[currentWeapon].name;
      // text telling player the name of the new weapon they now have
      text.innerText = "You now have a " + newWeapon + ".";
      // adds the new weapon to the players weapon inventory 
      inventory.push(newWeapon);
      // displays all the weapons in players inventory
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      // message shows when player does not have enough gold coins to buy weapon
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    // if player has all the weapons in game this message is shown
    text.innerText = "You already have the most powerful weapon!";
    // text inside button is shown that gives player the option to sell weapon
    button2.innerText = "Sell weapon for 15 gold";
    // if player clicks sell weapon button this action is performed
    button2.onclick = sellWeapon;
  }
}

// logic for selling weapons
function sellWeapon() {
  // checks if players inventory has atleast 2 weapons
  if (inventory.length > 1) {
    // adds 15 gold coins
    gold += 15;
    // updates players gold coins with +15
    goldText.innerText = gold;
    // updates players weapon inventory by removing the 1st weapon the array permanently and shows the weapon it removed from array
    let currentWeapon = inventory.shift();
    // displays the weapon that was removed to the player
    text.innerText = "You sold a " + currentWeapon + ".";
    // displays the remaining weapons user has
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    // displays when user only has 1 weapon in inventory
    text.innerText = "Don't sell your only weapon!";
  }
}

// logic when fightin slime
function fightSlime() {
  // at the beginning of script fighting is initilized, this is used to identify that slime is fight
  // the Slime object is in the 0th place inside the monster array
  fighting = 0;
  // calls the go fight function
  goFight();
}

// logic when fighting fanged beast
function fightBeast() {
  // at the beginning of script fighting is initilized, this is used to idnetify that fanged beast is fight
  // the Fanged Beast object is in the 1st place inside the monster array
  fighting = 1;
  // call the go fight function
  goFight();
}

// logic when fighting Dragon
function fightDragon() {
  // at the beginning of script fighting is initilized, this is used to idnetify that dragon is fight
  // the Dragon object is in the 3rd place inside the monster array
  fighting = 2;
  // calls the go fight function
  goFight();
}

// logic for fighting action
function goFight() {
  // when user is fighting, the object that contains the fighting information is shown and based on users actions the update function is used accordingly 
  update(locations[3]);
  // the moneters health is added when fighting starts. which is set to 0 by default but updates based on the monster that player is fighting 
  monsterHealth = monsters[fighting].health;
  // displays monster Stat window on players screen
  monsterStats.style.display = "block";
  // displays the name of monster that is fighting
  monsterName.innerText = monsters[fighting].name;
  // displays the health of the monster that is fighting
  monsterHealthText.innerText = monsterHealth;
}

// logic for attack logic
function attack() {
  // annouces the monster the player chooses to is attacking
  text.innerText = "The " + monsters[fighting].name + " attacks.";

  // annouces the weapon the player is attacking monster with
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  
  // health starts at 100
  // this calculates the damage dealt by monsters attack
  health -= getMonsterAttackValue(monsters[fighting].level);

  // if statement that uses isMonsterHit function as param
  if (isMonsterHit()) {
    // calculates monsters health after being attack by weapon player uses
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    // if player misses this text is shown
    text.innerText += " You miss.";
  }

  // displays current health after being attacked
  healthText.innerText = health;

  // displays current health for monster after being attacked
  monsterHealthText.innerText = monsterHealth;

  // if statement using player health as param
  if (health <= 0) {
    // if player health is = 0 the player loses
    lose();
  } else if (monsterHealth <= 0) {
    // if player defeats the last monster in game, the player beats the game
    if (fighting === 2) {
      winGame();
    // the player defeated the current monster he challlenged   
    } else {
      defeatMonster();
    }
  }

  // this function is used to determine the chances of players weapon breaking when attacking
  // if it breaks it removes the weapon from players inventory
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

//logic for calculate monsters attack level
function getMonsterAttackValue(level) {
  // calculates base attack value of monster
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  // this line logs attack value for debugging
  console.log(hit);
  // checks if hit is greater then 0, if it is hit is returned if not 0 is
  return hit > 0 ? hit : 0;
}

// deteremins the odds of player hitting the monster with attack
function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

// logic for when player dodges monster
// a sentences annoucing the dodge with the monsters name will appear
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

// logic for when player defeats monster
function defeatMonster() {
  // new evaluation of gold after defeating it
  gold += Math.floor(monsters[fighting].level * 6.7);
  // new evaluation of xp
  xp += monsters[fighting].level;
  // displays new gold amount on screen
  goldText.innerText = gold;
  // displays new xp
  xpText.innerText = xp;
  // shows "kill monster" object data on the screen 
  update(locations[4]);
}

// logic for when player lose
function lose() {
  // calls 6 object in location and data inside object displays on screen
  update(locations[5]);
}

// logic for when player win
function winGame() {
  // calls 7 object in location and data inside object displays on screen
  update(locations[6]);
}

// logic for restarting the game
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

// logic for a easter egg game
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}