let score_box = document.getElementsByClassName("score")[0];
let textbox_box = document.getElementsByClassName("textbox")[0];

function showText (text, timeout_time) {
    textbox_box.innerText = text;
    setTimeout(
        () => {
            textbox_box.innerText = "";
        },
        timeout_time * 1000
    );
}

let grid = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
let score = 0;

// "going" ==> Game is going
// "lose"  ==> You lose
// "win"   ==> You win
let game_status = "going";

let bg_colors = {
    0: "#d3cac1",
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e"
}

let text_colors = {
    0: "white",
    2: "#776e65",
    4: "#776e65",
    8: "#f9f6f2",
    16: "#f9f6f2",
    32: "#f9f6f2",
    64: "#f9f6f2",
    128: "#f9f6f2",
    256: "#f9f6f2",
    512: "#f9f6f2",
    1024: "#f9f6f2",
    2048: "#f9f6f2"
}

let render = () => {
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
        let element_found = document.getElementsByClassName("cell")[i * 4 + j];

        element_found.style.backgroundColor = bg_colors[grid[i][j]];
        element_found.style.color = text_colors[grid[i][j]];

        if(grid[i][j] === 2048) game_status = "win";

        if (grid[i][j] !== 0) element_found.innerHTML = grid[i][j];
        else element_found.innerHTML = null;
    }

    score_box.innerText = "Score: " + score;

    if(game_status === 'win') textbox_box.innerText = "YOU WIN ^_^";
    else if(game_status === 'lose') textbox_box.innerText = "YOU LOSE -_-";
}

let generateInitialValues = () => {
    let x = Math.floor(Math.random() * 16);
    let y = Math.floor(Math.random() * 16);

    while (x == y) y = Math.floor(Math.random() * 16);

    grid[Math.floor(x/4)][x%4] = 2;
    grid[Math.floor(y/4)][y%4] = 2;

    console.log(grid);

    render();
};

generateInitialValues();

let clickUp = () => {
    for (let c = 0; c < 4; c++) {
        let val = 0;
        let curr = 0;

        for (r = 0; r < 4; r++) {
            if (grid[r][c] === 0) continue;
            else {
                if (val === 0) {
                    val = grid[r][c];
                    grid[r][c] = 0;
                }
                else if (val === grid[r][c]) {
                    score = score + val;

                    grid[curr][c] = val + grid[r][c];
                    val = 0;
                    grid[r][c] = 0;
                    curr++;
                }
                else {
                    grid[curr][c] = val;
                    val = grid[r][c];
                    grid[r][c] = 0;
                    curr++;
                }
            }

            if(grid[r][c] === 2048) game_status = "win";
        }
        if (val != 0) grid[curr][c] = val;
    }
}

let clickLeft = () => {
    for (let r = 0; r < 4; r++) {
        let val = 0;
        let curr = 0;

        for (c = 0; c < 4; c++) {
            if (grid[r][c] === 0) continue;
            else {
                if (val === 0) {
                    val = grid[r][c];
                    grid[r][c] = 0;
                } else if (val === grid[r][c]) {
                    score = score + val;
                    
                    grid[r][curr] = val + grid[r][c];
                    val = 0;
                    grid[r][c] = 0;
                    curr++;
                } else {
                    grid[r][curr] = val;
                    val = grid[r][c];
                    grid[r][c] = 0;
                    curr++;
                }
            }

            if(grid[r][c] === 2048) game_status = "win";
        }

        if (val != 0) grid[r][curr] = val;
    }
}

let clickDown = () => {
    for (let c = 0; c < 4; c++) {
        let val = 0;
        let curr = 3;

        for (r = 3; r >= 0; r--) {
            if (grid[r][c] === 0) continue;
            else {
                if (val === 0) {
                    val = grid[r][c];
                    grid[r][c] = 0;
                }
                else if (val === grid[r][c]) {
                    score = score + val;
                    
                    grid[curr][c] = val + grid[r][c];
                    val = 0;
                    grid[r][c] = 0;
                    curr--;
                }
                else {
                    grid[curr][c] = val;
                    val = grid[r][c];
                    grid[r][c] = 0;
                    curr--;
                }
            }

            if(grid[r][c] === 2048) game_status = "win";
        }

        if (val != 0) grid[curr][c] = val;
    }
}

let clickRight = () => {
    for (let r = 0; r < 4; r++) {
        let val = 0;
        let curr = 3;

        for (c = 3; c >= 0; c--) {
            if (grid[r][c] === 0) continue;
            else {
                if (val === 0) {
                    val = grid[r][c];
                    grid[r][c] = 0;
                }
                else if (val === grid[r][c]) {
                    score = score + val;
                    
                    grid[r][curr] = val + grid[r][c];
                    val = 0;
                    grid[r][c] = 0;
                    curr--;
                }
                else {
                    grid[r][curr] = val;
                    val = grid[r][c];
                    grid[r][c] = 0;
                    curr--;
                }
            }

            if(grid[r][c] === 2048) game_status = "win";
        }
        
        if (val != 0) grid[r][curr] = val;
    }
}

let generateRandomValue = () => {
    let empty_spaces = [];
    for(let i = 0; i < 4; i++) for(let j = 0; j < 4; j++) 
        if(grid[i][j] === 0) empty_spaces.push([i,j]);
    
    if(empty_spaces.length === 0) return false;

    let new_val = Math.floor(Math.random() * empty_spaces.length);
    grid[empty_spaces[new_val][0]][empty_spaces[new_val][1]] = 2;

    return true;
}

document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") clickUp();
    else if (e.key === "ArrowDown") clickDown();
    else if (e.key === "ArrowLeft") clickLeft();
    else if (e.key === "ArrowRight") clickRight();

    let generated = generateRandomValue();
    if (!generated) game_status = "lose";

    render();
})

function reset() {
    game_status = "going"
    score = 0;
    grid = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
    generateInitialValues();

    // Show the "Grid Reset" at top and disappear after 1.5s
    showText("Grid Reset...", 1.5);
}