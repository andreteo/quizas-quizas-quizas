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

const toggleModal = function () {
    if (homeModal.classList.contains("hidden")) {
        homeModal.classList.remove("hidden");
        homeOverlay.classList.remove("hidden");
    } else {
        homeModal.classList.add("hidden");
        homeOverlay.classList.add("hidden");
    }
}

const homeScreen = document.getElementById("homescreen");
const homeModal = document.getElementById("homemodal");
const homeOverlay = document.getElementById("homeoverlay");

/*
    Home Screen
*/
homeScreen.addEventListener("click", function (e) {

    const target = e.target;
    if (target.id === "homescreen" || target.id === "newgameheadingtext") {
        return;
    }

    console.log(target);

    switch (target.id) {
        case "newgame": {
            console.log("New Game pressed");
            break;
        };
        case "rules": {
            homeModal.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, modi, culpa quasi doloremque, harum totam et possimus laudantium vel porro neque. Incidunt libero commodi rerum, consequuntur itaque sapiente cumque officia.";
            break;
        };
    }
    homeModal.innerHTML = '<a class="btn btn-success" id="start">Close</a>' + '<a class="btn btn-danger" id="cancel"> Close </a>';
    toggleModal();
})

/* 
    New Game Window
*/
// <a class="btn btn-success" id="start"> Close </a>
{/* <a class="btn btn-danger" id="cancel"> Close </a> */ }
homeModal.addEventListener("click", function (e) {
    const target = e.target;

    switch (target.id) {
        case "start": {
            console.log("Start Button Clicked");
            toggleModal();
            break;
        };
        case "cancel": {
            console.log("Cancel Button Clicked");
            toggleModal();
            break;
        }
    }
})

function initGame() {
    const TITLE = "Quiz-as, Quiz-as, Quiz-as!";
    const newGameTitle = document.querySelector("#newgameheadingtext");
    const backgroundMusic = new AudioPlayer();
    const playButton = document.getElementById("playbutton");

    newGameTitle.innerHTML = TITLE;
    document.querySelector("title").textContent = TITLE;

    playButton.addEventListener("click", () => {
        if (!backgroundMusic.isPlaying) {
            backgroundMusic.playAudio();
            playButton.style.backgroundColor = "#a7c957";
        } else {
            backgroundMusic.pauseAudio();
            playButton.style.backgroundColor = "#bc4749";
        }
    })

    // increasePlaybackBtn.addEventListener("click", () => {
    //     backgroundMusic.increasePlaybackSpeed();
    // });
    // decreasePlaybackBtn.addEventListener("click", () => {
    //     backgroundMusic.decreasePlaybackSpeed();
    // });
}

initGame();