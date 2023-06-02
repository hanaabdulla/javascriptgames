var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var gameEl = document.getElementById("game-el");
var velocityX = 0;
var velocityY = 0;
var scoreEl = document.getElementById("score-el");
var snakeX = blocksize * 10;
var snakeY = blocksize * 10;
var snakebody = [];
var foodx;
var foody;
var gameover=false;
var score =0;


window.onload = function () {
   
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");
   
    setfood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
   
}
function update() {
    if(gameover==true){
        return;
    }
    for(let i=0 ; i<snakebody.length;i++){
        if(snakeX==snakebody[i][0] && snakeY==snakebody[i][1]){
            gameover=true;
            gameEl.innerHTML = "Game Over";
        }
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    if (snakeX == foodx && snakeY == foody) {
        snakebody.push([foodx, foody]);
        setfood();
    }
    for(let i=snakebody.length-1;i>0;i--){
        snakebody[i] = snakebody[i-1];
        
    }
    if(snakebody.length>0){
        snakebody[0] = [snakeX,snakeY];
    }
    context.fillStyle = "red";
    context.fillRect(foodx, foody, blocksize, blocksize);
    snakeX += velocityX*blocksize;
    snakeY += velocityY*blocksize;
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
   
   
    for(var i=0;i<snakebody.length;i++){
        context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
    }
    if(snakeX<0 || snakeX>=board.width || snakeY<0 || snakeY>=board.height){
        gameover=true;
        gameEl.textContent = "Game Over";
    }
}
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;

    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;

    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;

    }

}
function setfood() {
    foodx = Math.floor(Math.random() * cols) * blocksize;
    foody = Math.floor(Math.random() * rows) * blocksize;
}
function startgame() {
    gameover=false;
    snakebody = [];
    snakeX = blocksize * 10;
    snakeY = blocksize * 10;
    velocityX = 0;
    velocityY = 0;
    score=0;
}
