
// 0 = easy, 1= medium, 2= hard
var difficulty = 1;
// Time between the bounces. 1500 is easy and is 1.5 seconds, 1000 is medium and is 1 second, and 500 is hard and is half a second
var time = 1000;
var currentStreak = document.getElementById("currentSteps");
var highscore = document.getElementById("highScore");
// The colors
var red = document.getElementById("redBlock");
var blue = document.getElementById("blueBlock");
var yellow = document.getElementById("yellowBlock");
var green = document.getElementById("greenBlock");

// Sounds
var redSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);
var blueSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
var yellowSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
var greenSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);
// Interval
var timeout;
// The array of colors added to the chain that the user has to follow. We flip numbers between these two arrays constantly.
// ColorArr is deplted when going through the colors for the user, and newArr is depleted when the user goes through the colors
var colorArr = [];
var newArr = [];
// When false, the game continues. If true, then the game stops.
var done = false;
// If Strict is true, colorArr resets if the user messes up. If not, the step continues.
var strict = false;
// The user's high score
var personalBest = 0;

window.onload = addStep();
window.onload = loadColors();

function loadColors() {
  done = false;
  newArr = [];
  // Reset all the colors
  function myTimeoutFunction() {
    red.style.background = "#D91B1A";
    blue.style.background = "#5B17C2";
    yellow.style.background = "#CCCF18";
    green.style.background = "#25C217";
    displayColors();
    // While the game is not done, keep Simon Says on an interval.
    if (!done) {
      timeout = setTimeout(myTimeoutFunction, time);
    }
  }
  myTimeoutFunction();
}

function changeDifficulty(x, y) {
  difficulty = x;
  time = y; 
}
// After the user completes the chain, a new step is added.
function addStep() {
  // Length 20 being the end of the game, stop the game if the length of the array is 20.
  if (colorArr.length == 20) {
    document.getElementById("victory").innerHTML =
      "You have won by gaining a streak of 20!";
    reset();
  } else {
    // Get a random color
    var color = Math.floor(Math.random() * 4 + 1);

    // If the current chain is longer than the user's personal best, then we add to the personal best and show the user.
    if (colorArr.length > personalBest) {
      personalBest = colorArr.length;
      highscore.innerHTML = personalBest;
    }
    // Add the current color to the color array
    colorArr.push(color);
    // Show the streak to the user.
    currentStreak.innerHTML = colorArr.length;
  }
}
// Function for the red, blue, yellow, and green buttons
function repeatColors(number, sound) {
  // If the Simon Says is done showing the colors
  if (done) {
    // Clear the end slate htmls
    document.getElementById("youSuck").innerHTML = "";
    document.getElementById("victory").innerHTML = "";
    // If the user clicked on the right one
    if (number == newArr[0]) {
      // Add the correct thing to the colorArr from the newArr and remove it from the newArr.
      colorArr.push(newArr[0]);
      newArr.shift();
      // Play the appropriate sound
      sound.play();
      // If we finish the newArr array.
      if (newArr.length == 0) {
        // Continue onto the next step
        addStep();
        loadColors();
      }
      // If the user loses
    } else {
      // If the strict setting is on, reset
      if (strict) {
        document.getElementById("youSuck").innerHTML =
          "You have missed a button press and had strict mode on.";
        reset();
      } else {
        // Add on the rest of the colors and redo the last step for the user.
        colorArr = colorArr.concat(newArr);
        newArr = [];
        loadColors();
      }
    }
  }
}
// Called through an interval. This is for repeating the instructions back to the player.
function displayColors() {
  // Need to create a fade in effect for the colors
  if (colorArr.length == 0) {
    setTimeout(clearTimeout(timeout), 3000);
    done = true;
    //   colorArr = newArr.slice(0);
  } else {
    if (colorArr[0] == 1) {
      // red
      red.style.background = "#6B0D0D";
      redSound.play();
    }
    if (colorArr[0] == 2) {
      // blue
      blue.style.background = "#290D6B";
      blueSound.play();
    }
    if (colorArr[0] == 3) {
      // yellow
      yellow.style.background = "#879111";
      yellowSound.play();
    }
    if (colorArr[0] == 4) {
      //green
      green.style.background = "#0D6B0F";
      greenSound.play();
    }
    newArr.push(colorArr[0]);
    colorArr.shift();
  }
}
// Return everything to step 1
function reset() {
  newArr = [];
  colorArr = [];
  addStep();
  loadColors();
}
// Toggling the variable that determines if the user is penalizing for getting a step wrong.
function toggleStrict() {
  if (strict) {
    strict = false;
    document.getElementById("turnStrict").innerHTML = "Strict (Off)";
  } else if (!strict) {
    strict = true;
    document.getElementById("turnStrict").innerHTML = "Strict (On)";
  }
}
