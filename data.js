var currentStreak = document.getElementById("currentSteps");
var highscore = document.getElementById("highScore");
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
var timeout;
var newArr = [];
var done = false;
var colorArr = [];
var strict = false;
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
      timeout = setTimeout(myTimeoutFunction, 1000);
    }
  }
  myTimeoutFunction();
}

function addStep() {
  // Length 20 being the end of the game, stop the game if the length of the array is 20.
  if (colorArr.length == 20) {
    document.getElementById("victory").innerHTML =
      "You have won by gaining a streak of 20!";
    reset();
  } else {
    // Get a random color
    var color = Math.floor(Math.random() * 4 + 1);
    // Add the color to the color array.
     if(colorArr.length > personalBest){
      personalBest = colorArr.length
      highscore.innerHTML = personalBest; 
    }
    colorArr.push(color);
    // Show the streak to the user. 
    currentStreak.innerHTML = colorArr.length;
   
  }
}

function repeatColors(number) {
  if (done) {
    document.getElementById("youSuck").innerHTML = "";
    document.getElementById("victory").innerHTML = "";
    if (number == newArr[0]) {
      colorArr.push(newArr[0]);
      newArr.shift();
      if (newArr.length == 0) {
        addStep();
        loadColors();
      }
      inArray.innerHTML = colorArr;
      inArraySub.innerHTML = newArr;
    } else {
      if (strict) {
        document.getElementById("youSuck").innerHTML =
          "You have missed a button press and had strict mode on.";
        reset();
      } else {
        colorArr = colorArr.concat(newArr);
        newArr = [];
        loadColors();
      }
    }
  }
}
function displayColors() {
  // Need to create a fade in effect for the colors
  if (colorArr.length == 0) {
    clearTimeout(timeout);
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

function reset() {
  newArr = [];
  colorArr = [];
  addStep();
  loadColors();
}

function toggleStrict() {
  if (strict) {
    strict = false;
    document.getElementById("turnStrict").innerHTML =
      "Strict (Off)";
  } else if (!strict) {
    strict = true;
    document.getElementById("turnStrict").innerHTML =
      "Strict (On)";
  }
}
