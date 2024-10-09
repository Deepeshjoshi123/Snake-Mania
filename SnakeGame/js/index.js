let inputDir = {x:0 , y:0};
let lastTime = 0;
let speed = 10;
let score = 0;
let high = 0;
let snakeArr = [{x:13 , y:15}];
let food= {x:7 , y:6}

const foodSound = new Audio("../music/food.mp3");
const gameoverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");



//GAME FUNTIONS
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastTime)/1000 < 1/speed){
        return;
    }
    lastTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //If snake bumbs into itself
    for(let i=1 ; i< snakeArr.length ; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //If snake bumbs into wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){
        return true;
    }
}

function gameEngine(){
    //Part : 1 update the array snake and food
    if(isCollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir={x:0 , y:0};
        alert("Game Over, Press any key to play again ");
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score:"+score;
        snakeArr = [{x: 13, y: 15}];
    }
    //Check if the sanke has easten food if eaten then shift the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score:"+score;
        if(score > high){
            high = score;
        }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())};
    }
    highScore.innerHTML="High-Score:"+high;
    
    //Moving the snake 
    for(let i=snakeArr.length-2 ; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part : 2 display the snake and food 

    //For snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    
    //For food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}

//MAIN LOGIC
window.requestAnimationFrame(main);
inputDir={x:0 , y:0};
window.addEventListener("keydown", e =>{
    musicSound.play();
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0 ;
            inputDir.y = -1 ;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            inputDir.x = 1 ;
            inputDir.y = 0 ;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})