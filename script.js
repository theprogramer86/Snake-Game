// Get the canvas element
var canvas = document.getElementById("canvas");

// Set up the canvas context
var ctx = canvas.getContext("2d");

// Set up the snake
var snake = [{ x: 200, y: 200 }];
var direction = "right";

// Set up the food
var food = { x: 0, y: 0 };

// Set up the game loop
var gameInterval;

// Handle user input
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37 && direction != "right") {
        direction = "left";
    } else if (event.keyCode == 38 && direction != "down") {
        direction = "up";
    } else if (event.keyCode == 39 && direction != "left") {
        direction = "right";
    } else if (event.keyCode == 40 && direction != "up") {
        direction = "down";
    }
});

// Set up the game loop function
function gameLoop() {
    // Move the snake
    var head = { x: snake[0].x, y: snake[0].y };
    if (direction == "left") {
        head.x -= 10;
    } else if (direction == "up") {
        head.y -= 10;
    } else if (direction == "right") {
        head.x += 10;
    } else if (direction == "down") {
        head.y += 10;
    }
    snake.unshift(head);

    // Check for collisions with the walls
    if (head.x < 0 || head.x > 390 || head.y < 0 || head.y > 390) {
        gameOver();
        return;
    }

    // Check for collisions with the food
    if (head.x == food.x && head.y == food.y) {
        // Move the food to a random location
        food.x = Math.floor(Math.random() * 39) * 10;
        food.y = Math.floor(Math.random() * 39) * 10;
    } else {
        snake.pop();
    }

    // Check for collisions with itself
    for (var i = 1; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            gameOver();
            return;
        }
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Function to start the game
function startGame() {
    // Initialize the snake
    snake = [{ x: 200, y: 200 }];
    direction = "right";

    // Initialize the food
    food.x = Math.floor(Math.random() * 39) * 10;
    food.y = Math.floor(Math.random() * 39) * 10;

    // Start the game loop
    gameInterval = setInterval(gameLoop, 100);
}

// Function to end the game
function gameOver() {
    // Stop the game loop
    clearInterval(gameInterval);

    alert("Game Over! Press OK to restart.");
    startGame();
}

// Initialize the game
startGame();