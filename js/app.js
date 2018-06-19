/*
 * Create a list that holds all of your cards
 */

let resetButton = document.getElementsByClassName('restart')[0];
resetButton.addEventListener('click', resetGame);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *   - good place to use fragments
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function resetGame() {
    alert('Resetting game...');
    // Obtain current node list of deck
    let currentDeckNode = document.querySelectorAll('.card');
    // turn node list into array
    let currentDeck = turnIntoArray(currentDeckNode);
    // create a new shuffled deck
    let shuffledDeck = shuffle(currentDeck);
    deleteOldDeck();
    createNewDeck(shuffledDeck);
    
}

 // This function turns a node list into an array for manipulation
function turnIntoArray(inputNodeList) {
    let arr = [];
    inputNodeList.forEach(function(item) {
        arr.push(item.innerHTML);
    });
    return arr;
}

function createNewDeck(incomingDeck) {
    // create a fragment to re-create the deck html
    const frag = document.createDocumentFragment();
    incomingDeck.forEach(function(item) {
        let newElement = document.createElement('li');
        newElement.innerHTML = item;
        frag.appendChild(newElement);
    });
    log(frag);
}

function deleteOldDeck() {
    var empty = document.getElementsByClassName('deck')[0].innerHTML = null;
    log(empty);
}

function log(input) {
    console.log(input);
}