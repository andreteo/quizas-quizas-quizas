const NUMQ = 10;

class AudioPlayer {
    constructor(audio = "./sound/Andrea-Bocelli_Quizas,Quizas,Quizas_ft.-Jennifer-Lopez.mp3", timeElapsed = 0.0, isPlaying = false, playbackSpeed = 1.0, speedup = SPEEDUP) {
        this.audio = new Audio(audio);
        this.timeElapsed = timeElapsed;
        this.isPlaying = isPlaying;
        this.playbackSpeed = playbackSpeed;
        this.speedup = speedup;
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
        const newSpeed = this.playbackSpeed + this.speedup;
        this.playbackSpeed = Math.round(newSpeed * 100) / 100;
        this.audio.playbackRate = this.playbackSpeed;
        this.audio.play();
        console.log(`Playback Speed Increased to ${this.playbackSpeed}`);
    }

    decreasePlaybackSpeed() {
        if (this.playbackSpeed <= 0) {
            console.log(`Minimum Playback Speed Reached: ${this.playbackSpeed}`);
        } else {
            const newSpeed = this.playbackSpeed - this.speedup;
            this.playbackSpeed = Math.round(newSpeed * 100) / 100;
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
    constructor(playerid = 0, playerName = "default-player", playerScores = [], numCorrect = 0, numWrong = 0, totalScores = 0) {
        this.playerId = playerid;
        this.playerName = playerName;
        this.playerScores = playerScores;
        this.numCorrect = numCorrect;
        this.numWrong = numWrong;
        this.totalScores = this.totalScores;
    };
}

class Scoreboard {
    constructor(allplayers = {}, currentPlayer = null) {
        this.allplayers = allplayers;
        this.currentPlayer = currentPlayer;
    }

    addPlayer(playerName) {
        this.currentPlayer = new Player(this.generatePlayerId(), playerName);
        console.log(this.currentPlayer);
        this.allplayers[this.currentPlayer.playerId] = this.currentPlayer;
        return this.currentPlayer;
    }

    generatePlayerId() {
        const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
        const randomStr = Math.random().toString(36).substr(2, 5); // Generate a random string
        return timestamp + '-' + randomStr;
    }

    updateScore(points) {
        this.currentPlayer.playerScores.push(points);
    };

    recordCorrectAnswer() {
        this.currentPlayer.numCorrect++;
        return this.currentPlayer.numCorrect;
    }

    recordWrongAnswer() {
        this.currentPlayer.numWrong++;
        return this.currentPlayer.numWrong;
    }

    getTotalScore() {
        this.currentPlayer.totalScores = this.currentPlayer.playerScores.reduce(add, 0);
        return this.currentPlayer.totalScores;
    }
}

class QuestionMaster {
    constructor(topics = [], getNum = 10, gameStarted = false, curPage = 0) {
        this.topics = topics;
        this.getNum = getNum;
        this.gameStarted = gameStarted;
        this.curPage = curPage;
        this.curQuestion = "";
        this.curAnswer = "";
        this.correct = 0;
        this.advancePage = false;
        this.startTime = null;
        this.elapsedTime = null;
        this.elapsedTime = 0;
        this.veryFirstQuestion = false;
    }

    // flattenQuestions will push ALL questions and associated answers from only selected topics into a single array of question objects (e.g. [{question},{question}, ..., {question}])
    flattenQuestions = (questionbank) => {
        let allQuestions = [];

        this.topics.forEach(topic => {
            if (questionbank.hasOwnProperty(topic)) {
                const topicQuestions = questionbank[topic].questions;
                allQuestions = allQuestions.concat(topicQuestions);
            }
        });

        return allQuestions;
    }

    // fetchQuestions calls flattenQuestions to obtain an array of ALL questions, then it randomly samples a subset of questions from that array. The number of questions is decided by this.getNum
    fetchQuestions() {
        this.allQuestions = this.flattenQuestions(questionbank);
        this.subsetQuestions = this.getSubsetOfQuestions([...this.allQuestions], this.getNum);
    }

    // getSubsetOfQuestions samples and returns a subset of items from an array. This is called by fetchQuestion().
    getSubsetOfQuestions(arrCopy, num) {
        return arrCopy.sort(() => 0.5 - Math.random()).slice(0, num);
    }

    startGame() {
        this.fetchQuestions();
        this.populateQuizScreen();
        this.gameStarted = true;
        this.toggleClickEventListeners(this.gameStarted);
        this.startTimer();
    }

    populateQuizScreen() {
        if (this.advancePage) {
            gameScores.currentPlayer.playerScores.push(this.calculateScore(this.elapsedTime));
            console.log(this.elapsedTime);
        }

        if (this.curPage < this.subsetQuestions.length) {
            const quizScreenEl = document.getElementById("questionheading");
            this.curQuestion = this.subsetQuestions[this.curPage].question;
            this.curAnswer = this.subsetQuestions[this.curPage].answers;
            this.correct = this.subsetQuestions[this.curPage].correct;
            this.chosenAnswer = null;
            quizScreenEl.innerText = this.curQuestion;
            this.clearButtonsBackground();
            this.advancePage = false;


            for (let i = 0; i < this.curAnswer.length; i++) {
                const q = `q${i + 1}`;
                document.getElementById(q).textContent = `${this.curAnswer[i]}`;
            }

            this.curPage += 1;
        }

        // if (!this.veryFirstQuestion) {
        //     this.startTimer();
        // }

        this.veryFirstQuestion = true;
        this.updateQuizScores();
    }

    clearButtonsBackground() {
        for (let i = 0; i < 4; i++) {
            let q = `q${i + 1}`;
            document.getElementById(q).style.backgroundColor = "";
        }
    }

    questionButtonsHandler(e) {
        // console.log(`Question button clicked: ${e.target.id}`);

        let buttonId = e.target.id;

        if (!["q1", "q2", "q3", "q4"].includes(buttonId)) return;

        this.advancePage = true;

        const getButtonIndex = buttonId.substr(1) - 1;
        this.chosenAnswer = getButtonIndex;

        let q = `q${this.chosenAnswer + 1}`;

        if (this.chosenAnswer === this.correct) {
            gameScores.recordCorrectAnswer();
            document.getElementById(q).style.backgroundColor = "green";
        } else {
            gameScores.recordWrongAnswer();
            backgroundMusic.increasePlaybackSpeed();
            document.getElementById(q).style.backgroundColor = "red"
            document.getElementById(`q${this.correct + 1}`).style.backgroundColor = "green";
        }

        setTimeout(() => {
            this.populateQuizScreen();
        }, 1000);
    }

    toggleClickEventListeners(enable) {
        if (enable) {
            document.getElementById("q-container").addEventListener("click", this.questionButtonsHandler.bind(this));
        } else {
            document.getElementById("q-container").removeEventListener("click", this.questionButtonsHandler.bind(this));
        }
    }

    updateQuizScores() {
        document.getElementById("element-1-playername").textContent = gameScores.currentPlayer.playerName;
        document.getElementById("element-1-currentplayback").textContent = `Speed: ${backgroundMusic.playbackSpeed}`;
        document.getElementById("element-1-correct").textContent = `Correct: ${gameScores.currentPlayer.numCorrect}/${QM.subsetQuestions.length}`;
        document.getElementById("element-1-wrong").textContent = `Wrong: ${gameScores.currentPlayer.numWrong}/${QM.subsetQuestions.length}`
        document.getElementById("element-1-totalscore").textContent = `Score: ${gameScores.getTotalScore()}`;
    }

    calculateScore(elapsedTime) {
        const maxTime = 50000;
        let multiplier = (maxTime - elapsedTime) / 1000;
        const score = (elapsedTime > maxTime) ? 0 : Math.ceil((maxTime - elapsedTime) / 100 * multiplier);
        console.log("Score:", score);
        return score;
    }

    startTimer() {
        if (!this.startTime) {
            this.startTime = Date.now();
            this.intervalId = setInterval(() => {
                this.elapsedTime = Date.now() - this.startTime;
            }, 1000); // Update every second
        }
    }

    stopTimer() {
        if (this.startTime) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.elapsedTime = Date.now() - this.startTime;
            this.startTime = null;
        }
    }
}

const add = (total, num) => total + num;

const toggleModal = function (element) {
    if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
        homeOverlay.classList.remove("hidden");
    } else {
        element.classList.add("hidden");
        homeOverlay.classList.add("hidden");
    }
}

const retrieveTopicsFromQBank = () => {
    return Object.keys(questionbank);
}

const generateRandomHexColor = () => {
    const res = ["#"];
    for (let i = 0; i < 3; i++) {
        const hex = `${Math.floor(Math.random() * 255).toString(16).padStart(2, 0)}`
        res.push(hex);
    }

    return res.join("")
}

getTextContrastColour = (hexValue) => {
    // Convert hex color to RGB
    const r = parseInt(hexValue.substr(1, 2), 16);
    const g = parseInt(hexValue.substr(3, 2), 16);
    const b = parseInt(hexValue.substr(5, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Choose white or black based on luminance
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}


/*
    String/Input Manipulation
*/
const getInput = () => {
    // return document.querySelector("#signup-form").username.value;
    // return document.querySelector("#signup-form").username;
    return document.querySelector("#username").value;
};

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
const homeModal = document.getElementById("homemodal");
const rulesModal = document.getElementById("ruleboard");
const rulesButtons = document.getElementById("rulesbtns");
const newGameModal = document.getElementById("playersignupmodal");
const homeOverlay = document.getElementById("homeoverlay");
const soundModal = document.getElementById("soundboard");
const quizModal = document.getElementById("quizcontainer");
const backgroundMusic = new AudioPlayer();


/* 
    Audio ends, action goes here
*/
backgroundMusic.audio.addEventListener("ended", function () {
    alert("audio ended");
    QM.stopTimer();
})

// Instantiate relevant classes
const QM = new QuestionMaster(["javascript", "anotherTopic"], NUMQ, false);
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
    console.log(target.id);
    if (target.id === "homescreen" || target.id === "newgameheadingtext") {
        return;
    }

    switch (target.id) {
        case "newgame": {
            console.log("new game button pressed!");
            if (!QM.gameStarted) {
                const allTopics = retrieveTopicsFromQBank();

                for (let i = 0; i < allTopics.length; i++) {
                    const randHex = generateRandomHexColor();
                    const textColour = getTextContrastColour(randHex);
                    const categoryEl = document.createElement("div");
                    const categoryId = `category-${i}`;

                    categoryEl.innerHTML = `<button class="btn mr-2" id="${categoryId}" style="background-color: ${randHex}; color:${textColour}">
                    ${allTopics[i]}
                </button>`
                    document.getElementById("categories-container").appendChild(categoryEl);

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
    console.log(`YOU CLICKED THIS ${e.target.id}`);

    const signUpEl = document.getElementById("signup-form");

    // if (!QM.gameStarted) {
    //     if (!backgroundMusic.isPlaying) { backgroundMusic.playAudio(); }

    //     QM.startGame();
    //     console.log(QM.subsetQuestions);

    // }
    // toggleModal(newGameModal);

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
            console.log("slow");
            backgroundMusic.decreasePlaybackSpeed();
            break;
        };
        case "soundpause": {
            console.log("pause");
            backgroundMusic.pauseAudio();
            break;
        };
        case "soundfast": {
            console.log("fast");
            backgroundMusic.increasePlaybackSpeed();
            break
        };
    }
})




