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

let mortal = true
let running = true
let pipes = true

gap = 350;
let constant = pipeNorth.height + gap;

let bX = 10;
let bY = -20;

let gravity = 2;
document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) {
        moveUp()
    }
})

function moveUp() {
    let loop = setInterval(function () {
        bY -= 2;
    }, 1)
    setTimeout(function () {
        clearInterval(loop)
    }, 120)
    gravity = 2
}

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

function draw() {

    ctx.drawImage(bg, 0, 0);


    for (let i = 0; i < pipe.length; i++) {
        if(pipes === false){
            break;
        }
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) -
                    pipeNorth.height
            });
        }
        if (mortal === true) {
            if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + 25 > cvs.height - fg.height) {
                location.reload();
            }
        }

    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);
    if (gravity < 3) {
        gravity += 0.02
    }
    bY += gravity;
    console.log(gravity)
    if(running === true){
    requestAnimationFrame(draw);
    }
}

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 80) {
        running = !running
        if(running === true){
            draw()
        }
    }
})
document.addEventListener("keydown", function (e) {
    if (e.keyCode === 84) {
        pipes = !pipes
    }
})
document.addEventListener("keydown", function (e) {
    if (e.keyCode === 49){ 
        mortal = !mortal
    }
})

draw();