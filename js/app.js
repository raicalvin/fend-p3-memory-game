/*
 * Create a list that holds all of your cards
 */
let openList = [];

let resetButton = document.getElementsByClassName('restart')[0];
resetButton.addEventListener('click', resetGame);

let deckClass = document.getElementsByClassName('deck')[0];

let stars = document.getElementsByClassName('score-panel')[0];

deckClass.addEventListener('click', function(e) {
    var target = e.target;

    if (target.className == 'card open show') {
        console.log('Hey, you cannot touch the same card!');
    }

    console.log(target);
    if (target.className == 'card matched') {
        return;
    }
    if (e.target.nodeName == 'LI') {
        // start matching opertation
        target.setAttribute('class', 'card open show');
        openList.push(target.childNodes[1]);
        if (openList.length == 2) {
            checkMatch(openList);
            openList.length = 0; // does not create new array
        }
    };
});

function checkMatch(openList) {
    var item1 = openList[0];
    var item2 = openList[1];    
    if (openList[0].className == openList[1].className) {
        console.log('Yes, they match!');
        openList[0].parentElement.setAttribute('class', 'card match');
        openList[1].parentElement.setAttribute('class', 'card match');
        console.log(openList);
    } else {
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
    console.log('Resetting game...');
    // Obtain current node list of deck
    let currentDeckNode = document.querySelectorAll('.card');
    // turn node list into array
    let currentDeck = turnIntoArray(currentDeckNode);
    // create a new shuffled deck
    let shuffledDeck = shuffle(currentDeck);
    // delete the old cards on deck
    deleteOldDeck();
    // create a new document fragment
    let newDeck = createNewDeck(shuffledDeck);
    // get the document element for the deck
    deckClass.appendChild(newDeck);
}

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
