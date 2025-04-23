function saveCharacter(character) {
    let characters = JSON.parse(localStorage.getItem('dccCharacters')) || [];
    characters.push(character);
    localStorage.setItem('dccCharacters', JSON.stringify(characters));
    alert("Character Saved!");
}

function ensureModifiers(character) {
    if (!character.modifiers) {
        character.modifiers = {
            strength: getModifier(character.strength),
            agility: getModifier(character.agility),
            stamina: getModifier(character.stamina),
            personality: getModifier(character.personality),
            intelligence: getModifier(character.intelligence),
            luck: getModifier(character.luck)
        };
    }
    return character;
}

function loadCharacter(index) {
    const characters = getSavedCharacters();
    let character = characters[index];

    if (character && character.strength !== undefined) {
        character = ensureModifiers(character);
        displayCharacter(character);
        populateWeaponSelectors();
        bootstrap.Modal.getInstance(document.getElementById('loadCharactersModal')).hide();
    } else {
        alert("Error: This saved character is incomplete.");
    }
}

function getSavedCharacters() {
    return JSON.parse(localStorage.getItem('dccCharacters')) || [];
}

function deleteCharacter(index) {
    let characters = getSavedCharacters();
    if (characters[index]) {
        if (confirm(`Delete ${characters[index].name} the ${characters[index].class}?`)) {
            characters.splice(index, 1);
            localStorage.setItem('dccCharacters', JSON.stringify(characters));
            alert("Character deleted.");
            document.getElementById('load-btn').click();  // Refresh modal list
        }
    }
}