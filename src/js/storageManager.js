function saveCharacter(character) {
    let characters = JSON.parse(localStorage.getItem('dccCharacters')) || [];
    characters.push(character);
    localStorage.setItem('dccCharacters', JSON.stringify(characters));
    alert("Character Saved!");
}

function loadCharacters() {
    return JSON.parse(localStorage.getItem('dccCharacters')) || [];
}
