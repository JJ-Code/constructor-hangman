var inquirer = require("inquirer");
var isLetter = require("is-letter");
var letter = require("./letter");
var game = require("./game");
var Word = require("./word");

//coping array to manupliate
var copyWordBank = game.wordBank.wordList;
// console.log(copyWordBank);
// console.log(game.wordBank.wordList[0]);

// var displayHangman = game.wordBank.hangman;
var gameWord = newWordToGuess(copyWordBank);
// console.log(gameWord);

// newWordToGuess(game.wordBank.wordList);
startGame();



//startGame function
function startGame() {
  inquirer.prompt([{
    name: "play",
    type: "confirm",
    message: "Are you ready to play?"
  }]).then(function(answer) {
    if (answer.play) {
      playGame();
    } else {
      console.log("Fine, I didn't want to play anyway..");
    }
  }) //end of annoymous then function
} // end of startGame

//function to generate new word to guess
function newWordToGuess(wordArray) {
  var randIndex = Math.floor(Math.random() * wordArray.length)
  var randomWord = wordArray[randIndex]
  var gameWord = new Word(randomWord)
    //remove gameWord from wordArray
    wordArray.splice(randIndex, 1)
// console.log(randIndex);
    //if copyWordBank is empty reset the array to copyWordBank=game.wordBank.wordList
    if (wordArray.length === 0){
      wordArray = game.wordBank.wordList;
    }
    return gameWord;
  };

//playGame function
function playGame() {
  // console.log(gameWord);
  inquirer.prompt([{
    name: "letter",
    type: "text",
    message: "Input a letter",
    validate: function(value) {
      if (isLetter(value)) {
        return true;
      } else {
        return false;
      }
    }
  }]).then(function(userChoose){
    console.log("***************");
    var letter = userChoose.letter;

    //check letter
    gameWord.checkletter(letter);
    if (gameWord.lettersAlreadyGussed) {
      console.log("Guess again, you already try that");
      playGame();
    }else {
      if(gameWord.allLettersGussed()){
      console.log("The word is" + gameWord);
    } else if (gameWord.lives === 0) {
      console.log("All out of lives. The word is: " + gameWord.chosenWord);

    } else {
      console.log("You have " + gameWord.lives + "lives left.");
      playGame();
    }

    };//end of else



  });


};//end of playGame
