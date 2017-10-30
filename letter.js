var Letter = function(letter) {
  this.letter = letter; //property to store the letter
  this.showLetter = false; //boolean/property to show letter or not default not to show
  };


//method to determine if a letter should be shown or a placeholder
Letter.prototype.printInfo =  function() {
  if (this.letter == " "){ //render blank as it is
    this.showLetter = true; //set blanks as true
    return " "; //to show space if chosen words has spaces
  }
  if (this.showLetter === false){// when letter is not shown show "_" to represnt letters
    return "_";
  } else { //all other situations show correct guessed letter
    return this.letter;
  }
};


  // export to use in word.js
  module.exports =  {
	Letter
};
