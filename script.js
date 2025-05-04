let selectedCharacters = [];
let mode = 'Hard Mode';  // Default mode is Hard Mode

// Event listeners for mode selection
document.getElementById('hardMode').addEventListener('click', () => {
    mode = 'Hard Mode';
    updateSynergy();
});

document.getElementById('greedMode').addEventListener('click', () => {
    mode = 'Greed Mode';
    updateSynergy();
});

// Event listener for character selection
const characterElements = document.querySelectorAll('.character');
characterElements.forEach(character => {
    character.addEventListener('click', () => {
        const charName = character.dataset.character;
        if (selectedCharacters.length < 4) {
            selectedCharacters.push(charName);
            updateSelectedCharacters();
            updateSynergy();
        }
    });
});

// Clear selections
document.getElementById('clearButton').addEventListener('click', () => {
    selectedCharacters = [];
    updateSelectedCharacters();
    updateSynergy();
});

// Update the display of selected characters
function updateSelectedCharacters() {
    const selectedList = document.getElementById('selectedList');
    selectedList.innerHTML = '';  // Clear current selections

    selectedCharacters.forEach((character, index) => {
        const characterDiv = document.createElement('div');
        const img = document.createElement('img');
        img.src = `images/${character.toLowerCase().replace(' ', '_')}.png`;  // Assuming images are named like 'isaac.png'
        img.alt = character;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => removeCharacter(index));

        characterDiv.appendChild(img);
        characterDiv.appendChild(removeButton);
        selectedList.appendChild(characterDiv);
    });
}

// Remove a character from the selection
function removeCharacter(index) {
    selectedCharacters.splice(index, 1);
    updateSelectedCharacters();
    updateSynergy();
}

// Update synergy display based on selected characters and mode
function updateSynergy() {
    const synergyText = document.getElementById('synergyText');
    if (selectedCharacters.length === 0) {
        synergyText.textContent = 'Select characters to see synergies.';
    } else {
        // Example synergy logic (replace with actual synergies)
        synergyText.textContent = `Synergy for ${mode}: ${selectedCharacters.join(', ')}`;
    }
}
