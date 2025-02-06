document.addEventListener("DOMContentLoaded", () => {
    loadPalettes();
    loadFavorites();
});

/**
 * Adds a new color palette to local storage and updates the display.
 */
function addPalette() {
    const name = document.getElementById("palette-name").value.trim();
    const color1 = document.getElementById("color-picker-1").value;
    const color2 = document.getElementById("color-picker-2").value;
    const color3 = document.getElementById("color-picker-3").value;

    if (!name) {
        alert("Please enter a palette name.");
        return;
    }

    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
    const newPalette = { id: Date.now(), name, colors: [color1, color2, color3] };
    palettes.push(newPalette);
    localStorage.setItem("palettes", JSON.stringify(palettes));

    displayPalettes();
    document.getElementById("palette-name").value = "";
}

/**
 * Loads all saved palettes from local storage and displays them.
 */
function loadPalettes() {
    displayPalettes();
}

/**
 * Loads all favorite palettes from local storage and displays them.
 */
function loadFavorites() {
    displayFavorites();
}

/**
 * Displays all stored palettes in the palette list.
 */
function displayPalettes() {
    const paletteList = document.getElementById("palette-list");
    paletteList.innerHTML = "";
    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];

    palettes.forEach(palette => {
        const paletteItem = document.createElement("div");
        paletteItem.classList.add("palette-item");
        paletteItem.innerHTML = `
            <strong>${palette.name}</strong>
            <div style="display: flex; gap: 5px; margin: 10px 0;">
                <div style="width: 30px; height: 30px; background: ${palette.colors[0]}; border-radius: 5px;"></div>
                <div style="width: 30px; height: 30px; background: ${palette.colors[1]}; border-radius: 5px;"></div>
                <div style="width: 30px; height: 30px; background: ${palette.colors[2]}; border-radius: 5px;"></div>
            </div>
            <button onclick="addToFavorites(${palette.id})">Add to Favorites</button>
            <button onclick="deletePalette(${palette.id})">Delete</button>
        `;
        paletteList.appendChild(paletteItem);
    });
}

/**
 * Displays all favorite palettes in the favorites list.
 */
function displayFavorites() {
    const favoritesList = document.getElementById("favorites-list");
    if (!favoritesList) return;
    favoritesList.innerHTML = "";
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.forEach(palette => {
        const favoriteItem = document.createElement("div");
        favoriteItem.classList.add("palette-item");
        favoriteItem.innerHTML = `
            <strong>${palette.name}</strong>
            <div style="display: flex; gap: 5px; margin: 10px 0;">
                <div style="width: 30px; height: 30px; background: ${palette.colors[0]}; border-radius: 5px;"></div>
                <div style="width: 30px; height: 30px; background: ${palette.colors[1]}; border-radius: 5px;"></div>
                <div style="width: 30px; height: 30px; background: ${palette.colors[2]}; border-radius: 5px;"></div>
            </div>
            <button onclick="removeFromFavorites(${palette.id})">Remove</button>
        `;
        favoritesList.appendChild(favoriteItem);
    });
}

/**
 * Adds a palette to the favorites list.
 */
function addToFavorites(id) {
    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const palette = palettes.find(p => p.id === id);
    if (palette && !favorites.some(fav => fav.id === id)) {
        favorites.push(palette);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    displayFavorites();
}

/**
 * Removes a palette from the favorites list.
 */
function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(palette => palette.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
}

/**
 * Generates a simple random color palette.
 * @returns {Array} An array of three random hex color codes.
 */
function generateSimplePalette() {
    const randomColor = () => {
        let color = Math.floor(Math.random() * 16777215).toString(16);
        return `#${color.padStart(6, '0')}`; // Ensures 6 characters (valid HEX)
    };
    return [randomColor(), randomColor(), randomColor()];
}

/**
 * Generates a random color palette and adds it to the list.
 */
function generateRandomPalette() {
    const colors = generateSimplePalette();
    const palette = { 
        id: Date.now(), 
        name: `Palette ${Math.floor(Math.random() * 1000)}`, 
        colors 
    };

    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
    palettes.push(palette);
    localStorage.setItem("palettes", JSON.stringify(palettes));

    displayPalettes();
}

// Ensure the "Generate Palette" button is functional
document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate-palette");
    if (generateButton) {
        generateButton.addEventListener("click", generateRandomPalette);
    }
});

/**
 * Deletes a palette from both the list and favorites.
 */
function deletePalette(id) {
    let palettes = JSON.parse(localStorage.getItem("palettes")) || [];
    palettes = palettes.filter(palette => palette.id !== id);
    localStorage.setItem("palettes", JSON.stringify(palettes));
    
    removeFromFavorites(id);
    displayPalettes();
}

