let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let p = "images/bird.png";
let p2 = "images/bird2.png"
let choose = false;
let choose2 = false;

let bird = new Image();
let bird2 = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

let is1Dead = false;
let is2Dead = false;

let mortal = true;
let running = true;
let pipes = true;

gap = 350;
let constant = pipeNorth.height + gap;

let bX = 70;
let bY = 150;

let b2X = 10;
let b2Y = 150;

let pipeCount = 0;

let highScore = localStorage.getItem("highScore") || 0;

let gravity = 2;


// document.addEventListener("keydown", function (e) {
//     if (e.keyCode === 87) {
//         moveUp()
//     }
// })

// function moveUp() {
//     let loop = setInterval(function () {
//         bY -= 2;
//     }, 1)
//     setTimeout(function () {
//         clearInterval(loop)
//     }, 120)
//     gravity = 2
// }

// document.addEventListener("keydown", function (e) {
//     if (e.keyCode === 38) {
//         moveUp2()
//     }
//     })

// function moveUp2(){
//     let loop = setInterval(function () {
//         b2Y -= 2;
//     }, 1)
//     setTimeout(function () {
//         clearInterval(loop)
//     }, 120)
//     gravity = 2
//     }

let pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

function draw() {
    bird.src = p;
    bird2.src = p2;
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    if (pipes === false) {
      break;
    }
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    if(choose === false || choose2 === false){
        break;
    }
    else{
    pipe[i].x--;
    }

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }
    if (mortal === true) {
      if (
        (bX + bird.width >= pipe[i].x &&
          bX <= pipe[i].x + pipeNorth.width &&
          (bY <= pipe[i].y + pipeNorth.height ||
            bY + bird.height >= pipe[i].y + constant)) ||
        bY + 25 > cvs.height - fg.height
      ) {
        if (pipeCount > highScore) {
          highScore = parseInt(pipeCount);
          localStorage.setItem("highScore", highScore);
        }
        bY = 300000;
        is1Dead = true;
        // location.reload();
      }
      if (is1Dead === true && is2Dead === true) {
        location.reload();
      }
      player2(i);

      if (bX === pipe[i].x) {
        document.getElementById("counter").innerText = pipeCount += 1;
      }
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);

  ctx.drawImage(bird, bX, bY);
  ctx.drawImage(bird2, b2X, b2Y);

  if (gravity < 3) {
    gravity += 0.03;
  }
  bY += gravity;
  b2Y += gravity;

  if(choose === false || choose2 === false){
    gravity = 0
}

  if (bY + 23 > cvs.height - fg.height) {
    bY -= 3;
  }
  if (b2Y + 23 > cvs.height - fg.height) {
    b2Y -= 3;
  }

  if (running === true) {
    requestAnimationFrame(draw);
  }
}

function Pause() {
  let button = document.getElementById("pause");
  running = !running;
  if (running === true) {
    draw();
    button.innerText = "Pause";
    button.style.background = "#73bf2e";
  } else if (running === false) {
    button.innerText = "Play";
    button.style.background = "#FF0000";
  }
}

document.addEventListener("keydown", function(e) {
  // let xb = {
  //     38:moveUp2(),
  //     80:Pause()
  // }

  // xb[e.keyCode]

  if (e.keyCode === 87) {
    moveUp();
  } else if (e.keyCode === 38) {
    moveUp2();
  } else if (e.keyCode === 80) {
    Pause();
  } else if (e.keyCode === 84) {
    pipes = !pipes;
  } else if (e.keyCode === 49) {
    mortal = !mortal;
  }
});

function moveUp() {
  let loop = setInterval(function() {
    bY -= 2;
  }, 1);
  setTimeout(function() {
    clearInterval(loop);
  }, 120);
  gravity = 2;
}

function moveUp2() {
  let loop = setInterval(function() {
    b2Y -= 2;
  }, 1);
  setTimeout(function() {
    clearInterval(loop);
  }, 120);
  gravity = 2;
}

// document.addEventListener("keydown", function (e) {
//     if (e.keyCode === 84) {
//         pipes = !pipes
//     }
// })
// document.addEventListener("keydown", function (e) {
//     if (e.keyCode === 49){
//         mortal = !mortal
//     }
// })
document.getElementById("pause").addEventListener("click", function() {
  Pause();
});

document.getElementById("characters").addEventListener("click", function(e) {
  console.clear();
  console.log(e.target.alt);
  p = e.target.alt
  choose = true
  console.log(p)
});

document.getElementById("characters1").addEventListener("click", function(e) {
    console.clear();
    console.log(e.target.alt);
    p2 = e.target.alt
    choose2 = true
    console.log(p2)
  });
// console.log(choose);
// if (choose) {
//   draw();
// }
draw();