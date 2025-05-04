// JavaScript to handle character selection

// Function to handle character selection and deselection
document.querySelectorAll('.character').forEach(character => {
    character.addEventListener('click', () => {
        // Toggle the 'selected' class to highlight the character
        character.classList.toggle('selected');
        updateSelectedCharacters(); // Update the display of selected characters
    });
});

// Function to update the display of selected characters
function updateSelectedCharacters() {
    const selectedCharactersContainer = document.querySelector('.selected-characters');
    selectedCharactersContainer.innerHTML = ''; // Clear previous selections

    // Get all selected characters
    const selectedCharacters = document.querySelectorAll('.character.selected');

    selectedCharacters.forEach(character => {
        // Create a container for the selected character
        const characterName = character.getAttribute('data-character');
        const characterImage = character.querySelector('img').src;
        
        const characterDiv = document.createElement('div');
        const characterImg = document.createElement('img');
        const characterP = document.createElement('p');
        
        characterImg.src = characterImage;
        characterP.textContent = characterName;

        characterDiv.appendChild(characterImg);
        characterDiv.appendChild(characterP);

        // Add an "X" to remove the selected character
        const removeButton = document.createElement('span');
        removeButton.textContent = 'X';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            character.classList.remove('selected'); // Deselect the character
            updateSelectedCharacters(); // Update the display of selected characters
        });
        
        characterDiv.appendChild(removeButton);

        selectedCharactersContainer.appendChild(characterDiv);
    });
}

// Function to clear selections
document.querySelector('.clear-button').addEventListener('click', () => {
    document.querySelectorAll('.character').forEach(character => {
        character.classList.remove('selected'); // Remove the 'selected' class
    });
    updateSelectedCharacters(); // Clear the selected characters display
});
