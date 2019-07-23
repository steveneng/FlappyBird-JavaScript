let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

gap = 350;
let constant = pipeNorth.height+gap;

let bX = 10;
let bY = -20;

let gravity = 2;
document.addEventListener("keydown", moveUp);

function moveUp(){
    bY -= 25;
}

let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

function draw(){

    ctx.drawImage(bg, 0 ,0);


    for(let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeNorth.height) - 
                pipeNorth.height
            });
        }

        if(bX + bird.width >=  pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y + constant)){
            location.reload();
        }

    }
 
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    requestAnimationFrame(draw);

}

draw();