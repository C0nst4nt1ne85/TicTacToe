var canvas;
var context;
var player;
var difficulty;
var mousePos;
var desiredPos;
var playerSign;
var pcSign;
var pcTurn = 0;
var playerScore = 0;
var pcScore = 0;
var availablePos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var playerPos = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, };
var pcPos = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, };

const canvasSize = 500;
//postitions where signs can be played
const signPos = { 1: [canvasSize / 6, canvasSize / 6], 2: [canvasSize / 2, canvasSize / 6], 3: [(5 * canvasSize) / 6, canvasSize / 6], 4: [canvasSize / 6, canvasSize / 2], 5: [canvasSize / 2, canvasSize / 2], 6: [(5 * canvasSize) / 6, canvasSize / 2], 7: [canvasSize / 6, (5 * canvasSize) / 6], 8: [canvasSize / 2, (5 * canvasSize) / 6], 9: [(5 * canvasSize) / 6, (5 * canvasSize) / 6] };

$(window).ready(function() {
    canvas = document.getElementById("gameCanvas");
    canvas.width = canvas.height = canvasSize;
    context = canvas.getContext("2d");

    $("button").click(function () {
        buttons($(this).attr("value"));
    });

    initiliaze();
    

});




//stages of flow
function initiliaze() {
    availablePos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    playerPos = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, };
    pcPos = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, };
    changeScore();
    drawBackground();
    drawField();
    pcTurn = 0;
    if (playerSign == "X") {
        player = true;
        game();
    } else if (playerSign == "O") {
        player = false;
        game();
    }
}

function reset () {
    playerSign = pcSign ="";
    playerScore = pcScore = 0;
    $("#easy").html("X");
    $("#hard").html("O");
    changeText("You Choose X or 0?", "#b3c0a4");
    $(".choise").css("visibility", "visible");
    $(".score").css("visibility", "hidden");
    $("#reset").css("visibility", "hidden");
    player = undefined;
    initiliaze();
}

function diffMode() {
    changeText("How difficult?", "#b3c0a4")
    $(".choise").css("visibility", "hidden");
    $(".mode").css("visibility", "visible");
}

function game () {
    desiredPos = 0;
    if (player) {
        changeText("Your turn!", "#22aaa1");
        playerTurn();
    } else {
        changeText("PC turn!", "#8c271e");
        var aiturn = window.setInterval(function(){
            if (difficulty == "easy") {
                easyAi();
            } else {
                hardAi();
            }
            clearInterval(aiturn);
        }, 800);
    }
}

function playerTurn() {
    mousePos = [];
    desiredPos = 0;
    var handle = setInterval(function () {
        $("#gameCanvas").mousedown(function (evt) {
            mousePos = getMousePos(evt);
            if (mousePos[1] < canvasSize / 3) {
                if (mousePos[0] < canvasSize / 3) {
                    desiredPos = 1;
                } else if (mousePos[0] < (2 * canvasSize) / 3) {
                    desiredPos = 2;
                } else {
                    desiredPos = 3;
                }
            } else if (mousePos[1] < (2 * canvasSize) / 3) {
                if (mousePos[0] < canvasSize / 3) {
                    desiredPos = 4;
                } else if (mousePos[0] < (2 * canvasSize) / 3) {
                    desiredPos = 5;
                } else {
                    desiredPos = 6;
                }
            } else {
                if (mousePos[0] < canvasSize / 3) {
                    desiredPos = 7;
                } else if (mousePos[0] < (2 * canvasSize) / 3) {
                    desiredPos = 8;
                } else {
                    desiredPos = 9;
                }
            }
            //find the indented position
        });
        if (availablePos.indexOf(desiredPos) >= 0) {
            $("#gameCanvas").off("mousedown");
            clearInterval(handle);
        }
        logistics();
    }, 200);
}

function checkEndGame() {
    var endScreen;
    if (playerPos[1] && playerPos[2] && playerPos[3]) {
        drawSign(playerSign, 1, "#22aaa1");
        drawSign(playerSign, 2, "#22aaa1");
        drawSign(playerSign, 3, "#22aaa1");
        endGame("player");
    } else if (playerPos[4] && playerPos[5] && playerPos[6]) {
        drawSign(playerSign, 4, "#22aaa1");
        drawSign(playerSign, 5, "#22aaa1");
        drawSign(playerSign, 6, "#22aaa1");
        endGame("player");
    } else if (playerPos[7] && playerPos[8] && playerPos[9]) {
        drawSign(playerSign, 7, "#22aaa1");
        drawSign(playerSign, 8, "#22aaa1");
        drawSign(playerSign, 9, "#22aaa1");
        endGame("player");
    } else if (playerPos[1] && playerPos[4] && playerPos[7]) {
        drawSign(playerSign, 1, "#22aaa1");
        drawSign(playerSign, 4, "#22aaa1");
        drawSign(playerSign, 7, "#22aaa1");
        endGame("player");
    } else if (playerPos[2] && playerPos[5] && playerPos[8]) {
        drawSign(playerSign, 2, "#22aaa1");
        drawSign(playerSign, 5, "#22aaa1");
        drawSign(playerSign, 8, "#22aaa1");
        endGame("player");
    } else if (playerPos[3] && playerPos[6] && playerPos[9]) {
        drawSign(playerSign, 3, "#22aaa1");
        drawSign(playerSign, 6, "#22aaa1");
        drawSign(playerSign, 9, "#22aaa1");
        endGame("player");
    } else if (playerPos[1] && playerPos[5] && playerPos[9]) {
        drawSign(playerSign, 1, "#22aaa1");
        drawSign(playerSign, 5, "#22aaa1");
        drawSign(playerSign, 9, "#22aaa1");
        endGame("player");
    } else if (playerPos[3] && playerPos[5] && playerPos[7]) {
        drawSign(playerSign, 3, "#22aaa1");
        drawSign(playerSign, 5, "#22aaa1");
        drawSign(playerSign, 7, "#22aaa1");
        endGame("player");
    } else if (pcPos[1] && pcPos[2] && pcPos[3]) {
        drawSign(pcSign, 1, "#8c271e");
        drawSign(pcSign, 2, "#8c271e");
        drawSign(pcSign, 3, "#8c271e"); 
        endGame("pc");
    } else if (pcPos[4] && pcPos[5] && pcPos[6]) {
        drawSign(pcSign, 4, "#8c271e");
        drawSign(pcSign, 5, "#8c271e");
        drawSign(pcSign, 6, "#8c271e"); 
        endGame("pc");
    } else if (pcPos[7] && pcPos[8] && pcPos[9]) {
        drawSign(pcSign, 7, "#8c271e");
        drawSign(pcSign, 8, "#8c271e");
        drawSign(pcSign, 9, "#8c271e");
        endGame("pc");
    } else if (pcPos[1] && pcPos[4] && pcPos[7]) {
        drawSign(pcSign, 1, "#8c271e");
        drawSign(pcSign, 4, "#8c271e");
        drawSign(pcSign, 7, "#8c271e");
        endGame("pc");
    } else if (pcPos[2] && pcPos[5] && pcPos[8]) {
        drawSign(pcSign, 2, "#8c271e");
        drawSign(pcSign, 5, "#8c271e");
        drawSign(pcSign, 8, "#8c271e");
        endGame("pc");
    } else if (pcPos[3] && pcPos[6] && pcPos[9]) {
        drawSign(pcSign, 3, "#8c271e");
        drawSign(pcSign, 6, "#8c271e");
        drawSign(pcSign, 9, "#8c271e");
        endGame("pc");
    } else if (pcPos[1] && pcPos[5] && pcPos[9]) {
        drawSign(pcSign, 1, "#8c271e");
        drawSign(pcSign, 5, "#8c271e");
        drawSign(pcSign, 9, "#8c271e");
        endGame("pc");
    } else if (pcPos[3] && pcPos[5] && pcPos[7]) {
        drawSign(pcSign, 3, "#8c271e");
        drawSign(pcSign, 5, "#8c271e");
        drawSign(pcSign, 7, "#8c271e");
        endGame("pc");
    } else if (availablePos.length == 0) {
        endGame("draw");
    } else {
        player = !player;
        game();
    }
}

function endGame(side) {
    var end = window.setInterval(function(){
        switch (side) {
            case "draw":
                drawEndGame("It's a Draw.", 80, "#efefef");
                break;
            case "player":
                playerScore++;
                drawEndGame("You won!", 80, "#22aaa1");
                break;
            case "pc":
                pcScore++;
                drawEndGame("You lose!", 80, "#8c271e");
        }
        clearInterval(end);
    },500);
    

    var restart = window.setInterval(function () {
        initiliaze();
        clearInterval(restart);
    }, 2000);

}

//AI
function easyAi(){
    if (pcPos[1] && pcPos[2] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (pcPos[2] && pcPos[3] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (pcPos[1] && pcPos[3] && availablePos.indexOf(2) >= 0) {
        desiredPos = 2;
    } else if (pcPos[4] && pcPos[5] && availablePos.indexOf(6) >= 0) {
        desiredPos = 6;
    } else if (pcPos[5] && pcPos[6] && availablePos.indexOf(4) >= 0) {
        desiredPos = 4;
    } else if (pcPos[4] && pcPos[6] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (pcPos[7] && pcPos[8] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (pcPos[8] && pcPos[9] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (pcPos[7] && pcPos[9] && availablePos.indexOf(8) >= 0) {
        desiredPos = 8;
    } else if (pcPos[1] && pcPos[4] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (pcPos[4] && pcPos[7] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (pcPos[1] && pcPos[7] && availablePos.indexOf(4) >= 0) {
        desiredPos = 4;
    } else if (pcPos[2] && pcPos[5] && availablePos.indexOf(8) >= 0) {
        desiredPos = 8;
    } else if (pcPos[5] && pcPos[8] && availablePos.indexOf(2) >= 0) {
        desiredPos = 2;
    } else if (pcPos[2] && pcPos[8] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (pcPos[3] && pcPos[6] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (pcPos[6] && pcPos[9] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (pcPos[3] && pcPos[9] && availablePos.indexOf(6) >= 0) {
        desiredPos = 6;
    } else if (pcPos[3] && pcPos[9] && availablePos.indexOf(6) >= 0) {
        desiredPos = 6;
    } else if (pcPos[1] && pcPos[5] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (pcPos[5] && pcPos[9] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (pcPos[1] && pcPos[9] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (pcPos[3] && pcPos[5] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (pcPos[3] && pcPos[7] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (pcPos[5] && pcPos[7] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (playerPos[1] && playerPos[2] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (playerPos[2] && playerPos[3] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (playerPos[1] && playerPos[3] && availablePos.indexOf(2) >= 0) {
        desiredPos = 2;
    } else if (playerPos[4] && playerPos[5] && availablePos.indexOf(6) >= 0) {
        desiredPos = 6;
    } else if (playerPos[5] && playerPos[6] && availablePos.indexOf(4) >= 0) {
        desiredPos = 4;
    } else if (playerPos[4] && playerPos[6] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (playerPos[7] && playerPos[8] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (playerPos[8] && playerPos[9] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (playerPos[7] && playerPos[9] && availablePos.indexOf(8) >= 0) {
        desiredPos = 8;
    } else if (playerPos[1] && playerPos[4] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (playerPos[4] && playerPos[7] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (playerPos[1] && playerPos[7] && availablePos.indexOf(4) >= 0) {
        desiredPos = 4;
    } else if (playerPos[2] && playerPos[5] && availablePos.indexOf(8) >= 0) {
        desiredPos = 8;
    } else if (playerPos[5] && playerPos[8] && availablePos.indexOf(2) >= 0) {
        desiredPos = 2;
    } else if (playerPos[2] && playerPos[8] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (playerPos[3] && playerPos[6] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (playerPos[6] && playerPos[9] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (playerPos[3] && playerPos[9] && availablePos.indexOf(6) >= 0) {
        desiredPos = 6;
    } else if (playerPos[1] && playerPos[5] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (playerPos[5] && playerPos[9] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (playerPos[1] && playerPos[9] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (playerPos[3] && playerPos[5] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (playerPos[3] && playerPos[7] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (playerPos[5] && playerPos[7] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else {
        var max = availablePos.length;
        var sth = Math.trunc(Math.random() * (max + 1)) - 1;
        if (sth < 0 || sth >= max) {
            sth = 0;
        }
        desiredPos = availablePos[sth];
    }
    console.log(desiredPos);
    logistics(); 
}

function hardAi () {
    console.log("I am hard");
    var path;
    pcTurn++;
    if (pcPos[1] && pcPos[2] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (pcPos[2] && pcPos[3] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (pcPos[1] && pcPos[3] && availablePos.indexOf(2) >= 0) {
        desiredPos = 2;
    } else if (pcPos[4] && pcPos[5] && availablePos.indexOf(6) >= 0) {
        desiredPos = 6;
    } else if (pcPos[5] && pcPos[6] && availablePos.indexOf(4) >= 0) {
        desiredPos = 4;
    } else if (pcPos[4] && pcPos[6] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (pcPos[7] && pcPos[8] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (pcPos[8] && pcPos[9] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (pcPos[7] && pcPos[9] && availablePos.indexOf(8) >= 0) {
        desiredPos = 8;
    } else if (pcPos[1] && pcPos[4] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (pcPos[4] && pcPos[7] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (pcPos[1] && pcPos[7] && availablePos.indexOf(4) >= 0) {
        desiredPos = 4;
    } else if (pcPos[2] && pcPos[5] && availablePos.indexOf(8) >= 0) {
        desiredPos = 8;
    } else if (pcPos[5] && pcPos[8] && availablePos.indexOf(2) >= 0) {
        desiredPos = 2;
    } else if (pcPos[2] && pcPos[8] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (pcPos[3] && pcPos[6] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (pcPos[6] && pcPos[9] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (pcPos[3] && pcPos[9] && availablePos.indexOf(6) >= 0) {
        desiredPos = 6;
    } else if (pcPos[3] && pcPos[9] && availablePos.indexOf(6) >= 0) {
        desiredPos = 6;
    } else if (pcPos[1] && pcPos[5] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (pcPos[5] && pcPos[9] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (pcPos[1] && pcPos[9] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (pcPos[3] && pcPos[5] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (pcPos[3] && pcPos[7] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (pcPos[5] && pcPos[7] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (playerPos[1] && playerPos[2] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (playerPos[2] && playerPos[3] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (playerPos[1] && playerPos[3] && availablePos.indexOf(2) >= 0) {
        desiredPos = 2;
    } else if (playerPos[4] && playerPos[5] && availablePos.indexOf(6) >= 0) {
        desiredPos = 6;
    } else if (playerPos[5] && playerPos[6] && availablePos.indexOf(4) >= 0) {
        desiredPos = 4;
    } else if (playerPos[4] && playerPos[6] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (playerPos[7] && playerPos[8] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (playerPos[8] && playerPos[9] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (playerPos[7] && playerPos[9] && availablePos.indexOf(8) >= 0) {
        desiredPos = 8;
    } else if (playerPos[1] && playerPos[4] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (playerPos[4] && playerPos[7] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (playerPos[1] && playerPos[7] && availablePos.indexOf(4) >= 0) {
        desiredPos = 4;
    } else if (playerPos[2] && playerPos[5] && availablePos.indexOf(8) >= 0) {
        desiredPos = 8;
    } else if (playerPos[5] && playerPos[8] && availablePos.indexOf(2) >= 0) {
        desiredPos = 2;
    } else if (playerPos[2] && playerPos[8] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (playerPos[3] && playerPos[6] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (playerPos[6] && playerPos[9] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (playerPos[3] && playerPos[9] && availablePos.indexOf(6) >= 0) {
        desiredPos = 6;
    } else if (playerPos[1] && playerPos[5] && availablePos.indexOf(9) >= 0) {
        desiredPos = 9;
    } else if (playerPos[5] && playerPos[9] && availablePos.indexOf(1) >= 0) {
        desiredPos = 1;
    } else if (playerPos[1] && playerPos[9] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (playerPos[3] && playerPos[5] && availablePos.indexOf(7) >= 0) {
        desiredPos = 7;
    } else if (playerPos[3] && playerPos[7] && availablePos.indexOf(5) >= 0) {
        desiredPos = 5;
    } else if (playerPos[5] && playerPos[7] && availablePos.indexOf(3) >= 0) {
        desiredPos = 3;
    } else if (pcSign == "X") {
            console.log("I am X, turn" + pcTurn);
            if (pcTurn == 1) {
                desiredPos = 7;
            } else if (pcTurn == 2) {
                if (availablePos.indexOf(5) >= 0) {
                    console.log("noCenter");
                    if (availablePos.indexOf(1) >= 0){
                        desiredPos = 1;
                    } else {
                        desiredPos =3;
                    }
                } else {
                    console.log("Center");
                    path = Math.floor(Math.random() * 2) + 1;
                    if (path == 1) {
                        desiredPos = 3;
                    } else {
                        path = Math.floor(Math.random() * 2) + 1;
                        if (path == 1) {
                            desiredPos = 2;
                        } else {
                            desiredPos = 6;
                        }
                    }
                }
            } else if (pcTurn === 3) {
                if (availablePos.indexOf(9) >= 0) {
                    desiredPos = 9;
                } else {
                    desiredPos = 3;
                }
            } availablePos.indexOf(5) >= 0
        } else if (pcSign == "O") {
            if (pcTurn == 1) {
                if (availablePos.indexOf(5) >= 0) {
                    desiredPos = 5;
                } else {
                    desiredPos = 3;
                } 
            } else if (playerPos[5] == true && playerPos[7] == true) {
                desiredPos = 1;     
            } else if (pcTurn == 2 && ((playerPos[1] && playerPos[7]) || (playerPos[2] && playerPos[8]) || (playerPos[3] && playerPos[9]) || (playerPos[1] && playerPos[3]) || (playerPos[4] && playerPos[6]) || (playerPos[7] && playerPos[9]) ))  {
                desiredPos = 9;
            } else if (pcTurn > 1) {
                if (availablePos.indexOf(2) >= 0) {
                    desiredPos = 2;
                } else if (availablePos.indexOf(4) >= 0) {
                    desiredPos = 4;
                } if (availablePos.indexOf(6) >= 0) {
                    desiredPos = 6;
                } else if (availablePos.indexOf(8) >= 0) {
                    desiredPos = 8;
                }
            }  
            } else {
        desiredPos = availablePos[0];
    } 
    logistics();
}

//"backend" functions

function getMousePos(evt) {
    var mouseX = evt.offsetX * canvasSize / canvas.clientWidth | 0;
    var mouseY = evt.offsetY * canvasSize / canvas.clientHeight | 0;
    return [mouseX, mouseY];
}

function logistics() {
    //checks if the position is free or not and if the interval has stopped
    if (desiredPos != 0 && availablePos.indexOf(desiredPos) >= 0) {
        if (player){
            drawSign(playerSign, desiredPos, "#efefef");
            playerPos[desiredPos] = true;
        } else {
            drawSign(pcSign, desiredPos, "#efefef");
            pcPos[desiredPos] = true;
        }
        availablePos = availablePos.filter(function (p) {
            return p != desiredPos;
        });
        checkEndGame();
    }
}

//buttons
function buttons(val) {
    switch (val) {
        case "X":
            playerSign = "X"
            pcSign = "O"
            player = true;
            diffMode();
            break;
        case "O":
            playerSign = "O"
            pcSign = "X"
            player = false;
            diffMode();
            break;
        case "easy": 
            difficulty = "easy";
            drawInGame();
            game();
            break;
        case "hard":
            difficulty = "hard";
            drawInGame();
            game();
            break;
        case "reset":
            reset();
            break;
    }
}


//painting
function drawBackground() {
    context.fillStyle = "#1e1e24";
    context.fillRect(0, 0, 800, 800)
}

function drawField() {
    context.fillStyle = "#efefef";
    for (var i = Math.trunc(canvasSize / 3); i < canvasSize - canvasSize % 3; i += Math.trunc(canvasSize / 3)) {
        context.fillRect(i, 0, 10, canvasSize);
        //seperates the field in 3 columns
        context.fillRect(0, i, canvasSize, 10);
        //seperates the field in 3 rows
    }
}

function changeText(string, color) {
    $("#text").css("color", color);
    $("#text").html(string);
}

function changeScore() {
    $("#playerScore").html("Player:" + playerScore);
    $("#pcScore").html("PC:" + pcScore);
}

function drawSign (sign, pos, color) {
    var x = signPos[pos][0];
    var y = signPos[pos][1] + 40;
    //40 is half of the 80px font in order to be justified in center
    context.font = "80px Permanent Marker";
    context.textAlign = "center";
    context.fillStyle = color;
    context.fillText(sign, x, y);
}

function drawInGame () {
    $(".mode").css("visibility", "hidden");
    $(".score").css("visibility", "visible");
    $("#reset").css("visibility", "visible");
    //make the score and reset button appear and the sign choise buttons dissapear
}

function drawEndGame(text, size, color) {
    drawBackground();
    context.font = "" + size + "px Permanent Marker";
    context.textAlign = "center";
    context.fillStyle = color;
    context.fillText(text, canvasSize / 2, canvasSize / 2);
}