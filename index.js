const gameBoard = document.getElementById("gameBoard");
const context = gameBoard.getContext("2d");
let scoreText = document.getElementById("scoreVal");


const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let SPEED = 400; // speed of the snake
let score = 0; 
let active= false;
let started = false;
let snake = [
    {x: UNIT*3, y:0},
    {x: UNIT*2, y:0},
    {x: UNIT, y:0},
    {x: 0, y:0}
]
if(!started){
    window.addEventListener('keydown', keyPress);
}
startGame();

function startGame() {
  context.fillStyle = "darkslategrey";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  createFood();
  displayFood();
  drawSnake();
}

function createFood() {
    foodX = Math.floor((Math.random() * WIDTH) / UNIT) * UNIT;
    foodY = Math.floor((Math.random() * WIDTH) / UNIT) * UNIT;
}

function displayFood() {
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, UNIT, UNIT);
}

function drawSnake(){
    context.fillStyle = 'aqua';
    context.strokeStyle = 'darkslategrey';
    snake.forEach(element => {
        context.fillRect(element.x, element.y, UNIT,UNIT);
        context.strokeRect(element.x,element.y, UNIT, UNIT);
    });
}

function moveSnake(){
    const head = {x: snake[0].x + xVel, y: snake[0].y + yVel};
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        createFood();
        score++;
        scoreText.textContent = score;
        if(SPEED>150){
            SPEED -=50;
        }
    }
    else{
        snake.pop();
    }
}

function clearBoard(){
    context.fillStyle = 'darkslategrey';
    context.fillRect(0,0,WIDTH,HEIGHT);
}

function nextStep(){
    if(active){
        setTimeout(()=>{
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextStep();
        },SPEED)
    }
}

function keyPress(event){

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    active = true;

    if(!started){
        started = true;
        nextStep();
    }

    switch(true){
        case(event.keyCode == LEFT && xVel != UNIT):
            xVel =-UNIT;
            yVel = 0;
            break
        case(event.keyCode == RIGHT && xVel != -UNIT):
            xVel =UNIT;
            yVel = 0;
            break
        case(event.keyCode == UP && yVel != UNIT):
            xVel =0;
            yVel =-UNIT;
            break
        case(event.keyCode == DOWN && yVel != -UNIT):
            xVel =0;
            yVel =UNIT;
            break
    }
}

function checkGameOver(){
    switch (true) {
        case (snake[0].x<0 ||
            snake[0].x>WIDTH ||
            snake[0].y<0 ||
            snake[0].y>HEIGHT 
        ):
            active= false;
            context.font = "bold 50px serif"
            context.fillStyle = "white";
            context.fillText("GAME OVER!!!", WIDTH/7 , HEIGHT/2);
            context.font = "bold 30px serif";
            context.fillText("Press any key to restart", WIDTH / 6, HEIGHT / 2 + 50);

            window.addEventListener('keydown', newGame);
            // alert("added event listener");
            break;
    
        default:
            break;
    }
}

function newGame(event){
    window.removeEventListener('keydown', newGame);
    score = 0;
    scoreText.textContent = score;
    SPEED = 400;
    xVel = UNIT;
    yVel = 0;
    snake = [
        {x: UNIT*3, y: 0},
        {x: UNIT*2, y: 0},
        {x: UNIT, y: 0},
        {x: 0, y: 0}
    ];
    active = true;
    started = true;
    clearBoard();
    createFood();
    displayFood();
    drawSnake();
    nextStep();
}