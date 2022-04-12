function init(){
    var canvas = document.getElementById("myCanvas");
    h = canvas.height = 1000 ;
    w = canvas.width = 1000 ;
    pen = canvas.getContext('2d');
    cs = 60;
    game_over = false;

    food_img = new Image();
    food_img.src = "download.png";
    food = getRandomFood();


    snake = {

        init_len:5,
        speed: 1,
        color:"green",
        cells:[],
        direction:"right",


        //Functions
        createSnake:function(){
            for(var i = this.init_len; i >= 1; i--){
                this.cells.push({x:i,y:0});
            }
            
        },

        drawSnake:function(){
            for(var i = 0; i < this.init_len; i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs,cs-2,cs-2);
                
            }
            

        },
        updateSnake:function(){
            //console.log("Upadating snake");
            //EatingFood
            var headx = this.cells[0].x;
            var heady = this.cells[0].y;

            if(headx == food.x && heady == food.y){
                console.log("Food eaten");
                food = getRandomFood();
                this.init_len++;
            }
            else{
                this.cells.pop();
            }
    
            var newheadx, newheady;

            newheadx = headx + this.speed;
            newheady = heady + this.speed;
            //for right direction
            if(this.direction == 'right'){
                newheadx = headx + this.speed;
                newheady = heady;
            }
            else if(this.direction == 'left'){
                newheadx = headx - this.speed;
                newheady = heady;
            }
            else if(this.direction == 'up'){
                newheadx = headx;
                newheady = heady - this.speed;
            }
            else{
                newheadx = headx;
                newheady = heady + this.speed;
               
            }

            this.cells.unshift({x:newheadx,y:newheady});

            var last_x = Math.round(w/cs); 
            var last_y = Math.round(h/cs);

            if(this.cells[0].x<0 || this.cells[0].x > last_x || this.cells[0].y <0 || this.cells[0].y > last_y){
                game_over = true;
            }

        }

    };
    snake.createSnake();


    //function for key pressed
    function keypressed(e){
        
        console.log("keypressed is ", e.key)

        if(e.key == "ArrowRight"){
            snake.direction = "right"; 
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left"; 
        }
        else if(e.key == "ArrowUp"){
            snake.direction = "up"; 
        }
        else if(e.key == "ArrowDown"){
            snake.direction = "down"; 
        }
        console.log(snake.direction);
    }

    
    //adding event listeners
    document.addEventListener('keydown',keypressed)





}


function getRandomFood(){
    var foodx = Math.round(Math.random()*(w-cs)/cs);
    var foody = Math.round(Math.random()*(h-cs)/cs);

    var food = {
        x:foodx,
        y:foody,
        color: "red"
    }

    return food;
}




function draw(){
    //erasing snake
    
    pen.clearRect(0,0,w,h);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs)

}

function update(){
    snake.updateSnake();
    if(game_over == true){
        clearInterval(f);
        alert("Game Over");
    }
    
    
}

function gameloop(){
    draw();
    update();
}

init();

var f = setInterval(gameloop,100);
