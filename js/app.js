/**
 * Variable declarations for timer
 */
let timeStart;
let timeEnd;
let timeDisplay;
let timerSeconds = 0;
let timerMinutes = 0;
let timerHours = 0;

/**
 * Variables for stars and star score level
 */
let starLevel = 3;
let star1 = document.getElementsByClassName('star-1')[0];
let star2 = document.getElementsByClassName('star-2')[0];
let star3 = document.getElementsByClassName('star-3')[0];

/**
 * Timer element on screen
 */
let timerDisplayOnScreen = document.getElementsByClassName('timer')[0];

/**
 * Empty array to store 2 clicked cards
 */
let openList = [];

/**
 * Event listener for reset button
 */
let resetButton = document.getElementsByClassName('restart')[0];
resetButton.addEventListener('click', resetGame);

/**
 * Event listener for playAgain button
 */
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
    // reset number of moves made to 0
    numberOfMovesMade = 0;
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

// Count the number of clicks and moves the user has made from start of game
let numberOfClicksMade = 0;
let numberOfMovesMade = 0;

// Event when user clicks on the screen
deckClass.addEventListener('click', function(e) {
    let target = e.target; // this is the click target for the card
    if (target.className != 'card open show' && target.className != 'card match') { // ensures click is not on an OPEN or MATCHED card
        if (e.target.nodeName == 'LI') { // make sure click is on li-item
            if (numberOfClicksMade == 0) { // start timer
                timeDisplay = setInterval(myTimer, 1000);
            }
            numberOfClicksMade++;
            if (numberOfClicksMade % 2 == 0) {
                numberOfMovesMade++;
            }
            moveCounter.textContent = numberOfMovesMade;
            if (numberOfClicksMade == 19) {
                // star level decrease to 2
                star3.style.color = 'gray';
                starLevel--;
            } else if (numberOfClicksMade == 31) {
                // star level decrease to 1
                star2.style.color = 'gray';
                starLevel--;
            }
            target.setAttribute('class', 'card open show');
            openList.push(target.childNodes[1]);
            if (openList.length == 2) {
                checkMatch(openList);
                openList.length = 0; // does not create new array
            }
        };
    }
});

/**
 * Timer function to calculate and display time
 */
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

/**
 * Function to check if the two clicked open cards match
 * @param {*} openList Array holding two cards that are currently open
 */
function checkMatch(openList) {
    let item1 = openList[0];
    let item2 = openList[1];    
    if (openList[0].className == openList[1].className) { // CARDS MATCH
        openList[0].parentElement.setAttribute('class', 'card match');
        openList[1].parentElement.setAttribute('class', 'card match');
        remainingMatchPairsLeft -= 1; // pairs left to match
        if (!remainingMatchPairsLeft) {
            winGame();
        } else {
            console.log(`You have ${remainingMatchPairsLeft} pairs left!`);
        }
    } else { // CARDS DO NOT MATCH
        setTimeout(function() {
            // dont pass in openList since function hoisting will clear contents 
            item1.parentElement.setAttribute('class', 'card');
            item2.parentElement.setAttribute('class', 'card');
        }, 1000); 
    }
}

/**
 * Once game is finished, display the result and open the modal
 */
function winGame() {
    let totalTime = timerDisplayOnScreen.textContent;
    displayResult(totalTime, numberOfMovesMade, starLevel);
    openModal();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
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
    let empty = deckClass.innerHTML = null;
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
    gameModal.style.display = 'none'
}

function displayResult(time, moves, stars) {
    
    let starsText = stars === 1 ? 'star':'stars';

    let result = `Congrats! You finished the game in ${time} with a total of ${moves} moves resulting in ${stars} ${starsText}!\n\nWould you like to play again?`;

    resultParagraph.textContent = result;

}