// Function to fetch character data from the API
async function fetchCharacterData(characterName) {
    const apiURL = `https://www.swapi.tech/api/people/?name=${characterName}`;
    
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        
        if (data.result && data.result.length > 0) {
            return data.result[0].properties; 
        } else {
            throw new Error('Character not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to update the UI with the character data
function displayCharacterData(character) {
    const output = document.getElementById('output');
    const formattedData = `
        Name: ${character.name}
        Height: ${character.height} cm
        Mass: ${character.mass} kg
        Gender: ${character.gender}
        Hair Color: ${character.hair_color}
    `;
    output.textContent = formattedData;
}

// Function to handle button click and search action
async function handleSearch() {
    const characterName = document.getElementById('characterName').value;
    const output = document.getElementById('output');
    output.textContent = 'Loading...'; 

    try {
        const characterData = await fetchCharacterData(characterName);
        displayCharacterData(characterData); 
    } catch (error) {
        output.textContent = error.message; 
    }
}

// Attach event listener to the search button
document.getElementById('searchBtn').addEventListener('click', handleSearch);
