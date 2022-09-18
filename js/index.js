// game constants & variables
const defaultInputDirection = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameOver.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
const snakeSpeed = 10; // time (in seconds) = 1 / snakeSpeed
const gameBoardDimensions = { row: 30, column: 30 };
let snakeBodyArray = [{ x: 13, y: 15 }];
const defaultFood = { x: 6, y: 6 };
const defaultScore = 0;
let inputDirection = defaultInputDirection;
let lastPaintTime = 0;
let food = defaultFood;
let score = defaultScore;
const foodElement = document.createElement("div");
foodElement.classList.add("food");
// 1:01:45
// game functions
function main(currentTime) {
  // time interval for executing this function is 0.5 seconds,
  //  if it is less than 0.5 function will return nothing,
  // else it will execute the remaining body of function
  window.requestAnimationFrame(main);
  if ((currentTime - lastPaintTime) / 1000 < 1 / snakeSpeed) {
    return;
  }
  //console.log("currentTime in mili seconds :>> ", currentTime);
  lastPaintTime = currentTime;
  gameEngine();
}

function isCollide(snakeBodyArray) {
  // checking for collision with walls
  if (
    snakeBodyArray[0].x >= gameBoardDimensions.column ||
    snakeBodyArray[0].x <= 0 ||
    snakeBodyArray[0].y >= gameBoardDimensions.row ||
    snakeBodyArray[0].y <= 0
  ) {
    console.warn("collision with walls");
    console.log("gameBoardDimensions :>> ", gameBoardDimensions);
    console.log("snakeBodyArray[0].x :>> ", snakeBodyArray[0].x);
    console.log("snakeBodyArray[0].y :>> ", snakeBodyArray[0].y);
    return true;
  }

  // checking for collision of snake head into snake body
  for (let i = 1; i < snakeBodyArray.length; i++) {
    if (
      snakeBodyArray[i].x === snakeBodyArray[0].x &&
      snakeBodyArray[i].y === snakeBodyArray[0].y
    ) {
      console.warn("Collision of snake head into snake body");
      return true;
    }
  }
  return false;
}

function gameEngine() {
  // part1 : updating the snake body array when it gets collided with the wall
  if (isCollide(snakeBodyArray)) {
    gameOverSound.play();
    musicSound.pause();
    inputDirection = defaultInputDirection;
    snakeBodyArray = [{ x: 13, y: 15 }];
    food = defaultFood;
    musicSound.play;
    alert(`Gameover, Your highest score is ${score}.`);
    score = 0;
    document.getElementById('score').innerText = score;
  }

  // part2 : updating the snake body array when it eats the food
  if (snakeBodyArray[0].x === food.x && snakeBodyArray[0].y === food.y) {
    foodSound.play();
    //snakeBodyArray.unshift(inputDirection);
    snakeBodyArray.unshift({
      x: snakeBodyArray[0].x + inputDirection.x,
      y: snakeBodyArray[0].y + inputDirection.y,
    });
    // setting random position of food
    let a = 3;
    let b = 21;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    score++;
    document.getElementById('score').innerText = score
  }

  // part3 : moving the snake
  for (let i = snakeBodyArray.length - 2; i >= 0; i--) {
    snakeBodyArray[i + 1] = { ...snakeBodyArray[i] };
  }
  snakeBodyArray[0].x += inputDirection.x;
  snakeBodyArray[0].y += inputDirection.y;

  // part3 : display the snake body array
  board.innerHTML = "";
  snakeBodyArray.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) 
      snakeElement.classList.add("snake-head");
    else if (index % 2 === 0)
      snakeElement.classList.add("snake-tail");
    else snakeElement.classList.add("snake-body");
    
    
    board.appendChild(snakeElement);
  });

  // part4: display the food
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  
  board.appendChild(foodElement);
}

// main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 }; // start the game
  moveSound.play();
  //console.log(e.key);
  switch (e.key) {
    case "ArrowUp":
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "ArrowDown":
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    case "ArrowLeft":
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "ArrowRight":
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    default:
  }
});
