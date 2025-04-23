document.getElementById('generate-btn').addEventListener('click', () => {
    const character = generateCharacter();
    displayCharacter(character);
    populateWeaponSelectors()
});

document.getElementById('save-btn').addEventListener('click', () => {
    const character = currentCharacter;
    saveCharacter(character);
});

document.getElementById('load-btn').addEventListener('click', () => {
    const characters = loadCharacters();
    alert(`You have ${characters.length} saved characters.`);
});

let currentCharacter = {};

function displayCharacter(character) {
    currentCharacter = character;
    const sheet = document.getElementById('character-sheet');

    sheet.innerHTML = `
        <h3 class="text-center">${character.name} the ${character.class}</h3>
        <div class="row text-center my-3">
            ${renderStat("Strength", character.strength, character.modifiers.strength)}
            ${renderStat("Agility", character.agility, character.modifiers.agility)}
            ${renderStat("Stamina", character.stamina, character.modifiers.stamina)}
            ${renderStat("Personality", character.personality, character.modifiers.personality)}
            ${renderStat("Intelligence", character.intelligence, character.modifiers.intelligence)}
            ${renderStat("Luck", character.luck, character.modifiers.luck)}
        </div>
        <p class="text-center"><strong>HP:</strong> ${character.hp}</p>
        <p><strong>Equipment:</strong> ${character.equipment.join(", ")}</p>
    `;
}

function renderStat(label, score, mod) {
    return `
        <div class="col-md-4 mb-2">
            <div class="border rounded p-2 bg-white">
                <strong>${label}:</strong> ${score} 
                <span class="text-muted">(${formatMod(mod)})</span>
            </div>
        </div>
    `;
}

function formatMod(mod) {
    return mod >= 0 ? `+${mod}` : `${mod}`;
}

function performAttack(weaponName, character) {
    const weapon = weapons.find(w => w.name === weaponName);
    if (!weapon) return "Weapon not found!";

    const attackRoll = rollDie(20) +
        (weapon.type === "Melee" ? character.modifiers.strength : character.modifiers.agility);

    const damage = rollDiceNotation(weapon.damage);

    return `🎲 Attack Roll with ${weapon.name}: ${attackRoll} to hit | Damage: ${damage} ${weapon.damage}`;
}

function populateWeaponSelectors() {
    const meleeSelect = document.getElementById('melee-weapon');
    const rangedSelect = document.getElementById('ranged-weapon');

    weapons.filter(w => w.type === "Melee")
        .forEach(w => meleeSelect.innerHTML += `<option value="${w.name}">${w.name} (${w.damage})</option>`);

    weapons.filter(w => w.type === "Ranged")
        .forEach(w => rangedSelect.innerHTML += `<option value="${w.name}">${w.name} (${w.damage})</option>`);
}

document.getElementById('melee-attack-btn').addEventListener('click', () => {
    const weapon = document.getElementById('melee-weapon').value;
    showAttackResult(performAttack(weapon, currentCharacter));
});

document.getElementById('ranged-attack-btn').addEventListener('click', () => {
    const weapon = document.getElementById('ranged-weapon').value;
    showAttackResult(performAttack(weapon, currentCharacter));
});

function showAttackResult(result) {
    const resultDiv = document.getElementById('attack-result');
    resultDiv.textContent = result;
    resultDiv.classList.remove('d-none');
}
