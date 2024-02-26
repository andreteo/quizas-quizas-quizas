const NUMQ = 10;

// Set Title
// const SPEEDUP = 0.2;
const SPEEDUP = 1.0;
const TITLE = "Quiz-as, Quiz-as, Quiz-as!";

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#newgameheadingtext").innerHTML = TITLE;
    document.querySelector("title").textContent = TITLE;
})

let curRulePage = 0;

/*
    HTML Elements
*/
const homeScreen = document.getElementById("homescreen");
const rulesModal = document.getElementById("ruleboard");
const rulesButtons = document.getElementById("rulesbtns");
const newGameModal = document.getElementById("playersignupmodal");
const homeOverlay = document.getElementById("homeoverlay");
const soundModal = document.getElementById("soundboard");
const quizModal = document.getElementById("quizcontainer");
const congratsModal = document.getElementById("congrats-container");
const backgroundMusic = new AudioPlayer();
document.getElementById("test-sound-cur-speed").innerText = `Current Playbackspeed: ${backgroundMusic.playbackSpeed}`;

/* 
    Audio ends, action goes here
*/

const endGameVideo = document.getElementById("endVideo");
const endGameBg = document.getElementById("endBg");

backgroundMusic.audio.addEventListener("ended", function () {
    toggleModal(endGameVideo);
    endGameVideo.play();

    [newGameModal, homeOverlay, rulesModal, homeScreen, soundModal].map((element) => element.classList.add("hidden"));

    endGameVideo.addEventListener("ended", function () {
        toggleModal(endGameBg);
    })
    QM.stopTimer();
})


// Instantiate relevant classes
const QM = new QuestionMaster(["javascript"], NUMQ, false);
const gameScores = new Scoreboard();

const pages = [
    `<div class="ruleboard-grid-heading">Quiz-as, Quiz-as, Quiz-as Rule Board</div>
    <div class="ruleboard-grid-element">Welcome to our unique trivia game experience! Immerse yourself in a game where knowledge, speed, and music blend to create an unforgettable challenge. Read on to discover how to play, win, and enjoy the symphony of quiz mastery.</div>`,
    `<div class="ruleboard-grid-heading">The Essence of the Game:</div>
    <div class="ruleboard-grid-element">This is no ordinary trivia game. Your mission is to navigate through a series of questions, all while being serenaded by <a href="https://www.youtube.com/watch?v=xYz5CiEy5bY">Quizás, Quizás, Quizás</a>  by Andrea Bocelli.</div>`,
    `<div class="ruleboard-grid-heading">Timing is Everything:</div>
    <div class="ruleboard-grid-element">Forget the clock! In this game, time is measured by the duration of "Quizás, Quizás, Quizás" The song's duration is your countdown. Once the music starts, so does your challenge. Your goal? Answer all questions before the final note fades.</div>`,
    `<div class="ruleboard-grid-heading">Listen and Learn:</div>
    <div class="ruleboard-grid-element">With every question, the stakes get higher. A correct answer keeps the music at its original pace. However, Each mistake increases the playback speed of the song by ${SPEEDUP * 100}%. The faster the music, the less time you have to think.</div>`,
    `<div class="ruleboard-grid-heading">GLHF:</div>
    <div class="ruleboard-grid-element">The ultimate goal is to answer all questions correctly before the song ends.</div>`,
]


/*
    Home Screen
*/

homeScreen.addEventListener("click", function (e) {
    e.preventDefault();

    const target = e.target;

    if (target.id === "homescreen" || target.id === "newgameheadingtext") {
        return;
    }

    switch (target.id) {
        case "newgame": {
            if (!QM.gameStarted) {
                const allTopics = retrieveTopicsFromQBank();

                for (let i = 0; i < allTopics.length; i++) {
                    const randHex = generateRandomHexColor();
                    const textColour = getTextContrastColour(randHex);
                    const categoryEl = document.createElement("div");
                    const categoryId = `category-${i}`;

                    categoryEl.innerHTML = `<button class="btn mr-2" id="${categoryId}" style="background-color: ${randHex}; color:${textColour}; border: 2px solid var(--default-text);">
                    ${allTopics[i]}
                </button>`
                    document.getElementById("categories-btns").appendChild(categoryEl);

                    document.getElementById(categoryId).addEventListener("click", function (e) {
                        e.preventDefault();
                        console.log(e.target);
                    });
                }
            }
            toggleModal(newGameModal);
            break;
        };
        case "testsound": {
            toggleModal(soundModal);
            backgroundMusic.playAudio();
            break;
        };
        case "rules": {
            document.getElementById("ruleboardgrid").innerHTML = pages[curRulePage]
            toggleModal(rulesModal);
            break;
        };
    }
})

rulesButtons.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.target;

    switch (target.id) {
        case "rulesnext": {
            curRulePage += 1;
            if (curRulePage > pages.length - 1) {
                curRulePage = 0;
            }
            break;
        };
        case "rulesprev": {
            curRulePage -= 1;
            if (curRulePage < 0) {
                curRulePage = pages.length - 1;
            }
            break;
        };
        case "rulesclose": {
            toggleModal(rulesModal);
        };
    }
    document.getElementById("ruleboardgrid").innerHTML = pages[curRulePage];
});

/*
    Player Sign-up
*/
const validNameErr = document.createElement("div");
validNameErr.setAttribute("id", "div-err");

document.getElementById("startbtn").addEventListener("click", function (e) {
    e.preventDefault();
    const input = getInput();
    const signUpEl = document.getElementById("signup-form");

    // Manipulate input
    const transformString = transform(input, allToLower);

    // Validate input
    if (!isValidName(transformString)) {
        console.log(`Invalid name entered ${input}. Only alphanumeric/special chars`);
        const errMsg = `Invalid Name ${input}`;
        validNameErr.innerHTML = `<div class="err" id="inputerr">${errMsg}</div>`;
        signUpEl.appendChild(validNameErr);
    } else {
        if (signUpEl.contains(validNameErr)) {
            signUpEl.removeChild(validNameErr);
        }

        if (!QM.gameStarted) {
            if (!backgroundMusic.isPlaying) { backgroundMusic.playAudio(); }
            gameScores.addPlayer(input)

            QM.startGame();
            toggleModal(quizModal);
        }
        toggleModal(newGameModal);
    }
});


/*
    Sound Board
*/
soundModal.addEventListener("click", function (e) {
    const target = e.target;

    switch (target.id) {
        case "soundslow": {
            backgroundMusic.decreasePlaybackSpeed();
            break;
        };
        case "soundpause": {
            if (backgroundMusic.isPlaying) {
                document.getElementById("soundpause").textContent = "Resume";
                backgroundMusic.pauseAudio();
            } else {
                document.getElementById("soundpause").textContent = "Pause";
                backgroundMusic.playAudio();
            }
            break;
        };
        case "soundfast": {
            backgroundMusic.increasePlaybackSpeed();
            break
        };
        case "soundcancel": {
            backgroundMusic.resetAudio();
            toggleModal(soundModal);
            break;
        }
    }

    document.getElementById("test-sound-cur-speed").innerText = `Current Playbackspeed: ${backgroundMusic.playbackSpeed}`;
})




