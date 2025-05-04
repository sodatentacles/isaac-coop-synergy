const characters = [
    "Isaac", "Magdalene", "Cain", "Judas", "Blue Baby", "Eve", "Samson", "Azazel",
    "Lazarus", "Eden", "Lost", "Lilith", "Keeper", "Apollyon", "Forgotten", "Bethany",
    "Jacob and Esau", "Tainted Isaac", "Tainted Magdalene", "Tainted Cain", "Tainted Judas",
    "Tainted Blue Baby", "Tainted Eve", "Tainted Samson", "Tainted Azazel", "Tainted Lazarus",
    "Tainted Eden", "Tainted Lost", "Tainted Lilith", "Tainted Keeper", "Tainted Apollyon",
    "Tainted Forgotten", "Tainted Bethany", "Tainted Jacob"
  ];
  
  const characterGridRow1 = document.getElementById("character-grid-row-1");
  const characterGridRow2 = document.getElementById("character-grid-row-2");
  const selectedCharactersDiv = document.getElementById("selectedCharacters");
  const synergyOutput = document.getElementById("synergyOutput");
  const modeButtons = document.querySelectorAll('.mode-button');
  const clearButton = document.getElementById("clearButton");
  
  let selectedCharacters = [];
  let currentMode = "Hard";
  
  function createCharacterButton(character) {
    const charBtn = document.createElement("div");
    charBtn.className = "character";
    charBtn.innerHTML = `<img src="images/${character}.png" alt="${character}"><p>${character}</p>`;
    charBtn.addEventListener("click", () => {
      if (selectedCharacters.length < 4) {
        selectedCharacters.push(character);
        updateSelectedDisplay();
        updateSynergies();
      }
    });
    return charBtn;
  }
  
  function updateSelectedDisplay() {
    selectedCharactersDiv.innerHTML = "";
    selectedCharacters.forEach((character, index) => {
      const thumbDiv = document.createElement("div");
      thumbDiv.className = "character-thumbnail";
      thumbDiv.innerHTML = `
        <img src="images/${character}.png" alt="${character}">
        <button class="remove-btn" onclick="removeCharacter(${index})">x</button>
      `;
      selectedCharactersDiv.appendChild(thumbDiv);
    });
  
    const allButtons = document.querySelectorAll(".character");
    allButtons.forEach(btn => btn.classList.remove("selected"));
    selectedCharacters.forEach(char => {
      allButtons.forEach(btn => {
        if (btn.innerText === char) btn.classList.add("selected");
      });
    });
  }
  
  function removeCharacter(index) {
    selectedCharacters.splice(index, 1);
    updateSelectedDisplay();
    updateSynergies();
  }
  
  function updateSynergies() {
    synergyOutput.innerHTML = "";
    if (selectedCharacters.length < 2) return;
  
    const messages = [];
    for (let i = 0; i < selectedCharacters.length; i++) {
      for (let j = i + 1; j < selectedCharacters.length; j++) {
        const pair = [selectedCharacters[i], selectedCharacters[j]];
        const message = getSynergyMessage(pair);
        if (message) messages.push(message);
      }
    }
  
    messages.forEach(msg => {
      const p = document.createElement("p");
      p.textContent = msg;
      synergyOutput.appendChild(p);
    });
  }
  
  function getSynergyMessage(pair) {
    const [a, b] = pair;
    const pairs = {
      "Samson-Tainted Magdalene": "Samson benefits from Tainted Magdalene's health drops.",
      "Samson-Magdalene": "Magdalene can heal Samson's health loss from rage.",
      "Azazel-Tainted Judas": "Azazel covers Tainted Judas during soul form.",
      "Isaac-Tainted Isaac": "Double item rerolls make them a dangerous combo.",
      "Lost-Tainted Lost": "Glass cannon team, high risk, high reward."
    };
    const key1 = `${a}-${b}`;
    const key2 = `${b}-${a}`;
    return pairs[key1] || pairs[key2] || null;
  }
  
  function buildCharacterGrid() {
    for (let i = 0; i < 17; i++) {
      characterGridRow1.appendChild(createCharacterButton(characters[i]));
    }
    for (let i = 17; i < 34; i++) {
      characterGridRow2.appendChild(createCharacterButton(characters[i]));
    }
  }
  
  function updateMode(newMode) {
    currentMode = newMode;
    modeButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.mode-button[data-mode='${newMode}']`).classList.add('active');
    updateSynergies();
  }
  
  clearButton.addEventListener("click", () => {
    selectedCharacters = [];
    updateSelectedDisplay();
    updateSynergies();
  });
  
  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => updateMode(btn.dataset.mode));
  });
  
  buildCharacterGrid();
  updateMode("Hard");
  