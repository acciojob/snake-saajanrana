document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const scoreElement = document.getElementById("score");

  const pixelSize = 10;
  const gameSize = 400;
  const rows = gameSize / pixelSize;
  const cols = gameSize / pixelSize;

  let snake = [{ row: 19, col: 0 }];
  let direction = "right";
  let food = null;
  let score = 0;

  function createPixel(id, className) {
    const pixel = document.createElement("div");
    pixel.className = className;
    pixel.id = id;
    return pixel;
  }

  function renderSnake() {
    snake.forEach((pixel, index) => {
      const pixelId = `pixel-${pixel.row}-${pixel.col}`;
      const snakePixel = createPixel(pixelId, "pixel snakeBodyPixel");
      gameContainer.appendChild(snakePixel);
    });
  }

  function renderFood() {
    if (food === null) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      const pixelId = `pixel-${row}-${col}`;
      food = createPixel(pixelId, "pixel food");
      gameContainer.appendChild(food);
    }
  }

  function moveSnake() {
    const head = Object.assign({}, snake[0]);
    switch (direction) {
      case "up":
        head.row--;
        break;
      case "down":
        head.row++;
        break;
      case "left":
        head.col--;
        break;
      case "right":
        head.col++;
        break;
    }
    snake.unshift(head);

    if (head.row === foodRow && head.col === foodCol) {
      score++;
      scoreElement.textContent = score;
      gameContainer.removeChild(food);
      food = null;
    } else {
      snake.pop();
    }

    if (head.row < 0 || head.row >= rows || head.col < 0 || head.col >= cols) {
      gameOver();
      return;
    }

    renderSnake();

    const tail = snake.slice(1);
    if (tail.some((pixel) => pixel.row === head.row && pixel.col === head.col)) {
      gameOver();
      return;
    }

    setTimeout(moveSnake, 100);
  }

  function gameOver() {
    alert("Game Over!");
    snake = [{ row: 19, col: 0 }];
    direction = "right";
    score = 0;
    scoreElement.textContent = score