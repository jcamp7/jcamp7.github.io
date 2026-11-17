document.querySelector("#searchForm").addEventListener("submit", searchCharacters);

async function searchCharacters(event) {
  event.preventDefault();

  let name = document.querySelector("#name").value.trim();
  let species = document.querySelector("#species").value;
  let message = document.querySelector("#message");
  let results = document.querySelector("#results");

  results.textContent = "";

  // Validation: name can't be empty and must be at least 2 characters
  if (name.length < 2) {
    message.textContent = "Please enter at least 2 characters for the name.";
    message.style.color = "#8b0000";
    return;
  }

  message.textContent = "Searching...";
  message.style.color = "black";

  try {
    let url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`;
    if (species !== "") {
      url += `&species=${encodeURIComponent(species)}`;
    }

    let response = await fetch(url);

    // The API returns a 404 when nothing matches
    if (!response.ok) {
      message.textContent = "No characters found. Try a different name or species.";
      message.style.color = "#8b0000";
      return;
    }

    let data = await response.json();
    message.textContent = `Found ${data.info.count} character(s). Showing ${data.results.length}.`;

    for (let character of data.results) {
      let card = document.createElement("div");
      card.className = "card";

      let statusClass = "status-" + character.status.toLowerCase();

      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <div class="card-body">
          <h2>${character.name}</h2>
          <p>Species: ${character.species}</p>
          <p>Status: <span class="${statusClass}">${character.status}</span></p>
          <p>Origin: ${character.origin.name}</p>
        </div>
      `;

      results.appendChild(card);
    }
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    message.style.color = "#8b0000";
    console.error(error);
  }
}