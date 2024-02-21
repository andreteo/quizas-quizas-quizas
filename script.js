class AudioPlayer {
    constructor(audio = "./sound/Andrea-Bocelli_Quizas,Quizas,Quizas_ft.-Jennifer-Lopez.mp3", timeElapsed = 0.0, isPlaying = false, playbackSpeed = 1.0) {
        this.audio = new Audio(audio);
        this.timeElapsed = timeElapsed;
        this.isPlaying = isPlaying;
        this.playbackSpeed = playbackSpeed;
    }

    playAudio() {
        if (!this.isPlaying) {
            this.audio.play();
            this.isPlaying = true;
        };
    };

    pauseAudio() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            this.timeElapsed = this.audio.currentTime;
        };
    };

    resetAudio() {
        this.pauseAudio();
        this.timeElapsed = 0;
        console.log("Audio is reset to the start");
    };

    increasePlaybackSpeed() {
        this.playbackSpeed += 0.5;
        this.audio.playbackRate = this.playbackSpeed;
        this.audio.play();
        console.log(`Playback Speed Increased to ${this.playbackSpeed}`);
    }

    decreasePlaybackSpeed() {
        if (this.playbackSpeed <= 0) {
            console.log(`Minimum Playback Speed Reached: ${this.playbackSpeed}`);
        } else {
            this.playbackSpeed -= 0.5;
            this.audio.playbackRate = this.playbackSpeed;
            this.audio.play();
            console.log(`Playback Speed Decreased to ${this.playbackSpeed}`);
        }
    }

    saveMetadata() {
        return {
            playbackRate: this.playbackRate,
            timeElapsed: this.currentTime,
        }
    }
}

class Player {
    constructor(playerId = 0, playerName = "default-player", playerScores = []) {
        this.playerId = playerId;
        this.playerName = playerName;
        this.playerScores = playerScores;
    };
}

class Scoreboard {
    constructor(players = []) {
        this.players = players;
    }

    addPlayer(playerName) {
        const newPlayer = new Player(playerName);
        this.players.push(newPlayer);
    }
}

const toggleModal = function (element) {
    if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
        homeOverlay.classList.remove("hidden");
    } else {
        element.classList.add("hidden");
        homeOverlay.classList.add("hidden");
    }
}


/*
    String/Input Manipulation
*/
const transform = (str, fn) => {
    return fn(str);
}

const upperFirstLetter = (str) => {
    const words = str.split(" ");
    const capitalizedWords = words.map(word => {
        if (!word) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(" ");
};

const allToLower = (str) => {
    const words = str.split(" ");
    const loweredWords = words.map(word => {
        if (!word) return word;
        return word.toLowerCase();
    })
    return loweredWords.join(" ");
};

const onlyAlphanumeriAndSpecialChar = (asciiChar) => {
    return (0x21 <= asciiChar && asciiChar <= 0x7E);
}

const isValidName = (name) => {
    let res = true;

    if (!name) return false;

    const words = name.split(" ");

    for (const word of words) {
        letters = word.split("");
        const asciiLetters = letters.map(char => char.charCodeAt(0));
        if (!asciiLetters.every(onlyAlphanumeriAndSpecialChar)) {
            res = false;
        }
    }
    return res;
}


// Set Title
const TITLE = "Quiz-as, Quiz-as, Quiz-as!";
document.querySelector("#newgameheadingtext").innerHTML = TITLE;
document.querySelector("title").textContent = TITLE;

const homeScreen = document.getElementById("homescreen");
const homeModal = document.getElementById("homemodal");
const rulesModal = document.getElementById("ruleboard");
const rulesButtons = document.getElementById("rulesbtns");
const newGameModal = document.getElementById("playersignupmodal");
const homeOverlay = document.getElementById("homeoverlay");
const backgroundMusic = new AudioPlayer();

let curRulePage = 0;

// rulesModal.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, modi, culpa quasi doloremque, harum totam et possimus laudantium vel porro neque. Incidunt libero commodi rerum, consequuntur itaque sapiente cumque officia.";
const pages = [
    `<div class="ruleboard-grid-heading">Quiz-as, Quiz-as, Quiz-as Rule Board</div>
    <div class="ruleboard-grid-element">Welcome to our unique trivia game experience! Immerse yourself in a game where knowledge, speed, and music blend to create an unforgettable challenge. Read on to discover how to play, win, and enjoy the symphony of quiz mastery.</div>`,
    `<div class="ruleboard-grid-heading">The Essence of the Game:</div>
    <div class="ruleboard-grid-element">This is no ordinary trivia game. Your mission is to navigate through a series of questions, all while being serenaded by <a href="https://www.youtube.com/watch?v=xYz5CiEy5bY">Quiz-as, Quiz-as, Quiz-as</a>  by Andrea Bocelli.</div>`,
    `<div class="ruleboard-grid-heading">Timing is Everything:</div>
    <div class="ruleboard-grid-element">Forget the clock! In this game, time is measured by the duration of "Quiz-as, Quiz-as, Quiz-as." The song's duration is your countdown. Once the music starts, so does your challenge. Your goal? Answer all questions before the final note fades.</div>`,
    `<div class="ruleboard-grid-heading">Listen and Learn:</div>
    <div class="ruleboard-grid-element">With every question, the stakes get higher. A correct answer keeps the music at its original pace. However, Each mistake increases the playback speed of the song by 30%. The faster the music, the less time you have to think.</div>`,
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

    console.log(target);

    switch (target.id) {
        case "newgame": {
            toggleModal(newGameModal);
            break;
        };
        case "rules": {
            document.getElementById("ruleboardgrid").innerHTML = pages[curRulePage]
            toggleModal(rulesModal);
            break;
        };
    }
    // homeModal.innerHTML = '<a class="btn btn-success" id="start">Close</a>' + '<a class="btn btn-danger" id="cancel"> Close </a>';
    // toggleModal(homeModal);
})

rulesButtons.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.target;

    switch (target.id) {
        case "rulesnext": {
            console.log("next page clicked");
            curRulePage += 1;
            if (curRulePage > pages.length - 1) {
                curRulePage = 0;
            }
            break;
        }
        case "rulesprev": {
            console.log("prev page clicked");
            curRulePage -= 1;
            if (curRulePage < 0) {
                curRulePage = pages.length - 1;
            }
            break;
        }
    }
    document.getElementById("ruleboardgrid").innerHTML = pages[curRulePage];
});


/* 
    New Game Window
*/

homeModal.addEventListener("click", function (e) {
    const target = e.target;

    switch (target.id) {
        case "start": {
            console.log("Start Button Clicked");
            toggleModal(newGameModal);
            break;
        };
        case "cancel": {
            console.log("Cancel Button Clicked");
            toggleModal(newGameModal);
            break;
        }
    }
})

/*
    Player Sign-up
*/

const getInput = () => {
    return document.querySelector("#signup-form").username.value;;
};

const validNameErr = document.createElement("div");
validNameErr.setAttribute("id", "div-err");

document.getElementById("signup-form").addEventListener("submit", function (e) {
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

        if (!backgroundMusic.isPlaying) backgroundMusic.playAudio();
        toggleModal(newGameModal);
    }
});

const getQuestions = (topic) => {
    // console.log(data.topic.questions)
    return data[topic].questions;
}

const startGame = () => {
    // Load Questions
    const questionsObject = getQuestions("javascript");
}