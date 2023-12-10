let easyMode = true;
let keySequence = [];
let playerSequence = [];

$("button.gre").click(function(event) {
    clickButton("gre");
});
$("button.red").click(function(event) {
    clickButton("red");
});
$("button.yel").click(function(event) {
    clickButton("yel");
});
$("button.blu").click(function(event) {
    clickButton("blu");
});

function randColor(){
    var tmp = Math.floor(Math.random() * 4) + 1
    switch (tmp) {
        case 1:
            return "gre";
            break;
        case 2:
            return "red";
            break;    
        case 3:
            return "yel";
            break;
        case 4:
            return "blu";
            break;    
        default:
            return "err";
            break;
    }
}

function animateButton(button){
    var target = "button." + button
    
    $(target).addClass("pressed");

    setTimeout(function () {
        $(target).removeClass("pressed");
    }, 75);    
}

function playSound(color){
    let sound = new Audio("./sounds/" + color + ".mp3")
    sound.play();
}

function clickButton(color){
    animateButton(color);
    playSound(color); // only play color if guess was correct, else playSound("err");
    playerSequence.push(color);
    
    // Check correctness
    for(var i = 0; i < playerSequence.length; i++){
        if(playerSequence[i] !== keySequence[i]){
            lose();
        }
    }

    if(playerSequence.length == keySequence.length){
        console.log("winner")
        setTimeout(lvlUp, 500);
        //lvlUp();
    }
}

function lvlUp() {
    var newColor = randColor();
    keySequence.push(newColor);
    changeText("Level " + keySequence.length)
    animateButton(newColor);
    playSound(newColor);
    playerSequence = [];
}

function lose() {
    $("body").addClass("wrong"); // Add the lose-screen CSS styling
    changeText("You lost at level " + keySequence.length + ". Click <span class='link'>here</span> to play again.");
    console.log ("You lose! You got to level " + keySequence.length + ". Better luck next time!");
   keySequence = [];
}

function changeText(text){
    $("h1").html(text);
}

$("h1").on("click", ".link", function(){  // Start the game
    console.log("link clicked")
    $("body").removeClass("wrong"); // Add the lose-screen CSS styling
    if(keySequence.length <= 0){
        lvlUp();
    }
});

