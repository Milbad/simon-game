var gameOn = false;
var count = 1;
var index;
var colorArr = [];
var playerTurn = false;
var playerCount = 0;
var color = "";
var yellowColor = "highlight";
var yellowSound = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
var greenSound = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
var greenColor = "highlightgreen";
var redSound = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
var redColor = "highlightred";
var blueSound = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
var blueColor = "highlightblue";

var checkGame = function(colordiv) {
    if (colordiv.attr("value") === colorArr[playerCount]) {
        playerCount += 1;
        if (playerCount === colorArr.length && playerCount < 21) {
            color = selectRandomColor();
            colorArr.push(color);
            count += 1;
            playerCount = 0;
            setTimeout(function() {
                computerPlay();
            }, 800);

        }
        if (count === 21) {
            setTimeout(function() {
                alert("YOUHOU!\nYOU WIN THE GAME!! LET'S PLAY AGAIN!");
            }, 800);
            newGame();

        }
    } else {
        playerCount = 0;
        setTimeout(function() {
            alert("OUPS! YOU LOOSE!\nLET'S PLAY AGAIN!");
        }, 800);
        if ($("#strictlight").attr("class") === "highlightred") {
            newGame();

        } else {
            setTimeout(function() {
                computerPlay();
            }, 800);

        }
    }

};
var newGame = function() {
    resetValues();
    color = selectRandomColor();
    colorArr.push(color);
    setTimeout(function() {
        computerPlay();
    }, 800);
};
var resetValues = function() {
    count = 1;
    colorArr = [];
    playerTurn = false;
    playerCount = 0;
    computerPlay();
};

var lightAndSound = function(color, highlight, sound) {
    color.toggleClass(highlight);
    var audio = new Audio(sound);
    audio.play();
    setTimeout(function() {
        color.toggleClass(highlight);
    }, 1000);
};

$("#yellow").click(function() {
    if (playerTurn) {
        lightAndSound($(this), yellowColor, yellowSound);
        checkGame($(this));
    }
});

$("#red").click(function() {
    if (playerTurn) {
        lightAndSound($(this), redColor, redSound);
        checkGame($(this));
    }
});

$("#green").click(function() {
    if (playerTurn) {
        lightAndSound($(this), greenColor, greenSound);
        checkGame($(this));
    }
});

$("#blue").click(function() {
    if (playerTurn) {
        lightAndSound($(this), blueColor, blueSound);
        checkGame($(this));
    }
});

$("#strict").click(function() {
    if (gameOn) {
        $("#strictlight").toggleClass("highlightred");
    }
});

$("#start").click(function() {
    color = selectRandomColor();
    colorArr.push(color);
    computerPlay();
});

$(".slider").click(function() {
    if (gameOn) {
        gameOn = false;
        $("#count").text("");
        resetValues();
    } else {
        gameOn = true;
        $("#count").text('--');
    }
});

var selectRandomColor = function() {
    var num = Math.round(Math.random() * (4 - 1) + 1);
    switch (num) {
        case 1:
            color = "yellow";
            break;
        case 2:
            color = "blue";
            break;
        case 3:
            color = "red";
            break;
        case 4:
            color = "green";
            break;
        default:
            color = "yellow";
    }
    return color;
};

var myLoop = function() {
    setTimeout(function() {    
        computerReplay(index);
        index++;    
        if (index < colorArr.length) {       
            myLoop();        
        } else {
            playerTurn = true;
        }
    }, 1300);
};

var computerPlay = function() {
    playerTurn = false;
    if (gameOn) {
        if (count < 10) {
            $("#count").text("0" + count);
        } else {
            $("#count").text(count);
        }
    }
    index = 0;
    myLoop();
};

var computerReplay = function(ind) {
    switch (colorArr[ind]) {
        case "yellow":
            lightAndSound($("#yellow"), yellowColor, yellowSound);
            break;
        case "blue":
            lightAndSound($("#blue"), blueColor, blueSound);
            break;
        case "red":
            lightAndSound($("#red"), redColor, redSound);
            break;
        case "green":
            lightAndSound($("#green"), greenColor, greenSound);
            break;
        default:
            console.log("default message");
    }
};
