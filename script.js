document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('gameContainer');
  const scoreElement = document.getElementById('score');
  const width = 400;
  const height = 400;
  const pixelSize = 40;
  const rows = height / pixelSize;
  const cols = width / pixelSize;
  const totalPixels = rows * cols;

  let snake = [
    { row: 20, col: 1 },
    { row: 20, col: 2 },
    { row: 20, col: 3 }
  ];

  let direction = 'right';
  let food = {};
  let score = 0;

  function createGrid() {
    for (let i = 0; i < totalPixels; i++) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.setAttribute('id', `pixel${i + 1}`);
      container.appendChild(pixel);
    }
  }

  function createSnake() {
    for (let i = 0; i < snake.length; i++) {
      const { row, col } = snake[i];
      const pixelIndex = (row - 1) * cols + col;
      const snakePixel = document.getElementById(`pixel${pixelIndex}`);
      snakePixel.classList.add('snakeBodyPixel');
    }
  }

  function generateFood() {
    const availablePixels = Array.from(Array(totalPixels).keys());
    const snakePixels = snake.map(pixel => (pixel.row - 1) * cols + pixel.col);
    const emptyPixels = availablePixels.filter(pixel => !snakePixels.includes(pixel));
    const randomIndex = Math.floor(Math.random() * emptyPixels.length);
    const foodPixelIndex = emptyPixels[randomIndex];
    const foodPixel = document.getElementById(`pixel${foodPixelIndex}`);
    foodPixel.classList.add('food');
    food.row = Math.floor(foodPixelIndex / cols) + 1;
    food.col = (foodPixelIndex % cols) + 1;
  }

  function moveSnake() {
    const head = Object.assign({}, snake[0]);

    switch (direction) {
      case 'up':
        head.row--;
        break;
      case 'down':
        head.row++;
        break;
      case 'left':
        head.col--;
        break;
      case 'right':
        head.col++;
        break;
    }

    if (head.row < 1 || head.row > rows || head.col < 1 || head.col > cols) {
      gameOver();
      return;
    }

    const newHeadPixelIndex = (head.row - 1) * cols + head.col;
    const newHeadPixel = document