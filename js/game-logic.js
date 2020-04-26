// All code should be written in this file.

const playerOneName = 'Player One',
    playerTwoName = 'Player Two';

let playerOneMoveOneType = undefined,
    playerOneMoveTwoType = undefined,
    playerOneMoveThreeType = undefined,
    playerTwoMoveOneType = undefined,
    playerTwoMoveTwoType = undefined,
    playerTwoMoveThreeType = undefined,
    playerOneMoveOneValue = undefined,
    playerOneMoveTwoValue = undefined,
    playerOneMoveThreeValue = undefined,
    playerTwoMoveOneValue = undefined,
    playerTwoMoveTwoValue = undefined,
    playerTwoMoveThreeValue = undefined;

const globalChecker = () => {
    if ((playerOneMoveOneType && playerOneMoveTwoType && playerOneMoveThreeType &&
        playerTwoMoveOneType && playerTwoMoveTwoType && playerTwoMoveThreeType &&
        playerOneMoveOneValue && playerOneMoveTwoValue && playerOneMoveThreeValue &&
        playerTwoMoveOneValue && playerTwoMoveTwoValue && playerTwoMoveThreeValue) !== undefined) {
            return true;
    } else {
        return false;
    }
}

const moveTypeChecker = type => {
    if (type === 'rock' || type === 'scissors' || type === 'paper') {
        return true;
    } else {
        return false;
    }
};

const moveValueChecker = value => {
    if (value >= 1 && value <= 99) {
        return true;
    }
    return false;
};

const sumValue = (valueOne, valueTwo, valueThree) => {
    const sum = valueOne + valueTwo + valueThree;

    if (sum > 99) {
        return false;
    }

    return true;
};

const roundChecker = (playerOneMove, playerOneValue, playerTwoMove, playerTwoValue) => {
    if (moveTypeChecker(playerOneMove) && moveTypeChecker(playerTwoMove) &&
        moveValueChecker(playerOneValue) && moveValueChecker(playerTwoValue)) {
            if (playerOneMove === playerTwoMove && playerOneValue === playerTwoValue) {
                return 'Tie'
            }
            if ((playerOneMove === 'scissors' && playerTwoMove === 'paper') ||
                (playerOneMove === 'rock' && playerTwoMove === 'scissors') ||
                (playerOneMove === 'paper' && playerTwoMove === 'rock') || 
                (playerOneMove === playerTwoMove && playerOneValue > playerTwoValue)) {
                    return playerOneName;
            }
            return playerTwoName;
    } else {
        return null;
    }  
};
 
const setPlayerMoves = (
    player, 
    moveOneType, 
    moveOneValue, 
    moveTwoType, 
    moveTwoValue, 
    moveThreeType, 
    moveThreeValue
) => {
    if (moveTypeChecker(moveOneType) && moveTypeChecker(moveTwoType) && moveTypeChecker(moveThreeType)) {
        if (moveValueChecker(moveOneValue) && moveValueChecker(moveTwoValue) && 
            moveValueChecker(moveThreeValue) && sumValue(moveOneValue, moveTwoValue, moveThreeValue)) {
                if (player === playerOneName) {
                    playerOneMoveOneType = moveOneType;
                    playerOneMoveTwoType = moveTwoType;
                    playerOneMoveThreeType = moveThreeType;
                    playerOneMoveOneValue = moveOneValue;
                    playerOneMoveTwoValue = moveTwoValue;
                    playerOneMoveThreeValue = moveThreeValue;
                } else if (player === playerTwoName) {
                    playerTwoMoveOneType = moveOneType;
                    playerTwoMoveTwoType = moveTwoType;
                    playerTwoMoveThreeType = moveThreeType;
                    playerTwoMoveOneValue = moveOneValue;
                    playerTwoMoveTwoValue = moveTwoValue;
                    playerTwoMoveThreeValue = moveThreeValue;
                }
        }
    }
};

const getRoundWinner = round => {
    if (round === 1) {
        return roundChecker(playerOneMoveOneType, playerOneMoveOneValue, playerTwoMoveOneType, playerTwoMoveOneValue);
    } else if (round === 2) {
        return roundChecker(playerOneMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoType, playerTwoMoveTwoValue);
    } else if (round === 3) {
        return roundChecker(playerOneMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeType, playerTwoMoveThreeValue);
    } else {
        return null;
    }
};

const getGameWinner = () => {
    let playerOneCounter = 0,
        playerTwoCounter = 0;

    if (globalChecker()) {
        
        for (i=1; i <=3; i++) {
            if (getRoundWinner(i) === playerOneName) {
                playerOneCounter += 1;
            } else if (getRoundWinner(i) === playerTwoName) {
                playerTwoCounter += 1;
            }
        }


        if (playerOneCounter > playerTwoCounter) {
            return playerOneName;
        } else if (playerOneCounter < playerTwoCounter) {
            return playerTwoName;
        } else if (playerOneCounter === playerTwoCounter) {
            return 'Tie';
        }
    } else {
        return null;
    }
};

const setComputerMoves = () => {
    const type = ['rock', 'paper', 'scissors'];

    let movesTypes = [],
        movesValues = [],
        counter = 98;
    
    const moveType = () => {
        const index = (Math.floor(Math.random() * 3));
        
        return type[index];
    }

    playerTwoMoveOneType = moveType();
    playerTwoMoveTwoType = moveType();
    playerTwoMoveThreeType = moveType();

    for (i=0; i<=2; i++) {
        if (i < 2) {
            movesValues.push(Math.floor(Math.random() * counter));
            counter = counter - movesValues[movesValues.length - 1];
        } else if (i === 2) {
            movesValues.push(counter + 1);
        }
    }

    playerTwoMoveOneValue = movesValues[0];
    playerTwoMoveTwoValue = movesValues[1];
    playerTwoMoveThreeValue = movesValues[2];
}
