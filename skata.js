


const winningPos = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8],[3,6,9],[1,5,9], [3,5,7]];
//define the sign positions








//main game
function game(side){
    if (side == "player") {
        textDraw();
        $("#gameCanvas").mousedown(function (evt) {
            click(getMousePos(evt));
            return;
        })
        checkEndGame("player");
        game("pc");
    } else {
        textDraw();
        setTimeout(() => {
            if (availablePos.length > 1) {
                desiredPos = availablePos[RandomAi(availablePos.length - 1)];
            } else {
                desiredPos = availablePos[0];
            }
            signDraw(pcSign, desiredPos, "#efefef");
            pcPos[desiredPos] = true;
            availablePos = availablePos.filter(function (p) {
                return p != desiredPos;
            });
            checkEndGame();
        }, 2000);
        game("player");
    }
    if (availablePos.length == 0) {
        endGame("draw");
    }
}



function checkEndGame(side) {
    if (side == "player") {
        if (playerPos[1] && playerPos[2] && playerPos[3]) {
            signDraw(playerSign, 1, "#22aaa1");
            signDraw(playerSign, 2, "#22aaa1");
            signDraw(playerSign, 3, "#22aaa1");
             endGame("player"); 
        } else if (playerPos[4] && playerPos[5] && playerPos[6]) {
            signDraw(playerSign, 4, "#22aaa1");
            signDraw(playerSign, 5, "#22aaa1");
            signDraw(playerSign, 6, "#22aaa1");
            endGame("player"); 
        } else if (playerPos[7] && playerPos[8] && playerPos[9]) {
            signDraw(playerSign, 7, "#22aaa1");
            signDraw(playerSign, 8, "#22aaa1");
            signDraw(playerSign, 9, "#22aaa1");
            endGame("player"); 
        } else if (playerPos[1] && playerPos[4] && playerPos[7]) {
            signDraw(playerSign, 1, "#22aaa1");
            signDraw(playerSign, 4, "#22aaa1");
            signDraw(playerSign, 7, "#22aaa1");
            endGame("player"); 
        } else if (playerPos[2] && playerPos[5] && playerPos[8]) {
            signDraw(playerSign, 2, "#22aaa1");
            signDraw(playerSign, 5, "#22aaa1");
            signDraw(playerSign, 8, "#22aaa1");
            endGame("player"); 
        } else if (playerPos[3] && playerPos[6] && playerPos[9]) {
            signDraw(playerSign, 3, "#22aaa1");
            signDraw(playerSign, 6, "#22aaa1");
            signDraw(playerSign, 9, "#22aaa1");
             endGame("player"); 
        } else if (playerPos[1] && playerPos[5] && playerPos[9]) {
            signDraw(playerSign, 1, "#22aaa1");
            signDraw(playerSign, 5, "#22aaa1");
            signDraw(playerSign, 9, "#22aaa1");
            endGame("player"); 
        } else if (playerPos[3] && playerPos[5] && playerPos[7]) {
            signDraw(playerSign, 3, "#22aaa1");
            signDraw(playerSign, 5, "#22aaa1");
            signDraw(playerSign, 7, "#22aaa1");
            endGame("player"); 
        } else {
            playerTurn = false;
        }
    } else {
        if (pcPos[1] && pcPos[2] && pcPos[3]) {
            signDraw(pcSign, 1, "#8c271e");
            signDraw(pcSign, 2, "#8c271e");
            signDraw(pcSign, 3, "#8c271e");endGame("pc");
        } else if (pcPos[4] && pcPos[5] && pcPos[6]) {
            signDraw(pcSign, 4, "#8c271e");
            signDraw(pcSign, 5, "#8c271e");
            signDraw(pcSign, 6, "#8c271e");
        } else if (pcPos[7] && pcPos[8] && pcPos[9]) {
            signDraw(pcSign, 7, "#8c271e");
            signDraw(pcSign, 8, "#8c271e");
            signDraw(pcSign, 9, "#8c271e");
            endGame("pc");
        } else if (pcPos[1] && pcPos[4] && pcPos[7]) {
            signDraw(pcSign, 1, "#8c271e");
            signDraw(pcSign, 4, "#8c271e");
            signDraw(pcSign, 7, "#8c271e");
            endGame("pc");
        } else if (pcPos[2] && pcPos[5] && pcPos[8]) {
            signDraw(pcSign, 2, "#8c271e");
            signDraw(pcSign, 5, "#8c271e");
            signDraw(pcSign, 8, "#8c271e");
            endGame("pc");
        } else if (pcPos[3] && pcPos[6] && pcPos[9]) {
            signDraw(pcSign, 3, "#8c271e");
            signDraw(pcSign, 6, "#8c271e");
            signDraw(pcSign, 9, "#8c271e");
            endGame("pc"); 
        } else if (pcPos[1] && pcPos[5] && pcPos[9]) {
            signDraw(pcSign, 1, "#8c271e");
            signDraw(pcSign, 5, "#8c271e");
            signDraw(pcSign, 9, "#8c271e");
            endGame("pc");
        } else if (pcPos[3] && pcPos[5] && pcPos[7]) {
            signDraw(pcSign, 3, "#8c271e");
            signDraw(pcSign, 5, "#8c271e");
            signDraw(pcSign, 7, "#8c271e");
            endGame("pc");
        } else {
            playerTurn = true;
        }
    }
}

function RandomAi() {
    if (availablePos.length > 1) {
        desiredPos = (Math.floor(Math.random() * ((availablePos.length - 1) - 1)));
    } else {
        desiredPos = availablePos[0];
    }
    drawSign(pcSign, desiredPos, "#efefef");
    pcPos[desiredPos] = true;
    availablePos = availablePos.filter(function (p) {
        return p != desiredPos;
    });
    checkEndGame();
}
}