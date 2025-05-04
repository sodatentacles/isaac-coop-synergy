const characters = [
    "Isaac", "Magdalene", "Cain", "Judas", "Blue Baby", "Eve", "Samson", "Azazel",
    "Lazarus", "Eden", "Lost", "Lilith", "Keeper", "Apollyon", "Forgotten", "Bethany",
    "Jacob and Esau", "Tainted Isaac", "Tainted Magdalene", "Tainted Cain", "Tainted Judas",
    "Tainted Blue Baby", "Tainted Eve", "Tainted Samson", "Tainted Azazel", "Tainted Lazarus",
    "Tainted Eden", "Tainted Lost", "Tainted Lilith", "Tainted Keeper", "Tainted Apollyon",
    "Tainted Forgotten", "Tainted Bethany", "Tainted Jacob"
  ];
  
  const synergyData = [
    {
      team: ["Blue Baby", "Blue Baby", "Blue Baby", "Blue Baby"],
      text: "1 Fly per Poop per Blue Baby means every room gives 16 flies if there are 4 Blue Babies."
    },
    {
      team: ["Tainted Isaac", "Isaac"],
      text: "Isaac can reroll items Tainted Isaac has already used, meaning you benefit from 1 item twice."
    },
    {
      team: ["Tainted Magdalene", "Tainted Bethany"],
      text: "Hearts dropped by enemies via T.Maggie fuel T.Beth's Lemegeton."
    },
    {
      team: ["Alpha", "Bravo"],
      text: "Alpha synergizes with Bravo for ultimate damage."
    },
    {
      team: ["Alpha", "Charlie"],
      text: "Charlie helps Alpha generate more resources."
    }
  ];
  
  const grid = document.getElementById("character-grid");
  const selectedList = document.getElementById("selected-list");
  const synergyList = document.getElementById("synergy-list");
  const clearBtn = document.getElementById("clear-selection");
  
  let selectedCharacters = [];
  
  function createCharacterButton(name) {
    const btn = document.createElement("button");
    btn.className = "character";
    btn.textContent = name;
    btn.addEventListener("click", () => {
      if (selectedCharacters.length >= 4) return;
      selectedCharacters.push(name);
      updateSelectedList();
      updateSynergies();
    });
    grid.appendChild(btn);
  }
  
  function updateSelectedList() {
    selectedList.innerHTML = "";
    document.querySelectorAll(".character").forEach(btn => btn.classList.remove("selected"));
  
    selectedCharacters.forEach((char, index) => {
      const card = document.createElement("div");
      card.className = "selected-card";
      card.textContent = char;
  
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "×";
      removeBtn.className = "remove";
      removeBtn.onclick = () => {
        selectedCharacters.splice(index, 1);
        updateSelectedList();
        updateSynergies();
      };
  
      card.appendChild(removeBtn);
      selectedList.appendChild(card);
    });
  
    // Highlight selected buttons (for each match, allow multiples)
    selectedCharacters.forEach(char => {
      const buttons = Array.from(document.querySelectorAll(".character"));
      const match = buttons.find(btn => btn.textContent === char && !btn.classList.contains("selected"));
      if (match) match.classList.add("selected");
    });
  }
  
  function updateSynergies() {
    synergyList.innerHTML = "";
    if (selectedCharacters.length < 2) return;
  
    const results = [];
    const seen = new Set();
  
    synergyData.forEach(syn => {
      if (syn.team.every(t => selectedCharacters.includes(t))) {
        const key = syn.team.slice().sort().join(",");
        if (!seen.has(key)) {
          seen.add(key);
          const entry = document.createElement("div");
          entry.className = "synergy-entry";
          entry.textContent = syn.text;
          synergyList.appendChild(entry);
        }
      }
    });
  }
  
  clearBtn.addEventListener("click", () => {
    selectedCharacters = [];
    updateSelectedList();
    updateSynergies();
  });
  
  characters.forEach(createCharacterButton);
  
  // Load handpicked synergies (example only)
  const handpickedList = document.getElementById("handpicked-list");
  const exampleTeams = [
    { team: ["Isaac", "Tainted Isaac"], text: "Isaac + Tainted Isaac combo" },
    { team: ["Samson", "Magdalene", "Tainted Magdalene"], text: "Samson heals well with both versions of Maggie" }
  ];
  
  exampleTeams.forEach(({ team, text }) => {
    const entry = document.createElement("div");
    entry.className = "handpicked-entry";
  
    const teamDiv = document.createElement("div");
    teamDiv.className = "team";
    team.forEach(name => {
      const mini = document.createElement("div");
      mini.className = "selected-card";
      mini.textContent = name;
      teamDiv.appendChild(mini);
    });
  
    const desc = document.createElement("div");
    desc.textContent = text;
  
    entry.appendChild(teamDiv);
    entry.appendChild(desc);
    handpickedList.appendChild(entry);
  });
  