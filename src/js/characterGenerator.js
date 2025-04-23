const weapons = [
    { name: "Dagger", type: "Melee", damage: "1d4" },
    { name: "Short Sword", type: "Melee", damage: "1d6" },
    { name: "Long Sword", type: "Melee", damage: "1d8" },
    { name: "Battleaxe", type: "Melee", damage: "1d10" },
    { name: "Sling", type: "Ranged", damage: "1d4" },
    { name: "Shortbow", type: "Ranged", damage: "1d6" },
    { name: "Longbow", type: "Ranged", damage: "1d8" },
    { name: "Crossbow", type: "Ranged", damage: "1d6" }
];

function rollDice(sides = 6, times = 3) {
    let total = 0;
    for (let i = 0; i < times; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
}

function generateCharacter() {
    const stats = {
        strength: rollDice(),
        agility: rollDice(),
        stamina: rollDice(),
        personality: rollDice(),
        intelligence: rollDice(),
        luck: rollDice()
    };

    return {
        name: "Unnamed Adventurer",
        ...stats,
        modifiers: {
            strength: getModifier(stats.strength),
            agility: getModifier(stats.agility),
            stamina: getModifier(stats.stamina),
            personality: getModifier(stats.personality),
            intelligence: getModifier(stats.intelligence),
            luck: getModifier(stats.luck)
        },
        class: getRandomClass(),
        hp: rollDice(4, 1),
        equipment: ["Torch", "Rations", "Dagger"]
    };
}

function getRandomClass() {
    const classes = ["Warrior", "Wizard", "Cleric", "Thief", "Dwarf", "Elf", "Halfling"];
    return classes[Math.floor(Math.random() * classes.length)];
}

function getModifier(score) {
    if (score === 3) return -3;
    if (score >= 4 && score <= 5) return -2;
    if (score >= 6 && score <= 8) return -1;
    if (score >= 9 && score <= 12) return 0;
    if (score >= 13 && score <= 15) return +1;
    if (score >= 16 && score <= 17) return +2;
    if (score === 18) return +3;
    return 0;  // Fallback for edge cases
}

function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function rollDiceNotation(notation) {
    const [num, sides] = notation.split('d').map(Number);
    let total = 0;
    for (let i = 0; i < num; i++) {
        total += rollDie(sides);
    }
    return total;
}
