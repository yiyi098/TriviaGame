// ### Option Two: Advanced Assignment (Timed Questions)

// ![Advanced](Images/2-advanced.jpg)

// **[Click Here to Watch the demo](advanced-trivia-demo.mov)**.

// * You'll create a trivia game that shows only one question until the player answers it or their time runs out.

// * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// * The scenario is similar for wrong answers and time-outs.

//   * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
//   * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

// * On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

// - - -

// ### Minimum Requirements

// Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed.

// - - -

// ### Create a README.md

// Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

// * [About READMEs](https://help.github.com/articles/about-readmes/)

// * [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

// - - -

// ### Add To Your Portfolio
// 
// After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.


$(document).ready(function() {

  //My variables and objects
  var clockRunning = false;
  var intervalId;
  var timeOutId;
  var timeout = 29;
  var answerTime = 3;
  var questionNum = 0;
  var correct = 0;
  var wrong = 0;
  var unanswered = 0;

  var countDownTimer = {

    start: function() {
      if (!clockRunning) {
        intervalId = setInterval(this.count, 1000);
        clockRunning = true;
      }
    },

    count: function() {
      $("#timer").html("Time remaining: " + timeout + " seconds");
      timeout--;
    },

    questionAnsweredOrTimedOut: function() {
      clearInterval(intervalId);
      clockRunning = false;
    },

    lookingAtAnswer: function() {
      if (!clockRunning) {
        intervalId = setInterval(this.answerCount, 1000);
        clockRunning = true;
      }
    },

    answerCount: function() {
      answerTime--;
    }
  };

  var trivia = {

    questions: [
      "Who directed the movie Harry Potter and the Prisoner of Azkaban?", 
      "In what year was the first Harry Potter movie released?", 
      "What does Professor Dumbledore find in the Room of Requirement?", 
      "Who was Headmaster of Hogwarts before Albus Dumbledore?",
      "Which Defence Against the Dark Arts teacher filled his office with pictures of himself?",
    ],

    choices: [
      ["Alfonso Cuarón", "David Yates", "Mike Newell", "Chris Columbus"], 
      ["2002", "2000", "2003", "2001"],
      ["A room full of chamber pots", "A kitchen full of house-elves","The Chamber of Secrets","A small room with the Mirror of Erised"],
      ["Phineus Nigellus Black","Armando Dippet","Elphias Doge","Antonin Dolohov"],
      ["Professor Quirrell", "Professor Lupin", "Professor Lockhart", "Professor Snape"]
    ],

    answers: [
      "Alfonso Cuarón", 
      "2001", 
      "a room full of chamber pots", 
      "Armando Dippet",
      "Professor Lockhart"
    ],

    displayQuestion: function() {
      $("#questions").html(this.questions[questionNum]);
    },

    displayChoices: function() {
      $("#choice1").html(this.choices[questionNum][0]);
      $("#choice2").html(this.choices[questionNum][1]);
      $("#choice3").html(this.choices[questionNum][2]);
      $("#choice4").html(this.choices[questionNum][3]);
    },

  };

  var images = [
    './assets/images/answer0.jpg', 
    './assets/images/answer1.gif', 
    './assets/images/answer2.gif', 
    './assets/images/answer3.jpg',
    './assets/images/answer4.gif'
  ];

  //My functions

  function gameStart() {
    resetButtons();
    $("#start").attr("style", "display: none");
    var newImg = $('<img>');
    newImg.attr('src', "" );
    $('#initialize').html(newImg);
    $("#timer").attr("style", "padding-top: 20px; display: initial");
    $("#choice1").attr("style", "margin: 4px; visibility: visible");
    $("#choice2").attr("style", "margin: 4px; visibility: visible");
    $("#choice3").attr("style", "margin: 4px; visibility: visible");
    $("#choice4").attr("style", "margin: 4px; visibility: visible");

    if (questionNum == 0) {
      $("#choice1").on("click", choseCorrectly);
      $("#choice2").on("click", choseIncorrectly);
      $("#choice3").on("click", choseIncorrectly);
      $("#choice4").on("click", choseIncorrectly);
      initialize();
    }
    else if (questionNum == 1) {
      $("#choice1").on("click", choseIncorrectly);
      $("#choice2").on("click", choseIncorrectly);
      $("#choice3").on("click", choseIncorrectly);
      $("#choice4").on("click", choseCorrectly);
      initialize();
    }
    else if (questionNum == 2) {
      $("#choice1").on("click", choseCorrectly);
      $("#choice2").on("click", choseIncorrectly);
      $("#choice3").on("click", choseIncorrectly);
      $("#choice4").on("click", choseIncorrectly);
      initialize();
    }
    else if (questionNum == 3) {
      $("#choice1").on("click", choseIncorrectly);
      $("#choice2").on("click", choseCorrectly);
      $("#choice3").on("click", choseIncorrectly);
      $("#choice4").on("click", choseIncorrectly);
      initialize();
    } 
    else if (questionNum == 4) {
      $("#choice1").on("click", choseIncorrectly);
      $("#choice2").on("click", choseIncorrectly);
      $("#choice3").on("click", choseCorrectly);
      $("#choice4").on("click", choseIncorrectly);
      initialize();
    } else {
      $("#timer").attr("style", "display: none");
      $("#questions").empty();
      $("#questions").html("Correct: " + correct + "Wrong: " + wrong + "Unanswered: " + unanswered);
      $("#choice1").attr("style", "margin: 4px; visibility: visible");
      $("#choice1").html("Try again?")
      $("#choice1").on("click", restartGame);
      $("#choice2").attr("style", "visibility: hidden;");
      $("#choice3").attr("style", "visibility: hidden;");
      $("#choice4").attr("style", "visibility: hidden;");
    }
  };
  
  function initialize() {
    countDownTimer.start();
    trivia.displayQuestion();
    trivia.displayChoices();
    timeoutId = setTimeout(choseNoAnswer, 30000);
  };

  function choseIncorrectly() {
    resetButtons();
    var newImg = $('<img>');
    newImg.attr('src', images[questionNum]);
    newImg.attr('style', "height: 400px; width: auto; margin-left: auto; margin-right: auto; opacity: 1");
    $("#questions").html(newImg);
    $("#choice1").html("No, the correct answer is <strong>" + trivia.answers[questionNum] + "</strong>.");
    $("#choice2").attr("style", "visibility: hidden");
    $("#choice3").attr("style", "visibility: hidden");
    $("#choice4").attr("style", "visibility: hidden");
    questionNum++;
    wrong++;
    resetTime()
    setTimeout(gameStart, 4400);
  };

  function choseCorrectly() {
    resetButtons();
    var newImg = $('<img>');
    newImg.attr('src', images[questionNum]);
    newImg.attr('style', "height: 400px; width: auto; margin-left: auto; margin-right: auto; opacity: 1");
    $("#questions").html(newImg);
    $("#choice1").html("Correct!");
    $("#choice2").attr("style", "visibility: hidden");
    $("#choice3").attr("style", "visibility: hidden");
    $("#choice4").attr("style", "visibility: hidden");
    questionNum++;
    correct++;
    resetTime()
    setTimeout(gameStart, 4400);
  };

  function choseNoAnswer() {
    resetButtons();
    var newImg = $('<img>');
    newImg.attr('src', images[questionNum]);
    newImg.attr('style', "height: 400px; width: auto; margin-left: auto; margin-right: auto; opacity: 1");
    $("#questions").html(newImg);
    $("#choice1").html("Timed Out! The correct answer is <strong>" + trivia.answers[questionNum] + "</strong>.");
    $("#choice2").attr("style", "visibility: hidden");
    $("#choice3").attr("style", "visibility: hidden");
    $("#choice4").attr("style", "visibility: hidden");
    questionNum++;
    unanswered++;
    resetTime()
    setTimeout(gameStart, 4400);
  }

  function resetButtons() {
    $("#choice1").off("click");
    $("#choice2").off("click");
    $("#choice3").off("click");
    $("#choice4").off("click");
  }

  function restartGame() {
    questionNum = 0;
    correct = 0;
    wrong = 0;
    unanswered = 0;
    resetTime();
    gameStart();
  }

  function resetTime() {
    timeout = 29;
    clockRunning = false;
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  }

  $("#start").on("click", gameStart);
  
});





