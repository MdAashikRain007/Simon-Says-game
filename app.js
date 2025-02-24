let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0; // Retrieve high score from localStorage
let colors = ['yellow', 'red', 'blue', 'white'];
let h2 = document.querySelector("h2");
let highScoreDisplay = document.createElement("h3"); // Create an element to display the high score
document.body.insertBefore(highScoreDisplay, h2.nextSibling); // Insert it below h2
updateHighScoreDisplay(); // Initialize high score display

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {  
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * colors.length); 
    let randomColor = colors[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`); 
    gameSeq.push(randomColor);
    gameFlash(randomBtn); 
}

function checked(idn) {
    if (userSeq[idn] === gameSeq[idn]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        updateHighScore(); // Update high score if necessary
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart the game`;
        document.querySelector("body").style.background = "red";
        setTimeout(() => {
            document.querySelector("body").style.background = "white";
        }, 150);
        reset();
    }
}

function btnPressed() {
    let btn = this;
    gameFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checked(userSeq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (let btn of allbtn) {
    btn.addEventListener("click", btnPressed);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function updateHighScore() {
    if (level > highScore) {
        highScore = level; // Update high score
        localStorage.setItem("highScore", highScore); // Store in localStorage
        updateHighScoreDisplay(); // Update screen display
    }
}

function updateHighScoreDisplay() {
    highScoreDisplay.innerHTML = `High Score: <b>${highScore}</b>`;
}
