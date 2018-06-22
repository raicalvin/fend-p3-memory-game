/**
 * Empty array to store 2 clicked cards
 */
let openList = [];

/**
 * Add Event Listener to the Reset button
 */
let resetButton = document.getElementsByClassName('restart')[0];
resetButton.addEventListener('click', resetGame);

/**
 * Function to reset game when Reset button is clicked
 */
function resetGame() {
    console.log('Resetting game...');
    // Obtain current node list of deck:
    let currentDeckNode = document.querySelectorAll('.card');
    // turn node list into array:
    let currentDeck = turnIntoArray(currentDeckNode);
    // create a new shuffled deck:
    let shuffledDeck = shuffle(currentDeck);
    // delete the old cards on deck:
    deleteOldDeck();
    // create a new document fragment:
    let newDeck = createNewDeck(shuffledDeck);
    // add the new shuffled deck fragment to the empty deck:
    deckClass.appendChild(newDeck);
    // reset number of clicks to 0:
    numberOfClicksMade = 0;
    // reset moves to 0
    moveCounter.textContent = numberOfClicksMade;
    // reset number of matching pairs left:
    remainingMatchPairsLeft = pairsToMatch;
}

// Element that holds all the cards displayed on screen
let deckClass = document.getElementsByClassName('deck')[0];

// Pairs of cards to match in this game
let pairsToMatch = deckClass.childElementCount / 2;

// The remaining pairs of cards to match
let remainingMatchPairsLeft = pairsToMatch;

// Element that updates number of moves
let moveCounter = document.getElementsByClassName('moves')[0];
console.log(moveCounter);

// Count the number of clicks the user has made from start of game
let numberOfClicksMade = 0;

// Event when user clicks on the screen
deckClass.addEventListener('click', function(e) {
    var target = e.target; // this is the click target for the card
    if (target.className != 'card open show' && target.className != 'card match') { // ensures click is not on an OPEN or MATCHED card
        if (e.target.nodeName == 'LI') {
            numberOfClicksMade++;
            moveCounter.textContent = numberOfClicksMade;
            if (numberOfClicksMade > 18) {
                // star level decrease to 2
            } else if (numberOfClicksMade > 30) {
                // star level decrease to 1
            }
            console.log(`So far you clicked this many times: ${numberOfClicksMade}`)
            target.setAttribute('class', 'card open show');
            openList.push(target.childNodes[1]);
            if (openList.length == 2) {
                checkMatch(openList);
                openList.length = 0; // does not create new array
            }
        };
    }
});

function checkMatch(openList) {
    var item1 = openList[0];
    var item2 = openList[1];    
    if (openList[0].className == openList[1].className) { // CARDS MATCH
        console.log('Yes, they match!');
        openList[0].parentElement.setAttribute('class', 'card match');
        openList[1].parentElement.setAttribute('class', 'card match');
        remainingMatchPairsLeft -= 1; // pairs left to match
        if (!remainingMatchPairsLeft) {
            console.log('Yay you win the game!')
            winGame();
        } else {
            console.log(`You have ${remainingMatchPairsLeft} pairs left!`);
        }
        console.log(openList);
    } else { // CARDS DO NOT MATCH
        var delayInMilliseconds = 1000; //1 second
        setTimeout(function() {
            // your code to be executed after 1 second
            // dont pass in openList since function hoisting will clear contents 
            item1.parentElement.setAttribute('class', 'card');
            item2.parentElement.setAttribute('class', 'card');
        }, delayInMilliseconds); 
    }
    // openList[1].className = "card open";
}

function winGame() {
    // this function is called when the game is complete
    // ask if user wants to play again
    if (true) {
        // reset game
    } else {
        // nothing
    }
}

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



 // This function turns a node list into an array for manipulation
function turnIntoArray(inputNodeList) {
    let arr = [];
    inputNodeList.forEach(function(item) {
        arr.push(item.innerHTML);
    });
    return arr;
}

// This function creates and returns a new fragment of shuffled cards
function createNewDeck(incomingDeck) {
    // create a fragment to re-create the deck html
    const frag = document.createDocumentFragment();
    incomingDeck.forEach(function(item) {
        let newElement = document.createElement('li');
        newElement.innerHTML = item;
        newElement.setAttribute("class", "card");
        frag.appendChild(newElement);
    });
    return frag;
}

// This function deletes the old deck from the screen
function deleteOldDeck() {
    var empty = deckClass.innerHTML = null;
    console.log(empty);
}
