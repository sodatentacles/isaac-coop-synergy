document.addEventListener('DOMContentLoaded', () => {
    const characterButtons = document.querySelectorAll('.character');
    const selectedCharactersContainer = document.querySelector('.selected-characters');
    const synergyResultsContainer = document.querySelector('.synergy-output');
    const clearButton = document.querySelector('.clear-button');
    let selectedCharacters = [];

    // Handpicked Synergies (WIP)
    const handpickedSynergies = [
        {
            characters: ['Blue Baby', 'Blue Baby'],
            synergy: 'More Flies from more Poops.',
            image: 'images/blue_baby.png'
        },
        {
            characters: ['Isaac', 'Tainted Isaac'],
            synergy: 'Isaac can reroll items Tainted Isaac drops and already used, giving 2 uses out of 1 item.',
            image: 'images/isaac.png'
        },
        // Add more synergies as needed
    ];

    // Handle character selection
    characterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const characterName = button.getAttribute('data-character');

            // Add selected character if it's not full
            if (selectedCharacters.length < 4) {
                selectedCharacters.push(characterName);
                updateSelectedCharacters();
                showSynergies();
            }
        });
    });

    // Remove a character from the selected list
    selectedCharactersContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('selected-character')) {
            const characterToRemove = event.target.getAttribute('data-character');
            selectedCharacters = selectedCharacters.filter(char => char !== characterToRemove);
            updateSelectedCharacters();
            showSynergies();
        }
    });

    // Clear all selections
    clearButton.addEventListener('click', () => {
        selectedCharacters = [];
        updateSelectedCharacters();
        synergyResultsContainer.innerHTML = '';
    });

    // Update the selected characters section
    function updateSelectedCharacters() {
        selectedCharactersContainer.innerHTML = ''; // Clear current selections
        selectedCharacters.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('selected-character');
            characterDiv.setAttribute('data-character', character);
            const characterImage = document.createElement('img');
            characterImage.src = `images/${character.toLowerCase().replace(/\s+/g, '_')}.png`;
            characterDiv.appendChild(characterImage);
            selectedCharactersContainer.appendChild(characterDiv);
        });
    }

    // Show synergies based on selected characters
    function showSynergies() {
        synergyResultsContainer.innerHTML = ''; // Clear current synergies

        // Filter synergies that match selected characters
        handpickedSynergies.forEach(synergy => {
            const synergyCharacters = synergy.characters;
            if (selectedCharacters.includes(synergyCharacters[0]) && selectedCharacters.includes(synergyCharacters[1])) {
                const synergyDiv = document.createElement('div');
                synergyDiv.classList.add('synergy-entry');
                const synergyImage = document.createElement('img');
                synergyImage.src = synergy.image;
                const synergyText = document.createElement('p');
                synergyText.textContent = `${synergyCharacters.join(' + ')}: ${synergy.synergy}`;
                synergyDiv.appendChild(synergyImage);
                synergyDiv.appendChild(synergyText);
                synergyResultsContainer.appendChild(synergyDiv);
            }
        });
    }
});
