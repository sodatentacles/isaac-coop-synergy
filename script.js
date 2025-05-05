document.addEventListener('DOMContentLoaded', function() {
    // Store the current selected characters
    const selectedCharacters = [];
    const maxSelectedCharacters = 4;
    
    // Character synergy data
    const synergies = {
        // Positive synergies
        positive: [
            {
                characters: ['isaac', 'tainted_isaac'],
                description: 'Butterfly Truck'
            },
            {
                characters: ['blue_baby', 'blue_baby', 'blue_baby', 'blue_baby'],
                description: 'The Bloo Man Group'
            },
            // Add more positive synergies here as needed
        ],
        // Negative synergies
        negative: [
            {
                characters: ['tainted_lazarus', 'tainted_lazarus'],
                description: 'Duck Blaster'
            },
            {
                characters: ['lost', 'keeper'],
                description: 'No Freebies'
            },
            {
                characters: ['lost', 'tainted_keeper'],
                description: 'No Freebies'
            },
            {
                characters: ['bethany', 'tainted_bethany'],
                description: 'Resource Hogging'
            },
            // Add more negative synergies here as needed
        ]
    };

    // Predefined teams
    const teams = {
        team1: ['isaac', 'tainted_isaac'],
        team2: ['blue_baby', 'blue_baby', 'blue_baby', 'blue_baby'],
        team3: ['tainted_lazarus', 'tainted_lazarus'],
        team4: ['lost', 'keeper'],
        team5: ['bethany', 'tainted_bethany']
    };

    // Character interactions (which characters have positive/negative effects on others)
    const characterInteractions = {
        isaac: {
            positive: ['tainted_isaac'],
            negative: []
        },
        tainted_isaac: {
            positive: ['isaac'],
            negative: []
        },
        blue_baby: {
            positive: ['blue_baby'],
            negative: []
        },
        tainted_lazarus: {
            positive: [],
            negative: ['tainted_lazarus']
        },
        lost: {
            positive: [],
            negative: ['keeper', 'tainted_keeper']
        },
        keeper: {
            positive: [],
            negative: ['lost']
        },
        tainted_keeper: {
            positive: [],
            negative: ['lost']
        },
        bethany: {
            positive: [],
            negative: ['tainted_bethany']
        },
        tainted_bethany: {
            positive: [],
            negative: ['bethany']
        }
        // Add more interactions as needed
    };

    // Get all character elements
    const characterElements = document.querySelectorAll('.character');
    
    // Get all slot elements
    const slotElements = document.querySelectorAll('.slot');
    
    // Get the clear button
    const clearButton = document.querySelector('.clear-button');
    
    // Get output columns
    const positiveColumn = document.querySelector('.positive-column');
    const negativeColumn = document.querySelector('.negative-column');

    // Get all team elements
    const teamElements = document.querySelectorAll('.team');

    // Initialize character click events
    characterElements.forEach(characterElement => {
        characterElement.addEventListener('click', () => {
            const characterId = characterElement.getAttribute('data-character');
            
            // Check if we can add more characters
            if (selectedCharacters.length < maxSelectedCharacters) {
                // Add character to the next available slot
                const nextSlot = selectedCharacters.length;
                selectedCharacters.push(characterId);
                
                // Update slot display
                updateSlot(nextSlot, characterId);
                
                // Update synergies
                updateSynergies();
                
                // Update character interactions
                updateCharacterInteractions();
            }
        });
    });

// Initialize slot click events (for removing characters)
slotElements.forEach((slotElement, index) => {
    slotElement.addEventListener('click', () => {
        if (index < selectedCharacters.length) {
            // Remove character from the selected list
            selectedCharacters.splice(index, 1);
            
            // Shift all characters after this slot
            for (let i = index; i < maxSelectedCharacters - 1; i++) {
                if (i < selectedCharacters.length) {
                    updateSlot(i, selectedCharacters[i]);
                } else {
                    clearSlot(i);
                }
            }
            
            // Clear the last slot if we had max characters
            if (selectedCharacters.length < maxSelectedCharacters) {
                clearSlot(selectedCharacters.length);
            }
            
            // Update synergies
            updateSynergies();
            
            // Update character interactions
            updateCharacterInteractions();
        }
    });
});

    // Clear button functionality
    clearButton.addEventListener('click', () => {
        // Clear selected characters array
        selectedCharacters.length = 0;
        
        // Clear all slots
        for (let i = 0; i < maxSelectedCharacters; i++) {
            clearSlot(i);
        }
        
        // Clear synergies
        clearSynergies();
        
        // Reset character interactions
        resetCharacterInteractions();
    });

    // Team selection functionality
    teamElements.forEach(teamElement => {
        teamElement.addEventListener('click', () => {
            const teamId = teamElement.getAttribute('data-team');
            const teamCharacters = teams[teamId];
            
            // Clear current selection
            selectedCharacters.length = 0;
            
            // Add team characters to selection
            for (let i = 0; i < teamCharacters.length && i < maxSelectedCharacters; i++) {
                selectedCharacters.push(teamCharacters[i]);
                updateSlot(i, teamCharacters[i]);
            }
            
            // Clear any remaining slots
            for (let i = teamCharacters.length; i < maxSelectedCharacters; i++) {
                clearSlot(i);
            }
            
            // Update synergies
            updateSynergies();
            
            // Update character interactions
            updateCharacterInteractions();
        });
    });

    // Function to update a slot with a character
    function updateSlot(slotIndex, characterId) {
        const slotElement = slotElements[slotIndex];
        
        // Get the character image and name
        const characterElement = document.querySelector(`.character[data-character="${characterId}"]`);
        const characterImg = characterElement.querySelector('img').src;
        const characterName = characterElement.querySelector('span').textContent;
        
        // Update the slot
        slotElement.innerHTML = `
            <img src="${characterImg}" alt="${characterName}">
            <span>${characterName}</span>
        `;
    }

    // Function to clear a slot
    function clearSlot(slotIndex) {
        const slotElement = slotElements[slotIndex];
        slotElement.innerHTML = '<span class="empty">EMPTY</span>';
    }

    // Function to update synergies based on selected characters
    function updateSynergies() {
        // Clear existing synergies
        clearSynergies();
        
        if (selectedCharacters.length === 0) {
            return;
        }
        
        // Check for positive synergies
        synergies.positive.forEach(synergy => {
            if (checkSynergyMatch(synergy.characters, selectedCharacters)) {
                addSynergyToOutput(synergy, 'positive');
            }
        });
        
        // Check for negative synergies
        synergies.negative.forEach(synergy => {
            if (checkSynergyMatch(synergy.characters, selectedCharacters)) {
                addSynergyToOutput(synergy, 'negative');
            }
        });
    }

    // Function to check if selected characters match a synergy
    function checkSynergyMatch(synergyChars, selectedChars) {
        // Create copies of arrays to work with
        const synergyCopy = [...synergyChars];
        const selectedCopy = [...selectedChars];
        
        // For each character in the synergy, check if it's in the selection
        for (let i = 0; i < synergyCopy.length; i++) {
            const charIndex = selectedCopy.indexOf(synergyCopy[i]);
            
            if (charIndex === -1) {
                return false; // Character not found in selection
            }
            
            // Remove the matched character to prevent double counting
            selectedCopy.splice(charIndex, 1);
        }
        
        return true;
    }

    // Function to add a synergy to the output
    function addSynergyToOutput(synergy, type) {
        const column = type === 'positive' ? positiveColumn : negativeColumn;
        
        // Create the synergy HTML
        const synergyHTML = document.createElement('div');
        synergyHTML.className = `synergy-item ${type}-synergy synergy-new`;
        
        // Create characters section
        const charactersDiv = document.createElement('div');
        charactersDiv.className = 'characters';
        
        synergy.characters.forEach(char => {
            const charElement = document.querySelector(`.character[data-character="${char}"]`);
            const charImg = charElement.querySelector('img').src;
            
            const imgElement = document.createElement('img');
            imgElement.src = charImg;
            imgElement.alt = char;
            
            charactersDiv.appendChild(imgElement);
        });
        
        // Create description
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'description';
        descriptionDiv.textContent = synergy.description;
        
        // Add to synergy item
        synergyHTML.appendChild(charactersDiv);
        synergyHTML.appendChild(descriptionDiv);
        
        // Add to output column
        column.appendChild(synergyHTML);
    }

    // Function to clear all synergies
    function clearSynergies() {
        positiveColumn.innerHTML = '';
        negativeColumn.innerHTML = '';
    }

    // Function to update character interactions
    function updateCharacterInteractions() {
        // Reset all interactions first
        resetCharacterInteractions();
        
        if (selectedCharacters.length === 0) {
            return;
        }
        
        // For each selected character
        selectedCharacters.forEach(selectedChar => {
            // Skip if no interactions defined for this character
            if (!characterInteractions[selectedChar]) {
                return;
            }
            
            // Get the character's interactions
            const interactions = characterInteractions[selectedChar];
            
            // Apply positive interactions
            if (interactions.positive && interactions.positive.length > 0) {
                interactions.positive.forEach(positiveChar => {
                    const charElements = document.querySelectorAll(`.character[data-character="${positiveChar}"]`);
                    charElements.forEach(element => {
                        element.classList.add('positive');
                        element.classList.remove('negative');
                    });
                });
            }
            
            // Apply negative interactions
            if (interactions.negative && interactions.negative.length > 0) {
                interactions.negative.forEach(negativeChar => {
                    const charElements = document.querySelectorAll(`.character[data-character="${negativeChar}"]`);
                    charElements.forEach(element => {
                        // Only apply negative if not already positive
                        if (!element.classList.contains('positive')) {
                            element.classList.add('negative');
                        }
                    });
                });
            }
        });
    }

    // Function to reset all character interactions
    function resetCharacterInteractions() {
        characterElements.forEach(element => {
            element.classList.remove('positive', 'negative');
        });
    }
                