class AudioPlayer {
    constructor(audio = "./sound/Andrea-Bocelli_Quizas,Quizas,Quizas_ft.-Jennifer-Lopez.mp3", timeElapsed = 0, isPlaying = false, playbackSpeed = 1.0) {
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

        }
    }
}

// const homepageEl = document.querySelector("home");
const newGameBtn = document.getElementById("newgame");

const continueBtn = document.getElementById("continue");
const rulesBtn = document.getElementById("rules");



newGameBtn.addEventListener("click", function (e) {
    e.preventDefault();

    console.log("new game button clicked");
})

continueBtn.addEventListener("click", function (e) {
    e.preventDefault();

    console.log("continue button clicked");
})

rulesBtn.addEventListener("click", function (e) {
    e.preventDefault();

    console.log("rules button clicked");
})

function initGame() {
    const TITLE = "Quiz-as, Quiz-as, Quiz-as!";
    const newGameTitle = document.querySelector("#newgameheadingtext");
    const backgroundMusic = new AudioPlayer();
    const playButton = document.getElementById("playbutton");
    const increasePlaybackBtn = document.getElementById("increasePlayback");
    const decreasePlaybackBtn = document.getElementById("decreasePlayback");

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

    increasePlaybackBtn.addEventListener("click", () => {
        backgroundMusic.increasePlaybackSpeed();
    });
    decreasePlaybackBtn.addEventListener("click", () => {
        backgroundMusic.decreasePlaybackSpeed();
    });
}

initGame();