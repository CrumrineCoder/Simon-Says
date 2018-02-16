
// 0 = easy, 1= medium, 2= hard
var difficulty = 1;
// Time between the bounces. 1500 is easy and is 1.5 seconds, 1000 is medium and is 1 second, and 600 is hard and is half a second
var time = 1000;
var currentStreak = document.getElementById("currentSteps");
var highscore = document.getElementById("highScore");
// The colors
var red = document.getElementById("redBlock");
var blue = document.getElementById("blueBlock");
var yellow = document.getElementById("yellowBlock");
var green = document.getElementById("greenBlock");
// Sounds
var redSound = new Audio( "Sounds/simonSound1.mp3", {
    formats: ['ogg', 'mp3']
});
var blueSound = new Audio( "Sounds/simonSound2.mp3", {
    formats: ['ogg', 'mp3']
});
var yellowSound = new Audio( "Sounds/simonSound3.mp3", {
    formats: ['ogg', 'mp3']
});
var greenSound = new Audio( "Sounds/simonSound4.mp3", {
    formats: ['ogg', 'mp3']
});

	   
var typeWriter = new Audio("https://www.freesound.org/data/previews/256/256458_4772965-lq.mp3");
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

// The sequence for showing the players the color
function loadColors() {
	console.log("loadColors");
    done = false;
    newArr = [];
    // Reset all the colors
    function myTimeoutFunction() {
		console.log("timeOutFunction");
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
// Change the difficulty of the game. This handles both changing the time variable and changing the difficulty buttons to indicate which difficulty it is. 
function changeDifficulty(newDifficulty, newTime, label) {
	console.log("changeDifficulty");
    time = newTime;
    if (newDifficulty == 0) {
        $("#easy").removeClass("off").addClass("on");
    } else if (newDifficulty == 1) {
        $("#medium").removeClass("off").addClass("on");
    } else if (newDifficulty == 2) {
        $("#hard").removeClass("off").addClass("on");
    }
    if (difficulty == 0 && newDifficulty !=0) {
        $("#easy").removeClass("on").addClass("off");
    } else if (difficulty == 1 && newDifficulty !=1) {
        $("#medium").removeClass("on").addClass("off");
    } else if (difficulty == 2 && newDifficulty !=2) {
        $("#hard").removeClass("on").addClass("off");
    }
    difficulty = newDifficulty;
}
// After the user completes the chain, a new step is added.
function addStep() {
	console.log("addStep");
    // Length 20 being the end of the game, stop the game if the length of the array is 20.
    if (colorArr.length > personalBest) {
        personalBest = colorArr.length;
        highscore.innerHTML = personalBest;
    }
    currentStreak.innerHTML = colorArr.length;
    // Get a random color
    var color = Math.floor(Math.random() * 4 + 1);
    // If the current chain is longer than the user's personal best, then we add to the personal best and show the user.
    // Add the current color to the color array
    colorArr.push(color);
    // Show the streak to the user.
}
// Function for the red, blue, yellow, and green buttons
function repeatColors(number, sound) {
	console.log("repeatColors");
    // If the Simon Says is done showing the colors
    if (done) {
        // Clear the end slate htmls
        document.getElementById("message").innerHTML = "";
        // If the user clicked on the right one
        if (number == newArr[0]) {
            // Add the correct thing to the colorArr from the newArr and remove it from the newArr.
            colorArr.push(newArr[0]);
            newArr.shift();
            // Play the appropriate sound
			console.log("Sound playing");
			sound.currentTime = 0; 
			console.log(sound);
            sound.play();

            // If we finish the newArr array.
            if (newArr.length == 0) {
                // The player wins
                if (colorArr.length == 20) {
                    document.getElementById("message").innerHTML = "You won by gaining a streak of 20! You can keep playing or you can reset. Another step will be added to entice you ;)";
					// Wait 5.5 seconds before reloading. 
                    setTimeout(function() {
                        addStep();
                        loadColors();	
                    }, 5500);
					// The player is on the way to winning
                } else {
                    document.getElementById("message").innerHTML = "Round Cleared";
					// Wait 1.25 seconds before reloading. 
                    setTimeout(function() {
                        addStep();
                        loadColors();
                        document.getElementById("message").innerHTML = "";
                    }, 1250);
                }
            }
            // If the user loses
        } else {
            // If the strict setting is on, reset
            if (strict) {
                document.getElementById("message").innerHTML = "You missed a button press and had strict mode on.";
                reset();
            } else {
                // Add on the rest of the colors and redo the last step for the user.
                document.getElementById("message").innerHTML = "Let's try that again";
				// Wait 1.25 seconds before reloading. 
                setTimeout(function() {
                    colorArr = colorArr.concat(newArr);
                    newArr = [];
                    loadColors();
                }, 1250);
            }
        }
    }
}
// Called through an interval. This is for repeating the instructions back to the player.
function displayColors() {
	console.log("displayColors");
    // Need to create a fade in effect for the colors
    if (colorArr.length == 0) {
        clearTimeout(timeout);
        done = true;
        //   colorArr = newArr.slice(0);
    } else {
        if (colorArr[0] == 1) {
            // red
			redSound.currentTime = 0;
            red.style.background = "#6B0D0D";
			console.log("Sound playing");
			console.log(redSound);
            redSound.play();
        }
        if (colorArr[0] == 2) {
            // blue
			blueSound.currentTime = 0;
            blue.style.background = "#290D6B";
			console.log("Sound playing");
			console.log(blueSound);
            blueSound.play();
        }
        if (colorArr[0] == 3) {
            // yellow
			yellowSound.currentTime = 0;
            yellow.style.background = "#879111";
			console.log("Sound playing");
			console.log(yellowSound);
            yellowSound.play();
        }
        if (colorArr[0] == 4) {
            //green
			greenSound.currentTime = 0;
            green.style.background = "#0D6B0F";
			console.log("Sound playing");
			console.log(greenSound);
            greenSound.play();
        }
        newArr.push(colorArr[0]);
        colorArr.shift();
    }
}
// Return everything to step 1
function reset() {
	console.log("reset");
    newArr = [];
    colorArr = [];
    addStep();
    loadColors();
}
// Toggling the variable that determines if the user is penalizing for getting a step wrong.
function toggleStrict() {
	console.log("toggleStrict");
    $("#turnStrict").toggleClass("on");
    if (strict) {
        strict = false;
        document.getElementById("turnStrict").innerHTML = "Strict (Off)";
    } else if (!strict) {
        strict = true;
        document.getElementById("turnStrict").innerHTML = "Strict (On)";
    }
}