let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0; // Store high score in browser storage

let h2 = document.querySelector("h2");
let highScoreDisplay = document.createElement("h3");
highScoreDisplay.innerText = `High Score: ${highScore}`;
document.body.appendChild(highScoreDisplay);

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        document.querySelector("body").style.backgroundColor = "white";
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIndx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);

    setTimeout(() => {
        gameFlash(randomBtn);
    }, 500);
}

function checkAns(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore); // Update high score
            highScoreDisplay.innerText = `High Score: ${highScore}`;
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").classList.add("game-over");
        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 150);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
