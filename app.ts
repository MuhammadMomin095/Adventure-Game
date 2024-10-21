// Game variables
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;

let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPotion = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;

let enemyHealth = 0;
let currentEnemy = "";

// UI elements
const gameText = document.getElementById("gameText")!;
const enemyHealthText = document.getElementById("enemyHealth")!;
const heroHealthText = document.getElementById("heroHealth")!;
const potionText = document.getElementById("potionCount")!;

const attackBtn = document.getElementById("attackBtn")!;
const potionBtn = document.getElementById("potionBtn")!;
const runBtn = document.getElementById("runBtn")!;

// Initialize new enemy
function startNewBattle() {
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    currentEnemy = enemies[enemyIndex];
    enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);

    gameText.innerText = `A wild ${currentEnemy} appears! Prepare for battle!`;
    updateUI();
}

// Update game UI
function updateUI() {
    enemyHealthText.innerText = `Enemy: ${currentEnemy} | Health: ${enemyHealth}`;
    heroHealthText.innerText = `Your Health: ${heroHealth}`;
    potionText.innerText = `Health Potions: ${numHealthPotion}`;
}

// Attack enemy
attackBtn.addEventListener("click", () => {
    let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
    let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);

    enemyHealth -= damageToEnemy;
    heroHealth -= damageToHero;

    gameText.innerText = `You attacked ${currentEnemy} for ${damageToEnemy} damage!\n${currentEnemy} hit you for ${damageToHero} damage.`;

    if (heroHealth <= 0) {
        gameText.innerText = "You have been defeated! Game Over!";
        disableButtons();
    } else if (enemyHealth <= 0) {
        gameText.innerText = `Congratulations! You defeated ${currentEnemy}!`;
        disableButtons();
        dropPotion();
    }

    updateUI();
});

// Use health potion
potionBtn.addEventListener("click", () => {
    if (numHealthPotion > 0) {
        heroHealth += healthPotionHealAmount;
        numHealthPotion--;
        gameText.innerText = `You used a health potion and healed for ${healthPotionHealAmount}.`;
    } else {
        gameText.innerText = "You have no potions left!";
    }
    updateUI();
});

// Run away
runBtn.addEventListener("click", () => {
    gameText.innerText = `You ran away from ${currentEnemy}!`;
    startNewBattle();
});

// Drop health potion randomly
function dropPotion() {
    if (Math.random() * 100 < healthPotionDropChance) {
        numHealthPotion++;
        gameText.innerText += `\nThe ${currentEnemy} dropped a health potion!`;
    }
}

// Disable buttons after win/lose
function disableButtons() {
    (attackBtn as HTMLButtonElement).disabled = true;
    (potionBtn as HTMLButtonElement).disabled = true;
    (runBtn as HTMLButtonElement).disabled = true;
}

// Start game
startNewBattle();
