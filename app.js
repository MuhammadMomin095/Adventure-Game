// Game variables
var enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
var maxEnemyHealth = 75;
var enemyAttackDamageToHero = 25;
var heroHealth = 100;
var attackDamageToEnemy = 50;
var numHealthPotion = 3;
var healthPotionHealAmount = 30;
var healthPotionDropChance = 50;
var enemyHealth = 0;
var currentEnemy = "";
// UI elements
var gameText = document.getElementById("gameText");
var enemyHealthText = document.getElementById("enemyHealth");
var heroHealthText = document.getElementById("heroHealth");
var potionText = document.getElementById("potionCount");
var attackBtn = document.getElementById("attackBtn");
var potionBtn = document.getElementById("potionBtn");
var runBtn = document.getElementById("runBtn");
// Initialize new enemy
function startNewBattle() {
    var enemyIndex = Math.floor(Math.random() * enemies.length);
    currentEnemy = enemies[enemyIndex];
    enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    gameText.innerText = "A wild ".concat(currentEnemy, " appears! Prepare for battle!");
    updateUI();
}
// Update game UI
function updateUI() {
    enemyHealthText.innerText = "Enemy: ".concat(currentEnemy, " | Health: ").concat(enemyHealth);
    heroHealthText.innerText = "Your Health: ".concat(heroHealth);
    potionText.innerText = "Health Potions: ".concat(numHealthPotion);
}
// Attack enemy
attackBtn.addEventListener("click", function () {
    var damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
    var damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
    enemyHealth -= damageToEnemy;
    heroHealth -= damageToHero;
    gameText.innerText = "You attacked ".concat(currentEnemy, " for ").concat(damageToEnemy, " damage!\n").concat(currentEnemy, " hit you for ").concat(damageToHero, " damage.");
    if (heroHealth <= 0) {
        gameText.innerText = "You have been defeated! Game Over!";
        disableButtons();
    }
    else if (enemyHealth <= 0) {
        gameText.innerText = "Congratulations! You defeated ".concat(currentEnemy, "!");
        disableButtons();
        dropPotion();
    }
    updateUI();
});
// Use health potion
potionBtn.addEventListener("click", function () {
    if (numHealthPotion > 0) {
        heroHealth += healthPotionHealAmount;
        numHealthPotion--;
        gameText.innerText = "You used a health potion and healed for ".concat(healthPotionHealAmount, ".");
    }
    else {
        gameText.innerText = "You have no potions left!";
    }
    updateUI();
});
// Run away
runBtn.addEventListener("click", function () {
    gameText.innerText = "You ran away from ".concat(currentEnemy, "!");
    startNewBattle();
});
// Drop health potion randomly
function dropPotion() {
    if (Math.random() * 100 < healthPotionDropChance) {
        numHealthPotion++;
        gameText.innerText += "\nThe ".concat(currentEnemy, " dropped a health potion!");
    }
}
// Disable buttons after win/lose
function disableButtons() {
    attackBtn.disabled = true;
    potionBtn.disabled = true;
    runBtn.disabled = true;
}
// Start game
startNewBattle();
