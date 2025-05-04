const characters = [
    "Isaac", "Magdalene", "Cain", "Judas", "Blue Baby", "Eve", "Samson",
    "Azazel", "Lazarus", "Eden", "Lost", "Lilith", "Keeper", "Apollyon",
    "Forgotten", "Bethany", "Jacob and Esau", "Tainted Isaac", "Tainted Magdalene",
    "Tainted Cain", "Tainted Judas", "Tainted Blue Baby", "Tainted Eve",
    "Tainted Samson", "Tainted Azazel", "Tainted Lazarus", "Tainted Eden",
    "Tainted Lost", "Tainted Lilith", "Tainted Keeper", "Tainted Apollyon",
    "Tainted Forgotten", "Tainted Bethany", "Tainted Jacob"
  ];
  
  const synergyData = {
    "hard|Isaac,Isaac": "Hard Mode Isaac duo synergy: Very balanced and safe!",
    "greed|Blue Baby,Blue Baby,Blue Baby,Blue Baby": "4x Blue Baby in Greed Mode: unholy tanky chaos!",
    // Add more combinations below
  };
  
  let selected = [];
  
  function createCharacterButtons() {
    const container = document.getElementById('character-buttons');
    characters.forEach(char => {
      const btn = document.createElement('button');
      btn.innerText = char;
      btn.onclick = () => selectCharacter(char);
      container.appendChild(btn);
    });
  }
  
  function selectCharacter(char) {
    if (selected.length >= 4) {
      alert("You can select up to 4 characters.");
      return;
    }
    selected.push(char);
    alert(`Selected: ${selected.join(", ")}`);
  }
  
  function updateSynergies() {
    if (selected.length < 2 || selected.length > 4) {
      alert("Please select between 2 and 4 characters.");
      return;
    }
  
    const mode = document.getElementById('mode').value;
    const key = `${mode}|${selected.sort().join(",")}`;
    const result = synergyData[key] || "No synergy data for this combination yet.";
    document.getElementById('synergy-result').innerText = result;
    selected = [];
  }
  
  createCharacterButtons();  