let deckId = '';
let cardCount = document.getElementById('cardCount').value;

// Initialize a new deck of cards
function initializeDeck() {
  const deckCount = document.getElementById('deckCount').value;
  fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`)
    .then(response => response.json())
    .then(data => {
      deckId = data.deck_id;
      console.log(`Deck initialized with ID: ${deckId}`);
      document.getElementById('resultMessage').innerText = "New deck shuffled. Start drawing!";
    })
    .catch(error => console.error('Error initializing deck:', error));
}

// Draw card(s) from the deck
function drawCard() {
  cardCount = document.getElementById('cardCount').value;
  if (!deckId) {
    alert('Please reset the deck first!');
    return;
  }

  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardCount}`)
    .then(response => response.json())
    .then(data => {
      const cardDisplay = document.getElementById('cardDisplay');
      const resultMessage = document.getElementById('resultMessage');
      cardDisplay.innerHTML = ''; // Clear previous cards

      let totalValue = 0;

      // Display each drawn card
      data.cards.forEach(card => {
        const img = document.createElement('img');
        img.setAttribute('src', card.image);
        cardDisplay.appendChild(img);

        // Calculate the total value of the drawn cards
        totalValue += getCardValue(card.value);
      });

      // Determine win or lose based on total card value
      if (totalValue <= 21) {
        resultMessage.innerText = `Your total is ${totalValue}. You win! 🎉`;
        resultMessage.style.color = '#28a745';
      } else {
        resultMessage.innerText = `Your total is ${totalValue}. You lose! 😢`;
        resultMessage.style.color = '#dc3545';
      }

      console.log(`Drew ${cardCount} card(s)`);
    })
    .catch(error => console.error('Error drawing card(s):', error));
}

// Get the value of the card for Blackjack
function getCardValue(value) {
  if (value === 'ACE') {
    return 11;
  } else if (['KING', 'QUEEN', 'JACK'].includes(value)) {
    return 10;
  } else {
    return parseInt(value);
  }
}

// Event listeners for buttons
document.getElementById('drawCardBtn').addEventListener('click', drawCard);
document.getElementById('resetGameBtn').addEventListener('click', initializeDeck);

// Initialize the deck when the page loads
initializeDeck();
