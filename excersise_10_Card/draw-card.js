// Function to fetch a random card from the Deck of Cards API
async function fetchRandomCard() {
    const apiURL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';
    
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        if (data.cards && data.cards.length > 0) {
            return data.cards[0]; 
        } else {
            throw new Error('No cards available');
        }
    } catch (error) {
        console.error('Error fetching card:', error);
        throw error;
    }
}

// Function to display the card in the UI
function displayCard(card) {
    const cardDisplay = document.getElementById('cardDisplay');
    cardDisplay.innerHTML = ''; 

    const cardImg = document.createElement('img');
    cardImg.src = card.image; 
    cardImg.alt = `${card.value} of ${card.suit}`; 

    cardDisplay.appendChild(cardImg); 
}

// Function to handle button click and card draw action
async function handleDrawCard() {
    const cardDisplay = document.getElementById('cardDisplay');
    cardDisplay.textContent = 'Drawing card...'; 

    try {
        const card = await fetchRandomCard();
        displayCard(card);
    } catch (error) {
        cardDisplay.textContent = error.message;
    }
}

// Attach event listener to the draw button
document.getElementById('drawBtn').addEventListener('click', handleDrawCard);
