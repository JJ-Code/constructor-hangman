var Letter = require("./letter");


// console.log(Letter);

// Creating constructor function to create a new game play word
var Word = function(chosenWord) {
  this.lives = 8;
  this.chosenWord = chosenWord;
  // console.log(this.chosenWord);
  this.lettersOfWord = [];
  this.allGuesses = [];
  //allows this.letters to use the letter constuctor function
  for (var i = 0; i < this.chosenWord.length; i++) {
    this.lettersOfWord.push(new Letter.Letter(this.chosenWord[i]))
  }
};

//method to checked user gussed letters to chosenWord

Word.prototype.checkletter = function(userInputedLetter) {
  this.incorrectGuess = true;
  this.lettersAlreadyGussed = false;
  //indexOf method will allow us to know if the letter has been gussed. -1 indicates it is not in array aka it has not been gussed
  if (this.allGuesses.indexOf(userInputedLetter) != -1) {
    this.lettersAlreadyGussed = true; //reseting it to true since letter is in allGuesses array
  } else { //else if it is not in array then push it into allGuesses arrary
    this.allGuesses.push(userInputedLetter);
    for (var i = 0; i < this.lettersOfWord.length; i++) {
      if (this.lettersOfWord[i].letter == userInputedLetter) {
        this.incorrectGuess = false; //resetting this since user guess matches letter in word.
        this.letters[i].showLetter = true; //show guessed letter
      }
      else if (this.incorrectGuess) {
        this.lives--;
      }
    } //end of forloop

  } //end of else

}; //end of checkletter

//method to check if user has gussed all thr lettes correctly
Word.prototype.allLettersGussed = function() {
  //if any of the letter's property showLetter is false then it should be false
  for (var i = 0; i < this.lettersOfWord.length; i++) {
    if (!this.lettersOfWord[i].showLetter) {
      return false;
    }
  } //end of forloop
  return true;

};


//method to print the word to terminal (letter or spaces)
Word.prototype.printWord = function() {
  var outputOfWord = "";
  //use Letter.printInfo method from letter.js to see if it show print space or an actual letter
  for (var i = 0; i < this.lettersOfWord.length; i++) {
    outputOfWord += this.lettersOfWord[i].printInfo();
  }
  return outputOfWord;
};

module.exports = Word;
