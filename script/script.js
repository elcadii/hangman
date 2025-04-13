const worldDisplay = document.querySelector(".word-display"); 
const buttons = document.querySelectorAll('.clavier-B');
const letter = document.querySelectorAll(".letter");
let dispalScoor = document.getElementById("scoor");
let displayIncorrectScoor = document.getElementById("incorrectScoor");
const gameOver = document.getElementsByClassName("game_over");
const faceDisply = document.getElementsByClassName("faceDisply");
const displayBody = document.getElementsByClassName("bodyy");
const displayHand1 = document.getElementsByClassName("hand1");
const displayHand2 = document.getElementsByClassName("hand2");
const displayfoot1 = document.getElementsByClassName("foot1");
const displayfoot2 = document.getElementsByClassName("foot2");
const playAgain = document.getElementById("playAgain");
const iscorrectWord = document.getElementById("correctWord");
const clickedbtn = document.getElementsByClassName("clicked");
const highScoreDisplay = document.getElementById("highScore");


let scoor = 0;
let incorrectScoor = 0;
let correctWord;


let highScore = localStorage.getItem('highScore');
if (highScore === null) {
    highScore = 0; 
}
highScoreDisplay.innerHTML = highScore;


const newHighScore = () => {
    if (scoor > highScore) {
        highScore = scoor;
        highScoreDisplay.innerHTML = highScore;
        localStorage.setItem('highScore', highScore);
    }
};


const getword = function () {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    correctWord = word;
    console.log(word);
    console.log(hint);
    document.querySelector(".hint").innerHTML = hint;
    worldDisplay.innerHTML = word.split("").map(() => `<span class="letter"></span>`).join("");
};



const checkIfWordComplete = function () {
    const displayedWord = Array.from(worldDisplay.children).map(child => child.innerHTML).join('');
    if (displayedWord.toLowerCase() === correctWord.toLowerCase()) {
        scoor++;
        dispalScoor.innerHTML = scoor;
        newHighScore();
        getword();
        buttons.forEach(button => {
            clickedbtn[0].classList.remove("clicked");
        });
    }
};


buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
        button.clicked = true;
        let content = button.innerHTML.toLowerCase();
        console.log(content);
        if (correctWord.toLowerCase().includes(content)) {
            console.log("hello rah kayna");
            for (let i = 0; i < correctWord.length; i++) {
                if (correctWord[i].toLowerCase() === content) {
                    worldDisplay.children[i].innerHTML = content.toUpperCase();
                }
            }

            checkIfWordComplete();

        } else {
            incorrectScoor++;
            displayIncorrectScoor.innerHTML = incorrectScoor;

            if (incorrectScoor === 1) {
                faceDisply[0].style.display = "block";
            }

            if (incorrectScoor === 2) {
                displayBody[0].style.display = "block";
            }

            if (incorrectScoor === 3) {
                displayHand1[0].style.display = "block";
            }

            if (incorrectScoor === 4) {
                displayHand2[0].style.display = "block";
            }

            if (incorrectScoor === 5) {
                displayfoot1[0].style.display = "block";
            }

            if (incorrectScoor === 6) {
                displayfoot2[0].style.display = "block";
                gameOver[0].style.display = "block";
                iscorrectWord.innerHTML = correctWord;

                buttons.forEach(button => {
                    button.classList.add('disabled');
                    button.disabled = true;
                });

                playAgain.addEventListener("click", function () {
                    buttons.forEach(button => {
                        button.classList.remove('disabled');
                        button.classList.remove('clicked');
                        button.disabled = false;
                    });
                    window.location.reload();
                });
            }
            console.log("not hello makayncah");
        }
    });
});

getword();
