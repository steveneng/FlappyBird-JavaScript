function player2(n){
    if (mortal === true) {
        if (b2X + bird2.width >= pipe[n].x && b2X <= pipe[n].x + pipeNorth.width && (b2Y <= pipe[n].y + pipeNorth.height || b2Y + bird2.height >= pipe[n].y + constant) || b2Y + 25 > cvs.height - fg.height) {
                b2Y = 300000
                is2Dead = true
        }
        
    }
}