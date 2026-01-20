//your JS code here. If required.
const audio = document.getElementById("audio");
const video = document.getElementById("video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600;
let playing = false;

function updateTime(time) {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    timeDisplay.textContent = `${mins}:${secs}`;
}

updateTime(duration);

// Play / Pause
playBtn.addEventListener("click", () => {
    if (!playing) {
        audio.play();
        video.play();
        playBtn.textContent = "❚❚";
    } else {
        audio.pause();
        video.pause();
        playBtn.textContent = "▶";
    }
    playing = !playing;
});

// Time selection
timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        duration = Number(btn.dataset.time);
        audio.currentTime = 0;
        updateTime(duration);
    });
});

// Sound switch
soundButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        audio.src = btn.dataset.sound;
        video.src = btn.dataset.video;
        audio.pause();
        video.pause();
        audio.currentTime = 0;
        playBtn.textContent = "▶";
        playing = false;
    });
});

// Countdown
audio.ontimeupdate = () => {
    const remaining = Math.floor(duration - audio.currentTime);
    updateTime(remaining);

    if (audio.currentTime >= duration) {
        audio.pause();
        video.pause();
        audio.currentTime = 0;
        playBtn.textContent = "▶";
        playing = false;
    }
};

