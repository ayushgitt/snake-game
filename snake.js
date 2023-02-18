var lastpainttime=0;
let SNAKE_SPEED=3;
let inputdirection={x:0,y:0}
let lastinputdirection=inputdirection;
const expand_snake=1;
var score=0;
const snakebody=[
    {x: 10,y:10},
   // {x: 11,y:10},
    //{x: 12,y:10},
    //{x: 13,y:10}
    
];

let food=getfoodrandomposition();
function paint(time){
    var timeseconds=(time-lastpainttime)/1000;
    requestAnimationFrame(paint);
    
    if(timeseconds<1/SNAKE_SPEED)
       return;
    else
    lastpainttime= time;


    update();
    draw();

}
window.requestAnimationFrame(paint);

const game_board= document.querySelector(".game_board");

const scorebox=document.getElementById("score");

function draw(){
    drawsnake();
    drawfood();
    snakeEatFood();
}

function update(){
    game_board.innerHTML= "";
    snakemove();

}

function drawsnake(){
    snakebody.forEach((segment,index)=>{
        var snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart=segment.x;
        snakeElement.style.gridRowStart=segment.y;

       // snakeElement.innerHTML=index;          //to write numbers in box

        snakeElement.style.transform="rotate(0deg)"; //for the rotation of head.

        if(index==0){
            snakeElement.classList.add("head");

            if(inputdirection.x==1){
                snakeElement.style.transform="rotate(-90deg)"; 

            }
            else if(inputdirection.x==-1){
                snakeElement.style.transform="rotate(90deg)";

            }
            else if(inputdirection.y==1){
                snakeElement.style.transform="rotate(180deg)";

            }
            else if(inputdirection.y==-1){
                snakeElement.style.transform="rotate(-180deg)";

            }
        }else{
            snakeElement.classList.add("snake");
        }


        snakeElement.classList.add("snake");

        game_board.appendChild(snakeElement);
    });

}

function drawfood(){
    var foodElement = document.createElement("div");
        foodElement.style.gridColumnStart=food.x;
        foodElement.style.gridRowStart=food.y;
        foodElement.classList.add("food");
        game_board.appendChild(foodElement);
}


function snakemove(){
    //inputdirection= getinputdirection();
    for(i=snakebody.length-2;i>=0;i--){
        snakebody[i+1]={...snakebody[i]}
    }
    snakebody[0].x+= inputdirection.x;
    snakebody[0].y+= inputdirection.y;
    getinputdirection()
    
    checkGameOver();

}

function getinputdirection(){
    window.addEventListener("keydown",e=>{
        switch(e.key){
            case 'ArrowUp':
                if(lastinputdirection.y==1)break;  //to stop the snake to move sudden back
                inputdirection={x:0,y:-1}
            break;
            case 'ArrowDown':
                if(lastinputdirection.y==-1)break; 
                 inputdirection={x:0,y:1}
            break;
            case 'ArrowLeft':
                if(lastinputdirection.x==1)break;
                inputdirection={x:-1,y:0}
            break;
            case 'ArrowRight':
                if(lastinputdirection.x==-1)break;
                inputdirection={x:1,y:0}
            break;
            default:inputdirection={x:0,y:0}
        }

    })
    lastinputdirection=inputdirection;
    return inputdirection;
}

function snakeEatFood(){
    if(iseat() ){
        score+=1;
        scorebox.innerHTML=score;
        food=getfoodrandomposition();
        expandsnake();
        SNAKE_SPEED++;
    }
}

function iseat(){
    return snakebody[0].x===food.x && snakebody[0].y === food.y;
}

function getfoodrandomposition(){

    let a,b,mycondition = true;         //by this function apple will not randomly create on snake body.
    while(mycondition){
        a=Math.ceil(Math.random() * 16);
        b=Math.ceil(Math.random() * 16);

        mycondition= snakebody.some(segment=>{
            return segment.x=== a && segment.y===b;
        })
        
    }
    return {x: a,
            y: b};

}

function expandsnake(){
    for(i=0;i<expand_snake;i++){
        snakebody.push(snakebody[snakebody.length-1]);
    }
}

function checkGameOver(){
    if(snakeOverGrid()|| snakeTouchSelf()){
        location.reload();
        alert("GAME OVER ")
    }
}

function snakeOverGrid(){
    return snakebody[0].x<0|| snakebody[0].x>16|| snakebody[0].y<0|| snakebody[0].y>16;
}

function snakeTouchSelf(){
    for(i=1;i<snakebody.length;i++){
        if(snakebody[0].x===snakebody[i].x && snakebody[0].y===snakebody[i].y){
            return true;
        }
    }
}