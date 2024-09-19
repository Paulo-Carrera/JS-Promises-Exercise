const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

// First block for drawing one card
axios.get(url)
    .then(res => {
        const deckId = res.data.deck_id;
        return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    })
    .then(res => {
        const card = res.data.cards[0];
        const cardItem = document.createElement('div');
        cardItem.className = 'card-item';

        const img = document.createElement('img');
        img.src = card.image;

        const cardDetails = document.createElement('div');
        cardDetails.className = 'card-details';
        
        const value = document.createElement('p');
        value.textContent = card.value;

        const suit = document.createElement('p');
        suit.textContent = card.suit;

        cardDetails.appendChild(value);
        cardDetails.appendChild(suit);
        cardItem.appendChild(img);
        cardItem.appendChild(cardDetails);

        const cardContainer = document.getElementById('card'); // Targeting "card" div
        cardContainer.appendChild(cardItem);
    })
    .catch(err => {
        console.log(err);
    });

// Second block for drawing two cards
axios.get(url)
    .then(res => {
        const deckId = res.data.deck_id;
        return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    })
    .then(res => {
        const cards = res.data.cards;
        const cardsContainer = document.getElementById('cards'); // Targeting "cards" div

        cards.forEach(card => {
            const cardItem = document.createElement('div');
            cardItem.className = 'card-item';

            const img = document.createElement('img');
            img.src = card.image;

            const cardDetails = document.createElement('div');
            cardDetails.className = 'card-details';
            
            const value = document.createElement('p');
            value.textContent = card.value;

            const suit = document.createElement('p');
            suit.textContent = card.suit;

            cardDetails.appendChild(value);
            cardDetails.appendChild(suit);
            cardItem.appendChild(img);
            cardItem.appendChild(cardDetails);

            cardsContainer.appendChild(cardItem);
        });
    })
    .catch(err => {
        console.log(err);
    });

// Third block for drawing cards
const remainingCardsText = document.getElementById('remaining-cards');
const cardsContainer = document.getElementById('card-list'); 
const drawButton = document.getElementById('draw-button');
let deckId;
let cardCount = 0; 

axios.get(url)
    .then(res => {
        deckId = res.data.deck_id;
        remainingCardsText.textContent = `Remaining cards: ${res.data.remaining}`; // Display remaining cards
    })
    .catch(err => {
        console.log(err);
    });

drawButton.addEventListener('click', () => {
    if (deckId) {
        axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(res => {
                if (res.data.remaining === 0) {
                    drawButton.disabled = true; // Disable button when no cards are left
                    remainingCardsText.textContent = 'No cards left in the deck! Refresh the page!';
                } else {
                    const card = res.data.cards[0];
                    const img = document.createElement('img');
                    img.src = card.image;
                    img.style.transform = `translate(${cardCount * 10}px, ${cardCount * 10}px)`; // Stack cards
                    img.style.zIndex = cardCount; // Ensure proper stacking order

                    // Add the new card to the "card-list" container
                    cardsContainer.appendChild(img);

                    // Update remaining card count
                    remainingCardsText.textContent = `Remaining cards: ${res.data.remaining}`;
                    cardCount++; 
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
});



