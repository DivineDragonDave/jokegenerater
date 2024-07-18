const apiTextElement = document.getElementById("apiText");
const buttonElement = document.querySelector("button");
const categoriesSelect = document.getElementById("categories");
const typeSelect = document.getElementById("type");

// Funktion för att hämta data från URL:en
function fetchDataFromURL() {
  const selectedCategory = categoriesSelect.value;
  const selectedType = typeSelect.value;

  // Uppdatera URL:en baserat på valda värden
  let apiUrl = `https://v2.jokeapi.dev/joke/${selectedCategory}?type=${selectedType}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Något gick fel med förfrågan");
      }
      return response.json();
    })
    .then((data) => {
      apiTextElement.innerHTML = ""; // Rensa befintligt innehåll

      if (selectedType === "twopart" || selectedType === "Any") {
        // Kontrollera om data innehåller 'setup' och 'delivery' för 'twopart'
        if (data.setup && data.delivery) {
          let setupElement = document.createElement("p");
          setupElement.textContent = ` ${data.setup}`;

          let punchlineElement = document.createElement("p");
          punchlineElement.textContent = ` ${data.delivery}`;

          apiTextElement.appendChild(setupElement);
          apiTextElement.appendChild(punchlineElement);
        } else if (data.joke) {
          // Hantera enkel skämt om 'twopart' inte finns
          apiTextElement.textContent = data.joke;
        }
      } else {
        // Visa enkel text om inte "twopart" används
        apiTextElement.textContent = data.joke;
      }
    })
    .catch((error) => {
      console.error("Fel:", error);
    });
}

// Kör funktionen när sidan laddas
fetchDataFromURL();

// Klick-händelse för knappen
buttonElement.addEventListener("click", fetchDataFromURL);

// Lyssna på ändringar i categories och type select
categoriesSelect.addEventListener("change", fetchDataFromURL);
typeSelect.addEventListener("change", fetchDataFromURL);
