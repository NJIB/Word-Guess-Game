var listofTeams = ["Arsenal", "Aston Villa", "Bournemouth", "Brighton Hove Albion", "Burnley", "Chelsea", "Crystal Palace", "Everton", "Leicester City", "Liverpool", "Manchester City", "Manchester United", "Newcastle United", "Norwich City", "Sheffield United", "Southampton", "Tottenham Hotspur", "Watford", "West Ham United", "Wolverhampton Wanderers"];  // listofTeams is the array containing all 20 possible answers
var permissableGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var chosenTeam = [];  // chosenTeam is the team the computer randomly selects
var chosenTeamLowerCase = [];  // chosenTeam is the lower case of chosenTeam - used for search, not for display
var blankDisplay = [];  // blankDisplay is how the blanks are shown on the screen
var teamNameLength = 0;  //teamNameLength counts the length of the chosenTeam
var letterGuessed = [];  //letterGuessed captures the key the player hits to guess a letter
var guessCounter = 0;   //Guess counter
var guessesRemaining = 10;  //Guesses remaining
var letterPosition = [];  //letterPosition identifies the position in the chosenTeam string of the guessed letter
var occurrenceCount = 0;   //occurrenceCount stores the number of occurrences in the chosenTeam string
var totalGuessed = 0;  //totalGuessed counts total number of letters guessed
var playerOutcome = [];  //playerOutcome prints out how far the player got [by the end of the game]
var incorrectGuesses = [];  //incorrectGuesses logs incorrectly guessed letters - to display, but also count guessesRemaining
var gamesWon = 0; //gamesWon counts total number of games won
var endResult = [];  //Holds win/lose statement to be displayed to player
var teamBadgeAddress = [];  //Address to display team badge
var teamsLog = []  // Teams already chosen to avoid duplication


// Computer randomly chooses a team
function chooseTeam() {
    chosenTeam = listofTeams[Math.floor(Math.random() * listofTeams.length)];

    //If a team has already been chosen, the program will select another
    while (teamsLog.includes(chosenTeam)) {
        console.log(teamsLog.length);
        chosenTeam = listofTeams[Math.floor(Math.random() * listofTeams.length)];
    }

    chosenTeamLowerCase = chosenTeam.toLowerCase();
    console.log(chosenTeam);

    teamsLog.push(chosenTeam);

}

// Computer calculates length of string for team chosen, and displays placeholders
function chosenTeamLengthCount() {
    teamNameLength = chosenTeam.length;
    console.log(teamNameLength);
}

function displayPlaceholders() {
    // blankDisplay populated with the same number of "_" as the length of chosenTeam
    for (var blankCount = 0; blankCount < teamNameLength; blankCount++) {
        blankDisplay.push(" _ ");
        if (blankDisplay.length === teamNameLength) {
            // console.log(blankDisplay);
            //Writing initial blank placeholder to screen, so player knows how long the name is
            document.getElementById("letterContainer").innerHTML = blankDisplay.join('');
            //Filling in any blanks in the name, without impacting player / computer score
            locateGuessinString(" ");
        }
    }
}
//After displayPlaceholders, playerGuesses is called

function playerGuesses() {
    // Senses which key the player has selected
    document.onkeyup = function (event) {
        letterGuessed = event.key.toLowerCase();
        // console.log(letterGuessed);

        //guessCounter incremented by for each guess
        guessCounter++;
        console.log("guessCounter: " + guessCounter);
        //Check if key hit is a permissable guess (i.e. a letter and no other key)
        if (permissableGuesses.indexOf(letterGuessed) > -1) {
            //If guess correct, move on to log guess, otherwise log as incorrect, decrement guessesRemaining
            if (chosenTeamLowerCase.indexOf(letterGuessed) > -1) {
                locateGuessinString(letterGuessed);
                displayUpdate(totalGuessed, incorrectGuesses.length);
                checkWinLose();
            } else
                //Incorrect guess added to array of incorrect guesses
                //Check if player has already guessed that letter - disregard if they have
                if (incorrectGuesses.indexOf(letterGuessed) > -1) {
                    //Clearing letterGuessed, so it does not write to incorrectGuesses twice
                    letterGuessed = [];
                } else {
                    incorrectGuesses.push(letterGuessed);
                    console.log("incorrectGuesses: " + incorrectGuesses);
                    //Guesses remaining updated
                    guessesRemaining = (10 - incorrectGuesses.length);
                    console.log("guessesRemaining: " + guessesRemaining);
                    displayUpdate(totalGuessed, incorrectGuesses.length);
                    checkWinLose();
                }
        }
    }
}

function locateGuessinString(searchValue) {
    // Determines which position in the array the letter sits
    //Check if player has already guessed that letter - disregard if they have
    if (blankDisplay.indexOf(searchValue) > -1) {
    } else {
        for (var stringLocation = 0; stringLocation < teamNameLength; stringLocation++) {
            if (chosenTeamLowerCase[stringLocation] === searchValue) {
                letterPosition.push(stringLocation);
            }
        }
    }
    replacePlaceholders(blankDisplay);

    //Clears the letterPosition array - and therefore the occurrenceCount
    letterPosition = [];
}

// Replace blanks with letters guessed
function replacePlaceholders(Display) {
    occurrenceCount = letterPosition.length;
    // console.log("occurrenceCount: " + occurrenceCount);
    totalGuessed += occurrenceCount;
    // console.log("totalGuessed: " + totalGuessed);
    // console.log("guessCounter: " + guessCounter);
    // console.log("guessesRemaining: " + guessesRemaining);
    for (var stringLocation = 0; stringLocation < occurrenceCount; stringLocation++) {
        Display[letterPosition[stringLocation]] = (chosenTeam[letterPosition[stringLocation]]);
        //Log latest to playerOutcome
        playerOutcome = [];
        playerOutcome = playerOutcome.toString() + Display.toString();
    }
    console.log(Display);
    console.log(playerOutcome);
}


function checkWinLose() {
    if ((totalGuessed >= teamNameLength) && (guessesRemaining > 0)) {
        selectTeamBadge(chosenTeam);
        // document.getElementById("teamBadge").style.display = "flex";
        document.getElementById("pressToRestart").style.display = "flex";
        endResult = ("Goal...! &nbsp You got it - the correct answer was &nbsp" + chosenTeam);
        document.getElementById("letterContainer").innerHTML = endResult;
        gamesWon++;
        document.getElementById("totalScore").innerHTML = "TOTAL SCORE :  " + gamesWon;
        console.log(gamesWon);
    } else

        if ((totalGuessed < teamNameLength) && (guessesRemaining < 1)) {
            selectTeamBadge(chosenTeam);
            document.getElementById("teamBadge").style.display = "flex";
            document.getElementById("pressToRestart").style.display = "flex";
            endResult = ("Foul...! &nbsp The correct answer was&nbsp" + chosenTeam);
            document.getElementById("letterContainer").innerHTML = endResult;
        }
}

function displayUpdate(playerScoreCount, computerScoreCount) {
    document.getElementById("playerScore").innerHTML = playerScoreCount;
    document.getElementById("computerScore").innerHTML = computerScoreCount;
    if (totalGuessed < 1) {
        document.getElementById("letterContainer").innerHTML = blankDisplay;
    }
    else {
        document.getElementById("letterContainer").innerHTML = playerOutcome;
    }
    if (computerScoreCount > 0) {
        document.getElementById("incorrectGuessListTitle").innerHTML = "Incorrect guesses:  ";
        document.getElementById("incorrectGuessList").innerHTML = incorrectGuesses;
    }
}

function pressToRestart() {
    // gameStarted = true;
    totalGuessed = 0;
    guessesRemaining = 10;
    guessCounter = 0;
    incorrectGuesses = [];
    blankDisplay = [];
    playerOutcome = [];
    document.getElementById("teamBadge").style.display = "none";
    document.getElementById("pressToRestart").style.display = "none";
    document.getElementById("incorrectGuessListTitle").innerHTML = "";
    document.getElementById("incorrectGuessList").innerHTML = "";
    displayUpdate(totalGuessed, incorrectGuesses.length);
    replacePlaceholders(blankDisplay);
    playGame();
}


function selectTeamBadge(teamName) {
    //Construct image address
    teamBadgeAddress = "assets/images/" + teamName + ".png";
    console.log(teamBadgeAddress);

    //Show team badge
    var badgeDiv = document.getElementById("teamBadge");
    badgeDiv.innerHTML = "";
    var winnerBadge = document.createElement("IMG");
    winnerBadge.setAttribute("src", teamBadgeAddress);
    winnerBadge.setAttribute("width", "auto");
    winnerBadge.setAttribute("height", "250");
    winnerBadge.setAttribute("alt", "Team Badge");
    badgeDiv.appendChild(winnerBadge);
    document.getElementById("teamBadge").style.display = "flex";
}


//FUNCTION CALLS FOR PROGRAM EXECUTION   
playGame()

function playGame() {
    chooseTeam();
    chosenTeamLengthCount();
    displayPlaceholders();
    playerGuesses();
}
