const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
];

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
    }
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value);
        });
    });
}

class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }

    get numberOfCards() {
        return this.cards.length;
    }

    pop() {
        if (this.numberOfCards === 0) {
            throw new Error("No cards left in the deck.");
        }
        return this.cards.pop();
    }

    push(card) {
        this.cards.push(card);
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}

let playerHand = [];
let compHand = [];
let warArray = [];

const deck = new Deck();
deck.shuffle();

function dealCards() {
    while (deck.numberOfCards > 0) {
        playerHand.push(deck.pop());
        compHand.push(deck.pop());
    }
}

dealCards();

function displayCards() {
    if (playerHand.length === 0 || compHand.length === 0) {
        alert("No more cards to draw.");
        return;
    }

    const playerCard = playerHand[0];
    const compCard = compHand[0];

    alert(`Player draws: ${playerCard.value} of ${playerCard.suit}\nComputer draws: ${compCard.value} of ${compCard.suit}`);

    compare(playerCard, compCard);
}

function compare(playerCard, compCard) {
    const playerValue = VALUES.indexOf(playerCard.value);
    const compValue = VALUES.indexOf(compCard.value);

    let resultMessage;
    if (playerValue > compValue) {
        resultMessage = "Player wins this round!";
        playerHand.push(compHand.shift());
    } else if (playerValue < compValue) {
        resultMessage = "Computer wins this round!";
        compHand.push(playerHand.shift());
    } else {
        resultMessage = "It's a tie! War!";
        war();
    }

    alert(resultMessage);
    updateCount();
    checkWin();
}

function war() {
    alert("It's a tie! War!");

    setTimeout(() => {
        warToArray();
        if (playerHand.length > 0 && compHand.length > 0) {
            displayCards();
        }
    }, 2000);
}

function warToArray() {
    const length = Math.min(playerHand.length, compHand.length, 4);
    for (let i = 0; i < length; i++) {
        warArray.push(playerHand.shift());
        warArray.push(compHand.shift());
    }
}

function compareWar(playerCard, compCard) {
    const playerValue = VALUES.indexOf(playerCard.value);
    const compValue = VALUES.indexOf(compCard.value);

    let resultMessage;
    if (playerValue > compValue) {
        resultMessage = "Player wins the war!";
        playerHand.push(...warArray);
    } else if (playerValue < compValue) {
        resultMessage = "Computer wins the war!";
        compHand.push(...warArray);
    }

    warArray = []; 

    alert(resultMessage);

    setTimeout(() => {
        updateCount();
        checkWin();
    }, 3000);
}

function checkWin() {
    if (playerHand.length === 0) {
        alert("Computer wins. :(");
        document.querySelector('.result').textContent = "The computer wins the game!";
    } else if (compHand.length === 0) {
        alert("You win! :)");
        document.querySelector('.result').textContent = "You won the game! :)";
    }
}

function updateCount() {
    document.querySelector('.playCount').textContent = `Player cards: ${playerHand.length}`;
    document.querySelector('.compCount').textContent = `Computer cards: ${compHand.length}`;
}

document.querySelector('#drawButton').addEventListener('click', () => {
    if (playerHand.length > 0 && compHand.length > 0) {
        displayCards();
    }
});
