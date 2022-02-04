//UL where guessed letters appear
const guessedLetters = document.querySelector(".guessed-letters");
//"Guess!" button
const button = document.querySelector(".guess");
//text input box to guess a letter
const letterInput = document.querySelector(".letter");
//empty paragraph where word in progress appears
const wordInProgress = document.querySelector(".word-in-progress");
//paragraph with remaining guesses
const remainingGuesses = document.querySelector(".remaining");
//span with remaining guesses
const spanRemainingGuesses = document.querySelector(".remaining span");
//paragraph with guessing messages
const guessingMessages = document.querySelector(".message");
//hidden play again button
const buttonPlayAgain = document.querySelector(".play-again");


let word = "magnolia";
let guessedLetterArray = [];
let guessesRemaining = 8;

const getWord = async function(){
    const wordRequest = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await wordRequest.text();
    var wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random()* wordArray.length);
    word = (wordArray[randomIndex]).trim();
    placeholder(word);
}

getWord();

//display symbol as placeholder for chosen word's letters
const placeholder = function (word){
   const placeholderCircles = [];
   for (const letter of word){
    //    console.log(letter);
       placeholderCircles.push("●");
   }
   wordInProgress.innerText = placeholderCircles.join("");
}

button.addEventListener("click", function(e){
    e.preventDefault();
    const guessedLetter = letterInput.value;
    console.log(guessedLetter);
    letterInput.value = "";
    guessingMessages.innerText = "";
    const goodGuess = inputValidation(guessedLetter);

    if (goodGuess){
        makeGuess(guessedLetter);
    }
});

const inputValidation = function(guessedLetter){
    const acceptedLetter = /[a-zA-Z]/;
    if (guessedLetter === ""){
        guessingMessages.innerText = "Enter a letter A through Z";
    } else if (guessedLetter.length > 1){
        guessingMessages.innerText = "Enter only one letter";
    } else if (guessedLetter != guessedLetter.match(acceptedLetter)){
        guessingMessages.innerText = "Enter letters only";
    } else {
        return guessedLetter;
    };
}

const makeGuess = function(guessedLetter){
    guess = guessedLetter.toUpperCase();
    if (guessedLetterArray.includes(guess)){
        guessingMessages.innerText = "You already guessed that; guess a different letter";
    } else {
        guessedLetterArray.push(guess);
        guessCounter(guess);
        showGuessedLetters();
        wordUpdate(guessedLetterArray);
    }
    console.log(guessedLetterArray);
}

const showGuessedLetters = function(){
    guessedLetters.innerHTML = "";
    for (const letter of guessedLetterArray){
        let listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLetters.append(listItem);
    }
}
//Can this be tweaked so only incorrect leters show here?


const wordUpdate = function(guessedLetterArray){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("")
    const correctLetters = [];
    for (const letter of wordArray){
        if (guessedLetterArray.includes(letter)){
            correctLetters.push(letter.toUpperCase());
        } else {
            correctLetters.push("●");
        }
    }
    // console.log(correctLetters);
    wordInProgress.innerText = correctLetters.join("");
    checkForWinner();
}

const guessCounter = function(guess){
    const upperWord = word.toUpperCase();
    if (upperWord.includes(guess)){
        guessingMessages.innerText = "Got one!";
    } else {
        guessingMessages.innerText = `Womp womp, there's no ${guess}. Guess again.`
        guessesRemaining -= 1;
    }

    if (guessesRemaining === 0){
        guessingMessages.innerHTML = `Sorry, game over! The word was <span class="highlight">${word.toUpperCase()}</span>`;
        startOver();
    } else if (guessesRemaining === 1){
        spanRemainingGuesses.innerText = `Be careful, only ONE guess left!`;
    } else {
        spanRemainingGuesses.innerText = `You have ${guessesRemaining} guesses left.`;
    }
}

const checkForWinner = function(){
    if (word.toUpperCase() === wordInProgress.innerText){
        guessingMessages.classList.add("win");
        guessingMessages.innerHTML = `<p class="highlight">You win!</p>`
        startOver();
    }
}

const startOver = function () {
  button.classList.add("hide");
  remainingGuesses.classList.add("hide");
  guessedLetters.classList.add("hide");
  buttonPlayAgain.classList.remove("hide");
}

buttonPlayAgain.addEventListener("click", function(){
    //reset original values
    guessingMessages.classList.remove("win");
    guessedLetterArray = [];
    guessesRemaining = 8;
    spanRemainingGuesses.innerText = `You have ${guessesRemaining} guesses left.`;
    guessedLetters.innerHTML = "";
    guessingMessages.innerText = "";
    //get new word
    getWord();
    //show right elements
    button.classList.remove("hide");
    buttonPlayAgain.classList.add("hide");
    remainingGuesses.classList.remove("hide");
    guessedLetters.classList.remove("hide");
});