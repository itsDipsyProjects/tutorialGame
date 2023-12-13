
const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");


let boundaries = [];

class player{
    constructor({posistion}){
        this.posistion = posistion;
        this.width = 48
        this.height = 48;
    }

    
    draw(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.posistion.x, this.posistion.y , this.width, this.height);
    }
}


class Boundary {
    constructor({posistion}){
        this.posistion = posistion;
        this.width = 48;
        this.height = 48;
    }

    draw(color){
        ctx.fillStyle = `${color}`;
        ctx.fillRect(this.posistion.x, this.posistion.y , this.width, this.height);
    }
}

canvas.width = 1200;
canvas.height = 1000;
// Draw background

let backgroundImage = new Image();
backgroundImage.src = "./assets/realrealrealTiledMap.png";

// draws out collision blocks
function fix_collision(){    
    
    let mapArr_2D = [];
    
    for (let i = 0; i < mapArr.length; i += 70) {
        let sliced_part = mapArr.slice(i, i + 70);
        mapArr_2D.push(sliced_part);
    }



    const offset = {
        x: -1250,
        y: -870,
    }
    
    mapArr_2D.forEach((row, i) => {
        row.forEach((symbol, j) => { 
            if (symbol === 1025) {
                boundaries.push(
                    new Boundary({
                        posistion:{
                            x: j * 48 + offset.x,
                            y: i * 48 + offset.y,
                        },
                    })
                )
            }
        });
    });
    
}

let player_cordinates = {
    x: 580,
    y: 570,
}

let backgroundImage_cordinates = {
    posistion: {
        x: -1250,
        y: -880,
    }
}

let player1 = new player({posistion: {
    x: player_cordinates.x,
    y: player_cordinates.y,
}})

let keys_pressed = {
    w: false,
    s: false,
    a: false,
    d: false,
}

window.addEventListener("keydown", (event) => {
    switch(event.key){
        case "w":
            keys_pressed.w = true;
            lastkeyPress = "w";
        break;
        case "s":
            keys_pressed.s = true;
            lastkeyPress = "s";
        break;
        case "a":
            keys_pressed.a = true;
            lastkeyPress = "a";
        break;
        case "d":
            keys_pressed.d = true;
            lastkeyPress = "d";
        break;
    }
})


window.addEventListener("keyup", (event) => {
    switch(event.key){
        case "w":
            keys_pressed.w = false;
           
        break;
        case "s":
            keys_pressed.s = false;
            
        break;
        case "a":
            keys_pressed.a = false;
            
        break;
        case "d":
            keys_pressed.d = false;
            
        break;
    }
})

let collisionDection = false;

let lastkeyPress =  "";

let test = new Boundary({posistion: {x: 300, y: 200}});



function rectangularCollision({rectangle1, rectangle2})
{
    return(
        rectangle1.posistion.x + rectangle1.width >= rectangle2.posistion.x  &&
        rectangle1.posistion.x <= rectangle2.posistion.x + rectangle2.width &&
        rectangle1.posistion.y <= rectangle2.posistion.y + rectangle2.height &&
        rectangle1.posistion.y + rectangle1.height >= rectangle2.posistion.y
    )
}

fix_collision();
let movables = [backgroundImage_cordinates, ...boundaries, test];

console.log(boundaries);


function gameLoop(){
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, backgroundImage_cordinates.posistion.x, backgroundImage_cordinates.posistion.y);
    let moving = true;
    boundaries.forEach((a_boundary) => {
        a_boundary.draw("purple");
    })
    
    test.draw("red");
    

    if(rectangularCollision({rectangle1: player1, rectangle2:test})){
        console.log("collision with test")
        document.body.style.backgroundColor = "white";
    }

    // This is the collisionDectection
    
    
    
        
    if (keys_pressed.w) {
        for (let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i];
            
            if(rectangularCollision({
                rectangle1: player1,
                rectangle2: {...boundary, posistion: {
                    x:boundary.posistion.x,
                    y:boundary.posistion.y + 3
                }},
            })){
                console.log("colliding");
                moving = false;
                break;
            }
           
            
        }
        if(moving){
            movables.forEach((movable) => {
                movable.posistion.y += 3;
            });
        }
    }

    if (keys_pressed.s) {
        
        for (let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i];
            
            if(rectangularCollision({
                rectangle1: player1,
                rectangle2: {...boundary, posistion: {
                    x:boundary.posistion.x,
                    y:boundary.posistion.y - 3
                }},
            })){
                console.log("colliding");
                moving = false;
                break;
            }
           
            
        }
        if(moving){
            movables.forEach((movable) => {
                movable.posistion.y -= 3;
            });
        }
    }

    if (keys_pressed.a) {
        for (let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i];
            
            if(rectangularCollision({
                rectangle1: player1,
                rectangle2: {...boundary, posistion: {
                    x:boundary.posistion.x + 3,
                    y:boundary.posistion.y,
                }},
            })){
                console.log("colliding");
                moving = false;
                break;
            }
           
            
        }
        if(moving){
            movables.forEach((movable) => {
                movable.posistion.x += 3;
            });
        }
    }

    if (keys_pressed.d) {
        for (let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i];
            
            if(rectangularCollision({
                rectangle1: player1,
                rectangle2: {...boundary, posistion: {
                    x:boundary.posistion.x - 3,
                    y:boundary.posistion.y,
                }},
            })){
                console.log("colliding");
                moving = false;
                break;
            }
           
            
        }
        if(moving){
            movables.forEach((movable) => {
                movable.posistion.x -= 3;
            });
        }
    }
    
    player1.draw();
}

gameLoop();


