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
const spanRemainingGuesses = document.querySelector(".word-in-progress span");
//paragraph with guessing messages
const guessingMessages = document.querySelector(".message");
//hidden play again button
const buttonPlayAgain = document.querySelector(".play-again-hide");


const word = "magnolia";
const guessedLetterArray = [];

//display symbol as placeholder for chosen word's letters
const placeholder = function (word){
   const placeholderCircles = [];
   for (const letter of word){
    //    console.log(letter);
       placeholderCircles.push("●");
   }
   wordInProgress.innerText = placeholderCircles.join(" ");
}

placeholder (word);

button.addEventListener("click", function(e){
    e.preventDefault();
    const guessedLetter = letterInput.value;
    console.log(guessedLetter);
    letterInput.value = "";
    guessingMessages.innerText = "";
    inputValidation(guessedLetter);
    makeGuess(guessedLetter);
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
    guessedLetter.toUpperCase();
    if (guessedLetterArray.includes(guessedLetter)){
        guessingMessages.innerText = "Guess a different letter";
    } else {
        guessedLetterArray.push(guessedLetter);
    }
    console.log(guessedLetterArray);
}
