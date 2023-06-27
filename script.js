const snake = document.getElementById("pixel2");
const gameContainer = document.getElementById("gameContainer")
const scoreElement = document.getElementById("score");

let row = 1, column = 1 ;

let foodItemsList = [
    // {
    //     left: 10,
    //     top: 200,
    //     id: foodItems Id
    // }
]

// rows = 40, columns = 40
function eatFood(){
    // if the snake's offset is equal to any one of the foodItem's offsets then update the score and delete that food item
    let snakeTop = (row-1)*10;
    let snakeLeft = (column - 1)*10 ;
    let foodId; 
    for(let i = 0 ; i < foodItemsList.length; i++){
        if(foodItemsList[i].left == snakeLeft && foodItemsList[i].top == snakeTop){
            scoreElement.innerText = parseInt(scoreElement.innerText) + 10 ;
            foodId = foodItemsList[i].id;
        }
    }

    if(!foodId) return ;

    foodItemsList = foodItemsList.filter((food) => {
        return food.id != foodId;
    })

    const capturedFoodItem = document.getElementById(foodId);
    gameContainer.removeChild(capturedFoodItem);

}

function moveSnakeToRight() {
    eatFood();
    let currentLeftOffset = (column - 1) * 10 ;
    snake.style.left = (currentLeftOffset + 10) + "px";
    column++;
    if(column == 41) {
        column = 1 ;
        snake.style.left = 0 + "px" ;
    }
}

function moveSnakeToLeft() {
    eatFood();
    let currentLeftOffset = (column - 1) * 10 ;
    snake.style.left = (currentLeftOffset - 10) + "px" ;
    column -- ;

    if(column == 0){
        column = 40 ;
        snake.style.left = "390px" ;
    }
}

function moveSnakeToTop() {
    eatFood();
    let currentTopOffset = (row-1)*10;
    snake.style.top = (currentTopOffset - 10) + "px"; 
    row--;

    if(row == 0){
        row = 40 ;
        snake.style.top = "390px" ;
    }
}

function moveSnakeToBottom(){
    eatFood();
    let currentTopOffset = (row-1)*10 ;
    snake.style.top = (currentTopOffset + 10) + "px" ;
    row++;
    if(row == 41){
        row = 1 ;
        snake.style.top = "0px" ;
    }
}


// 20px
// 20 + "px" => 20px
// 20px
let intervalId =  setInterval(moveSnakeToRight, 100)


document.body.addEventListener("keyup", (e) => {
    if(["ArrowRight", "ArrowDown", "ArrowUp", "ArrowLeft"].includes(e.key)){
        clearInterval(intervalId);
    }
    if(e.key === "ArrowRight"){
        intervalId = setInterval(moveSnakeToRight, 100)
    }
    else if(e.key === "ArrowDown"){
        intervalId = setInterval(moveSnakeToBottom, 100);
    }
    else if(e.key === "ArrowUp"){
        intervalId = setInterval(moveSnakeToTop, 100);
    }
    else if(e.key === "ArrowLeft"){
        intervalId = setInterval(moveSnakeToLeft, 100);
    }
})



function generateRandomOffset(){
    // returns a number in [0, 10, 20, 30, 40 ...., 390]
    let number = parseInt(Math.random()*100) ;
    if(number > 40){
        return parseInt(number/ 10)*10;
    }
    return number*10;
}

for(let i = 1 ;i <= 30; i++) {
    const foodItem = document.createElement("div");
    foodItem.className = "food" 
    let id = "pixel"+(3 + i); // pixel4, pixel5, pixel6 ..
    foodItem.id = id ;
    let left = generateRandomOffset();
    let top = generateRandomOffset();
    let foodItemObject = {
        left: left ,
        top: top,
        id: id
    }
    foodItemsList.push(foodItemObject);
    foodItem.style.left = left + "px";
    foodItem.style.top = top + "px";
    gameContainer.append(foodItem);