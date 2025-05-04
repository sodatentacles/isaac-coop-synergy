const characters = [
    "Isaac", "Magdalene", "Cain", "Judas", "Blue Baby", "Eve", "Samson", "Azazel",
    "Lazarus", "Eden", "Lost", "Lilith", "Keeper", "Apollyon", "Forgotten", "Bethany",
    "Jacob and Esau", "Tainted Isaac", "Tainted Magdalene", "Tainted Cain", "Tainted Judas",
    "Tainted Blue Baby", "Tainted Eve", "Tainted Samson", "Tainted Azazel", "Tainted Lazarus",
    "Tainted Eden", "Tainted Lost", "Tainted Lilith", "Tainted Keeper", "Tainted Apollyon",
    "Tainted Forgotten", "Tainted Bethany", "Tainted Jacob"
  ];
  
  const synergies = [
    { pair: ["Isaac", "Tainted Cain"], description: "Alpha synergy: Isaac benefits from Tainted Cain's crafting." },
    { pair: ["Magdalene", "Samson"], description: "Bravo synergy: Magdalene's healing supports Samson's rage." },
    { pair: ["Blue Baby", "Tainted Blue Baby"], description: "Charlie synergy: Double Blue Babies create poop chaos." },
    { pair: ["Eve", "Tainted Eve"], description: "Delta synergy: Eve teams balance offense and bloodlust." },
    { pair: ["Cain", "Tainted Judas"], description: "Echo synergy: High damage pairing for critical runs." }
  ];
  
  const selectedCharacters = [];
  
  function formatCharacterName(name) {
    return name.toLowerCase().replace(/ /g, "-");
  }
  
  function updateSelectedCharacters() {
    const container = document.getElementById("selectedCharacters");
    container.innerHTML = "";
    selectedCharacters.forEach((char, index) => {
      const div = document.createElement("div");
      div.classList.add("character", "selected");
      div.innerHTML = `
        <img src="images/${formatCharacterName(char)}.png" alt="${char}">
        <p>${char}</p>
        <button class="remove-btn" onclick="removeCharacter(${index})">x</button>
      `;
      container.appendChild(div);
    });
  
    updateSynergyResults();
  }
  
  function removeCharacter(index) {
    selectedCharacters.splice(index, 1);
    updateSelectedCharacters();
  }
  
  function updateSynergyResults() {
    const output = document.getElementById("synergyOutput");
    output.innerHTML = "";
  
    if (selectedCharacters.length < 2) return;
  
    const uniquePairs = new Set();
    const synergyMessages = [];
  
    for (let i = 0; i < selectedCharacters.length; i++) {
      for (let j = i + 1; j < selectedCharacters.length; j++) {
        const a = selectedCharacters[i];
        const b = selectedCharacters[j];
  
        const combo1 = synergies.find(s =>
          (s.pair[0] === a && s.pair[1] === b) || (s.pair[0] === b && s.pair[1] === a)
        );
  
        const pairKey = [a, b].sort().join("|");
        if (!uniquePairs.has(pairKey) && combo1) {
          uniquePairs.add(pairKey);
          synergyMessages.push(`<p>${combo1.description}</p>`);
        }
      }
    }
  
    output.innerHTML = synergyMessages.length ? synergyMessages.join("") : "<p>No known synergies between selected characters.</p>";
  }
  
  function clearSelections() {
    selectedCharacters.length = 0;
    updateSelectedCharacters();
  
    document.querySelectorAll(".character").forEach(btn => {
      btn.classList.remove("selected");
    });
  }
  
  function addCharacter(char) {
    if (selectedCharacters.length >= 4) return;
  
    selectedCharacters.push(char);
    updateSelectedCharacters();
  }
  
  window.onload = () => {
    const row1 = document.getElementById("character-grid-row-1");
    const row2 = document.getElementById("character-grid-row-2");
  
    characters.forEach((char, index) => {
      const charElement = document.createElement("div");
      charElement.classList.add("character");
      charElement.innerHTML = `
        <img src="images/${formatCharacterName(char)}.png" alt="${char}">
        <p>${char}</p>
      `;
      charElement.addEventListener("click", () => {
        if (selectedCharacters.length < 4) {
          addCharacter(char);
        }
      });
  
      if (index < 17) {
        row1.appendChild(charElement);
      } else {
        row2.appendChild(charElement);
      }
    });
  
    document.getElementById("clearButton").addEventListener("click", clearSelections);
  };
  