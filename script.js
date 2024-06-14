let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

boxes.forEach(e => {
    e.innerHTML = ""
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    })
})

function play() {
     let audio = new Audio("audio/switc.wav");
     audio.play();
}

function play1() {
     let audio = new Audio("audio/win.mp3");
     audio.play();
}

function changeTurn() {
    let bgElement = document.querySelector(".bg");
    if (turn === "X") {
        turn = "O";
        bgElement.classList.remove("x-turn");
        bgElement.classList.add("o-turn");
        bgElement.innerHTML = 'O';
    } else {
        turn = "X";
        bgElement.classList.remove("o-turn");
        bgElement.classList.add("x-turn");
        bgElement.innerHTML = 'X';
    }
    play();
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins🏆";
            document.querySelector("#play-again").style.display = "inline";

            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
            play1();  // Play win sound only when a win is detected
            return;  // Exit function after win is detected
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        })

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    let bgElement = document.querySelector(".bg");
    bgElement.classList.remove("o-turn");
    bgElement.classList.add("x-turn");
    bgElement.innerHTML = 'X';
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    })
})
