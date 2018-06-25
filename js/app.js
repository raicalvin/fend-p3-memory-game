/**
 * Variable declarations for timer
 */
let timeStart;
let timeEnd;
var timeDisplay;
var timerSeconds = 0;
var timerMinutes = 0;
var timerHours = 0;
var starLevel = 3;

let star1 = document.getElementsByClassName('star-1')[0];
let star2 = document.getElementsByClassName('star-2')[0];
let star3 = document.getElementsByClassName('star-3')[0];

let timerDisplayOnScreen = document.getElementsByClassName('timer')[0];

/**
 * Empty array to store 2 clicked cards
 */
let openList = [];

/**
 * Add Event Listener to the Reset button
 */
let resetButton = document.getElementsByClassName('restart')[0];
resetButton.addEventListener('click', resetGame);

let playAgain = document.getElementsByClassName('play-again')[0];
playAgain.addEventListener('click', resetGame);

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
    // Timer display clock
    timerDisplayOnScreen.textContent = "00:00:00";
    // Close modal if open
    closeModal();
    // Reset star colors and points
    starLevel = 3;
    star1.style.color = 'black';
    star2.style.color = 'black';
    star3.style.color = 'black';

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
            if (numberOfClicksMade == 0) {
                timeDisplay = setInterval(myTimer, 1000);
            }
            numberOfClicksMade++;
            moveCounter.textContent = numberOfClicksMade;
            if (numberOfClicksMade == 19) {
                // star level decrease to 2
                star3.style.color = 'gray';
                starLevel--;
            } else if (numberOfClicksMade == 31) {
                // star level decrease to 1
                star2.style.color = 'gray';
                starLevel--;
            } else if (numberOfClicksMade == 46) {
                star1.style.color = 'gray';
                starLevel--;
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

function myTimer() {
    timerSeconds++;
    if (timerSeconds == 60) {
        timerSeconds = 0;
        timerMinutes++;
        if (timerMinutes == 60) {
            timerMinutes = 0;
            timerHours++;
        }
    }

    let extraSecondZero = 0;
    let extraMinuteZero = 0;
    let extraHourZero = 0;

    if (timerSeconds > 9) {
        extraSecondZero = "";
    }
    if (timerMinutes > 9) {
        extraMinuteZero = "";
    }
    if (timerHours > 9) {
        extraHourZero = "";
    }

    timerDisplayOnScreen.textContent = `${extraHourZero}${timerHours}:${extraMinuteZero}${timerMinutes}:${extraSecondZero}${timerSeconds}`;
};

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
        setTimeout(function() {
            // dont pass in openList since function hoisting will clear contents 
            item1.parentElement.setAttribute('class', 'card');
            item2.parentElement.setAttribute('class', 'card');
        }, 1000); 
    }
}

function winGame() {
    let totalTime = timerDisplayOnScreen.textContent;
    
    displayResult(totalTime, numberOfClicksMade, starLevel);
    openModal();
}

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

// MODAL CODE

// get the modal
let gameModal = document.getElementById('gameModal');

// get the span element that closes the modal
let closeButton = document.getElementsByClassName('close')[0];

closeButton.addEventListener("click", closeModal);

let resultParagraph = document.getElementsByClassName('result-paragraph')[0];

// function to open modal when game finishes
function openModal() {
    gameModal.style.display = 'block'
    timerSeconds = 0;
    timerHours = 0;
    timerMinutes = 0;
    clearInterval(timeDisplay);
}

function closeModal() {
    console.log('I got clicked!')
    gameModal.style.display = 'none'
}

function displayResult(time, clicks, stars) {
    
    let result = `Congrats! You finished the game in ${time} with a total of ${clicks} clicks resulting in ${stars} stars!\n\nWould you like to play again?`;

    resultParagraph.textContent = result;

}