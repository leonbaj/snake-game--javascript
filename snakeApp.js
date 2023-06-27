
//

//Declared variables here. 
"use strict";
var gameStart= null,
gameSpeed= null,
gameArea= null,
gameAreaContext= null,
gameAreaWidth= 0,
gameAreaHeight= 0,
cellWidth= 0,
playerScore= 0,


snake= null,
snakeFood= null,
snakeDirection= null,
speedSize= 0,
timer= null;



//initializing var to html Ids. 
function initialize(){
    gameStart= document.querySelector("#gameStart");
    gameSpeed= document.querySelector("#gameSpeed");
    gameArea= document.querySelector("#gameArea");
    gameAreaContext= gameArea.getContext("2d");
    gameAreaWidth= 400;
    gameAreaHeight= 600;
    cellWidth= 20;
    gameArea.width = gameAreaWidth;
    gameArea.height = gameAreaHeight;

    //event function happens on click start. 
    gameStart.onclick = function() {
        this.disabled = true;
        startGame();
    };
}

    //initializes game aspects- such as score, default snake direction, speedsize if specified by input. 
function startGame(){
    playerScore= 0;
    snakeDirection= "right";
    speedSize= parseInt(gameSpeed.value);


    //checks if input is larger than 9 it will default to 9. else if speedsize is smaller than 0 default it to 1.
    if(speedSize > 9){
        speedSize= 9;
    }else if (speedSize < 0){
        speedSize= 1;
    }
    snake= [];
    snake.push({ x: 0, y: cellWidth});
    createFood();
    clearInterval(timer);
    timer= setInterval(createGameArea, 500/speedSize);

}

    //Method used to create food, using random generated numbers. within the range of cell width and game area width and height as (X,Y) cordinates on browser.
function createFood(){
    snakeFood= {
        x: Math.round((Math.random() * (gameAreaWidth - cellWidth)) /cellWidth),
        y: Math.round((Math.random() * (gameAreaHeight - cellWidth)) /cellWidth),
    };
}

function createGameArea(){
    var snakeX= snake[0].x; //traversing two arrays to assign snakeX to use to check which way the snake is going left or right
    var snakeY= snake[0].y; //similarly here its assigning snakeY to check which way the snake is going up or down. 

    gameAreaContext.fillStyle= "#FFFFFF";                               // gameAreaContext (display) is calling method of the Canvas 2D API colors in a area a specific color.
    gameAreaContext.fillRect(0, 0,gameAreaWidth, gameAreaHeight);       // calls method in Canvas 2D API draws a rectamng;e that is filled according to the current fillstyle
    gameAreaContext.strokeStyle = "#CCCCCC";                            // calls method in canvas 2D API colors in a specific color
    gameAreaContext.strokeRect(0, 0, gameAreaWidth, gameAreaHeight);    // calls method in canvas 2D API draws a rectangle that is outlined accoriding to current strokestyle
    
    //checks direction of snake of either up down left or right. and increments or decrements both x and y values to update counter 
    if(snakeDirection == 'right'){
        snakeX++;
    } else if(snakeDirection == 'left'){
        snakeX--;
    } else if(snakeDirection == 'down'){
        snakeY++;
    } else if(snakeDirection == 'up'){
        snakeY--;
    }
    // lastly checks if snake has collied with itself or if it hit the end of the game space, or if control returns false. if so then it will print out score and end game
    if(
         snakeX == -1 || snakeX == gameAreaWidth/cellWidth || snakeY == -1 || snakeY == gameAreaHeight/cellWidth || Control(snakeX, snakeY, snake)
    ){
    writeScore();
    clearInterval(timer);
    gameStart.disabled = false;
    return;
    }

    //adds new head to snake game as it eats food and progresses, PlayerScore is also incrementing by speedSize and creates new food!
    if (snakeX == snakeFood.x && snakeY == snakeFood.y){
        var newHead = {x: snakeX, y: snakeY};
        playerScore += speedSize;
        createFood();
    }
    // basically updateing snake as it moves(iterates) through
    else{
        var newHead = snake.pop();
        newHead.x = snakeX;
        newHead.y = snakeY;
    }

    // Creating snake here iterates how long the snake should be using CreateSquare
    snake.unshift(newHead);
    for (let i = 0; i<snake.length; i++){
    createSquare(snake[i].x, snake[i].y)
    }

    //creates square to show where the snake food is and where the snake should head
    createSquare(snakeFood.x, snakeFood.y)
    
}

// control takes in three paraimeters, and x an y and an array. used in line 92 used to check if the snake has collieded with itself. 
function Control(x,y,array){
    for (let i=0; i<array.length; i++){
        if (array[i].x == x && array[i].y == y){
            return true;
        }
    }
    return false;
}
// a seperate function to write out score
function writeScore(){
    gameAreaContext.font = "50px sans-serif";
    gameAreaContext.fillStyle = "#FFF333";
    gameAreaContext.fillText(
        "Score: " +playerScore, gameAreaWidth /2 -100, gameAreaWidth /2
    );
}
// function that creates a square used as food for the game. used in line 116 and 120
function createSquare(x,y){
    gameAreaContext.fillStyle = "#000000";
    gameAreaContext.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
}

// function that changes direction takes in paremeter e as in event happing (keys clicking) 
function changeDirection(e){
    var keys = e.which;
    
    if (keys =="40" && snakeDirection !="up"){snakeDirection="down";}
    else if (keys =="39" && snakeDirection !="left"){snakeDirection="right";}
    else if (keys =="38" && snakeDirection !="down"){snakeDirection="up";}
    else if (keys =="37" && snakeDirection !="right"){snakeDirection="left";}
}

//each time a key is pressed in will execute funtion changeDirection which will check which key was pressed (can only be arrow keys and not wasd) 
window.onkeydown = changeDirection;
// 
window.onload = initialize;

