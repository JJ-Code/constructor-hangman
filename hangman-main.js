var inquirer = require("inquirer");
var isLetter = require("is-letter");
var letter = require("./letter");
var game = require("./Game");
var word = require("./Word");

var displayHangman = game.wordBank.hangman;
var gameWord;
// console.log(game.wordBank.wordList[1]);

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


function playGame() {
  console.log(gameWord);
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
      console.log("All out of lives. The word is: " + gameWord);

    } else {
      console.log("You have " + gameWord.lives + "lives left.");
      playGame();
    }

    };//end of else



  });


};//end of playGame


function newWordToGuess(wordArray) {
  var randWordArr = Math.floor(Math.random() * wordArray)
    for (var i = 0; i < randWordArr.length; i++) {
      return gameWord = new word.Word.game.chosenWord(randWordArr[i])
    }


  };//end of newWordToGuess


  newWordToGuess(game.wordBank.wordList);

  startGame();
